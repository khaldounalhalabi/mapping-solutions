<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingCategory;

class TrainingCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name'    => ['en' => 'Image Processing Training', 'ar' => 'التدريب على معالجة الصور', 'fr' => 'Formation au traitement d’images'],
                'summary' => ['en' => 'Explore the steps from remotely sensed imagery to useful information. Discuss training around your imagery, processing tools and analysis goals.', 'ar' => 'استكشف مراحل تحويل صور الاستشعار عن بعد إلى معلومات مفيدة. ناقش التدريب وفق صورك وأدوات المعالجة وأهداف التحليل.', 'fr' => 'Explorez les étapes qui transforment les images de télédétection en informations utiles. Discutez d’une formation adaptée à vos images, vos outils et vos objectifs.'],
            ],
            [
                'name'    => ['en' => 'GIS Courses', 'ar' => 'دورات نظم المعلومات الجغرافية', 'fr' => 'Cours de SIG'],
                'summary' => ['en' => 'Build confidence working with geographic information. Discuss courses covering spatial data, mapping and analysis in the context of your projects.', 'ar' => 'طوّر مهاراتك في العمل بالمعلومات الجغرافية. ناقش دورات تتناول البيانات المكانية وإعداد الخرائط والتحليل ضمن سياق مشاريعك.', 'fr' => 'Développez votre aisance avec l’information géographique. Discutez de cours sur les données spatiales, la cartographie et l’analyse dans le contexte de vos projets.'],
            ],
            [
                'name'    => ['en' => 'E-Learning', 'ar' => 'التعلّم الإلكتروني', 'fr' => 'Formation en ligne'],
                'summary' => ['en' => 'Explore online learning options for remote sensing and GIS. Contact us to discuss available topics, learning materials and access arrangements.', 'ar' => 'استكشف خيارات التعلّم عبر الإنترنت في الاستشعار عن بعد ونظم المعلومات الجغرافية. تواصل معنا لمناقشة الموضوعات والمواد التعليمية وترتيبات الوصول.', 'fr' => 'Découvrez les possibilités de formation en ligne en télédétection et SIG. Contactez-nous pour discuter des sujets, des supports et des modalités d’accès.'],
            ],
        ];

        foreach ($categories as $index => $category) {
            TrainingCategory::query()->firstOrCreate(
                ['name->en' => $category['name']['en']],
                [...$category, 'sort_order' => $index],
            );
        }
    }
}
