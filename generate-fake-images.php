<?php

$directory = __DIR__ . '/storage/app/required';
$imageCount = 50;
$imageWidth = 300;
$imageHeight = 200;

if (!is_dir($directory)) {
    mkdir($directory, 0755, true);
    echo "Created directory: $directory\n";
}

echo "Downloading $imageCount images to $directory...\n";

for ($i = 1; $i <= $imageCount; $i++) {
    $url = "https://picsum.photos/{$imageWidth}/{$imageHeight}?random={$i}";
    $target = "$directory/$i.jpg";

    $image = file_get_contents($url);
    if ($image === false) {
        echo "Failed to download image $i\n";
        continue;
    }

    file_put_contents($target, $image);
    echo "Downloaded $i.jpg\n";
}

// Run git add on the required folder
echo "Running: git add storage/app/required\n";
exec('git add storage/app/required -f');

echo "✅ Done.\n";
