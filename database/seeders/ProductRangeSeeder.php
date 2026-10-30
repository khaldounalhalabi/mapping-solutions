<?php

namespace Database\Seeders;

use App\Models\ProductRange;
use Illuminate\Database\Seeder;

class ProductRangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ranges = [
            ['VNIR', '400–1000 nm', '#1a9ed4', 'VNIR — visible and near infrared', 'Pigments, chlorophyll and water content produce clear features in this range, which is why VNIR sensors are the most widely used in environmental and agricultural survey.', 'Vegetation health and species mapping
Water quality and algal blooms
Coastal and habitat change
Precision agriculture', 0],
            ['SWIR', '1000–2500 nm', '#12b886', 'SWIR — shortwave infrared', 'Minerals, moisture and many manufactured materials have distinctive absorption features in the shortwave infrared that are not detectable at shorter wavelengths.', 'Mineral identification and mining
Soil moisture and composition
Material and plastics sorting
Geological mapping', 1],
            ['MWIR', '3–5 µm', '#f2c037', 'MWIR — midwave infrared', 'The midwave range captures emission from combustion and high-temperature processes, which makes it well suited to gas and hot-target work.', 'Gas detection and flare monitoring
Industrial process inspection
Hot target detection
Defence and ISR', 2],
            ['LWIR', '8–12 µm', '#f2762e', 'LWIR — thermal infrared', 'All surfaces emit in the longwave. Thermal hyperspectral can distinguish gas plumes by species and map surface temperature across a site or city, including at night.', 'Gas plume identification
Urban heat mapping
Building and energy loss survey
Night-time acquisition', 3],
            ['LiDAR', '1064 / 1550 nm', '#d63b3b', 'LiDAR — active laser ranging', 'LiDAR emits its own pulses and times the return, so rather than what a surface is made of, it measures precisely where that surface is — in three dimensions, through vegetation, and in some systems through water.', 'Topographic and corridor mapping
Forestry structure and canopy
Bathymetric survey
Asset and infrastructure inspection', 4],
        ];

        foreach ($ranges as [$label, $range, $colour, $title, $description, $uses, $sortOrder]) {
            ProductRange::firstOrCreate(['label' => $label], [
                'range'       => $range, 'colour' => $colour, 'title' => $title,
                'description' => $description, 'uses' => $uses, 'sort_order' => $sortOrder,
            ]);
        }
    }
}
