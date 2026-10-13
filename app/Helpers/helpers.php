<?php

use App\Modules\ApiResponse;
use Illuminate\Http\UploadedFile;

if (! function_exists('rest')) {
    function rest()
    {
        return ApiResponse::create();
    }
}

if (! function_exists('fakeImage')) {
    function fakeImage(?string $name = null): UploadedFile
    {
        if ($name) {
            $path = "/app/required/$name.jpg";
            $fileName = "$name.jpg";
        } else {
            $num = fake()->numberBetween(1, 50);
            $path = "/app/required/$num.jpg";
            $fileName = "$num.jpg";
        }

        if (! file_exists(storage_path($path))) {
            throw new Exception('No Fake Image Files Exists Within: '.storage_path($path));
        }

        return new UploadedFile(storage_path($path), $fileName, 'image/jpeg', null, true);
    }
}
