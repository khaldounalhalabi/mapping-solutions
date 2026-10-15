<?php

namespace Database\Factories;

use App\Models\NewsletterEmail;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsletterEmail>
 */
class NewsletterEmailFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title'       => fake()->sentence(),
            'content'     => fake()->html(5),
            'attachments' => [
                fakeImage(),
                UploadedFile::fake()->create('specifications.pdf', 1024, 'application/pdf'),
            ],
        ];
    }
}
