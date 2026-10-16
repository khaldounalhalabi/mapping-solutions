<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Service;
use App\Models\Vacancy;
use App\Models\Supplier;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use App\Models\ProductFamily;
use Illuminate\Database\Seeder;
use App\Models\MarketApplication;
use App\Models\ProductTechnology;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;

class DemoDataSeeder extends Seeder
{
    /**
     * @return array<string, array<int, array<string, mixed>>>
     */
    private function data(): array
    {
        $json = file_get_contents(database_path('seeders/data/demo-data.json'));

        if ($json === false) {
            throw new \RuntimeException('Unable to read the demo data fixture.');
        }

        return json_decode($json, true, flags: JSON_THROW_ON_ERROR);
    }

    private function saveWithPrototypeSlug(Model $model, string $slug): void
    {
        $model->save();

        if ($model->getAttribute('slug') === $slug) {
            return;
        }

        $model->setAttribute('slug', $slug);
        $model->saveQuietly();
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedMarketApplications(array $rows): void
    {
        foreach ($rows as $row) {
            MarketApplication::query()->updateOrCreate(['icon_key' => $row['icon_key']], $row);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedNewsArticles(array $rows): void
    {
        foreach ($rows as $row) {
            $category = NewsCategory::query()->where('slug', $row['category_slug'])->firstOrFail();
            $heroImage = $row['hero_image'];
            unset($row['category_slug'], $row['hero_image']);

            $article = NewsArticle::query()->firstOrNew(['slug' => $row['slug']]);
            $article->fill([...$row, 'news_category_id' => $category->getKey()]);
            $this->setMediaWhenMissing($article, 'hero_image', $heroImage);
            $this->saveWithPrototypeSlug($article, $row['slug']);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedNewsCategories(array $rows): void
    {
        foreach ($rows as $row) {
            $category = NewsCategory::query()->firstOrNew(['slug' => $row['slug']]);
            $category->fill($row);
            $this->saveWithPrototypeSlug($category, $row['slug']);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedProductFamilies(array $rows): void
    {
        foreach ($rows as $row) {
            $supplier = Supplier::query()->where('slug', $row['supplier_slug'])->firstOrFail();
            unset($row['supplier_slug']);

            $family = ProductFamily::query()->firstOrNew(['slug' => $row['slug']]);
            $family->fill([...$row, 'supplier_id' => $supplier->getKey()]);
            $this->saveWithPrototypeSlug($family, $row['slug']);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedProducts(array $rows): void
    {
        $mediaAttributes = ['hero_image', 'specifications_file', 'datasheet', 'manual', 'brochure'];

        foreach ($rows as $row) {
            $supplier = Supplier::query()->where('slug', $row['supplier_slug'])->firstOrFail();
            $family = ProductFamily::query()->where('slug', $row['product_family_slug'])->firstOrFail();
            $technology = ProductTechnology::query()->where('slug', $row['product_technology_slug'])->firstOrFail();

            unset($row['supplier_slug'], $row['product_family_slug'], $row['product_technology_slug']);

            $media = [];
            foreach ($mediaAttributes as $attribute) {
                $media[$attribute] = $row[$attribute];
                unset($row[$attribute]);
            }

            $product = Product::query()->firstOrNew(['slug' => $row['slug']]);
            $product->fill([
                ...$row,
                'supplier_id'           => $supplier->getKey(),
                'product_family_id'     => $family->getKey(),
                'product_technology_id' => $technology->getKey(),
            ]);

            foreach ($media as $attribute => $path) {
                $this->setMediaWhenMissing($product, $attribute, $path);
            }

            $this->saveWithPrototypeSlug($product, $row['slug']);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedProductTechnologies(array $rows): void
    {
        foreach ($rows as $row) {
            $technology = ProductTechnology::query()->firstOrNew(['slug' => $row['slug']]);
            $technology->fill($row);
            $this->saveWithPrototypeSlug($technology, $row['slug']);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedServices(array $rows): void
    {
        foreach ($rows as $row) {
            $service = Service::query()
                ->where('group->en', $row['group']['en'])
                ->where('name->en', $row['name']['en'])
                ->first() ?? new Service;

            $service->fill($row)->save();
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedSuppliers(array $rows): void
    {
        foreach ($rows as $row) {
            $logo = $row['logo'];
            unset($row['logo']);

            $supplier = Supplier::query()->firstOrNew(['slug' => $row['slug']]);
            $supplier->fill($row);
            $this->setMediaWhenMissing($supplier, 'logo', $logo);
            $this->saveWithPrototypeSlug($supplier, $row['slug']);
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function seedVacancies(array $rows): void
    {
        foreach ($rows as $row) {
            $vacancy = Vacancy::query()->firstOrNew(['slug' => $row['slug']]);
            $vacancy->fill($row);
            $this->saveWithPrototypeSlug($vacancy, $row['slug']);
        }
    }

    private function setMediaWhenMissing(Model $model, string $attribute, ?string $path): void
    {
        if ($path === null || $model->getRawOriginal($attribute) !== null) {
            return;
        }

        $absolutePath = database_path('seeders/assets/'.$path);

        if (! is_file($absolutePath)) {
            throw new \RuntimeException("Missing demo media asset: {$path}");
        }

        $mimeType = mime_content_type($absolutePath) ?: 'application/octet-stream';
        $model->setAttribute(
            $attribute,
            new UploadedFile($absolutePath, basename($absolutePath), $mimeType, null, true),
        );
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = $this->data();

        $this->seedSuppliers($data['suppliers']);
        $this->seedProductFamilies($data['product_families']);
        $this->seedProductTechnologies($data['product_technologies']);
        $this->seedProducts($data['products']);
        $this->seedMarketApplications($data['market_applications']);
        $this->seedServices($data['services']);
        $this->seedNewsCategories($data['news_categories']);
        $this->seedNewsArticles($data['news_articles']);
        $this->seedVacancies($data['vacancies']);
    }
}
