<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\TrainingCourse;
use App\Models\TrainingCategory;
use Database\Seeders\TrainingCourseSeeder;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

class TrainingCourseSeederTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_reseeding_preserves_course_edits_and_publication_status_without_duplicates(): void
    {
        $this->seed(TrainingCourseSeeder::class);
        $course = TrainingCourse::query()->where('name->en', 'GIS Fundamentals with QGIS')->sole();
        $course->update([
            'summary'      => ['en' => 'Updated by the dashboard team'],
            'duration'     => ['en' => '4 days'],
            'sort_order'   => 5,
            'is_published' => false,
        ]);

        $this->seed(TrainingCourseSeeder::class);

        $this->assertDatabaseCount('training_courses', 6);
        $this->assertDatabaseCount('training_categories', 3);
        $course->refresh();
        $this->assertSame('Updated by the dashboard team', $course->summary->en);
        $this->assertSame('4 days', $course->duration->en);
        $this->assertSame(5, $course->sort_order);
        $this->assertFalse($course->is_published);
    }

    public function test_seeds_two_published_courses_in_each_training_area_with_complete_translations(): void
    {
        $this->seed(TrainingCourseSeeder::class);

        $this->assertDatabaseCount('training_categories', 3);
        $this->assertDatabaseCount('training_courses', 6);
        foreach (TrainingCategory::query()->with('trainingCourses')->get() as $category) {
            $this->assertCount(2, $category->trainingCourses);
            $this->assertSame([0, 1], $category->trainingCourses->sortBy('sort_order')->pluck('sort_order')->all());
            foreach ($category->trainingCourses as $course) {
                $this->assertTrue($course->is_published);
                foreach (['name', 'summary', 'outline', 'duration', 'level'] as $field) {
                    foreach (['en', 'ar', 'fr'] as $locale) {
                        $this->assertNotEmpty($course->{$field}->{$locale});
                    }
                }
            }
        }
    }
}
