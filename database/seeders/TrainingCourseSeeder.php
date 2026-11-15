<?php

namespace Database\Seeders;

use App\Models\TrainingCourse;
use Illuminate\Database\Seeder;
use App\Models\TrainingCategory;

class TrainingCourseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(TrainingCategorySeeder::class);

        $courses = [
            [
                'category'   => 'Image Processing Training',
                'name'       => ['en' => 'Introduction to Remote Sensing', 'ar' => 'مقدمة في الاستشعار عن بعد', 'fr' => 'Introduction à la télédétection'],
                'summary'    => ['en' => 'Learn how satellite and airborne imagery can support environmental monitoring and mapping projects.', 'ar' => 'تعلّم كيف تدعم صور الأقمار الصناعية والتصوير الجوي مشاريع الرصد البيئي وإعداد الخرائط.', 'fr' => 'Découvrez comment les images satellitaires et aériennes contribuent au suivi environnemental et à la cartographie.'],
                'outline'    => ['en' => "Sensors and spectral bands\nImage resolution and data selection\nPreparing and visualising imagery\nInterpreting land-cover features", 'ar' => "المستشعرات والنطاقات الطيفية\nدقة الصور واختيار البيانات\nتجهيز الصور وعرضها\nتفسير معالم الغطاء الأرضي", 'fr' => "Capteurs et bandes spectrales\nRésolution des images et choix des données\nPréparation et visualisation des images\nInterprétation de l’occupation du sol"],
                'duration'   => ['en' => '2 days', 'ar' => 'يومان', 'fr' => '2 jours'],
                'level'      => ['en' => 'Beginner', 'ar' => 'مبتدئ', 'fr' => 'Débutant'],
                'sort_order' => 0,
            ],
            [
                'category'   => 'Image Processing Training',
                'name'       => ['en' => 'Hyperspectral Image Analysis', 'ar' => 'تحليل الصور فائقة الطيف', 'fr' => 'Analyse d’images hyperspectrales'],
                'summary'    => ['en' => 'Explore a practical workflow for preparing hyperspectral imagery and identifying materials through their spectral signatures.', 'ar' => 'استكشف سير عمل عملي لتجهيز الصور فائقة الطيف والتعرّف على المواد من خلال بصماتها الطيفية.', 'fr' => 'Explorez une méthode pratique de préparation des images hyperspectrales et d’identification des matériaux par leur signature spectrale.'],
                'outline'    => ['en' => "Spectral signatures and libraries\nRadiometric and atmospheric correction concepts\nNoise reduction and band selection\nClassification and interpreting results", 'ar' => "البصمات والمكتبات الطيفية\nمفاهيم التصحيح الإشعاعي والجوي\nتقليل الضوضاء واختيار النطاقات\nالتصنيف وتفسير النتائج", 'fr' => "Signatures et bibliothèques spectrales\nPrincipes de correction radiométrique et atmosphérique\nRéduction du bruit et sélection des bandes\nClassification et interprétation des résultats"],
                'duration'   => ['en' => '3 days', 'ar' => '3 أيام', 'fr' => '3 jours'],
                'level'      => ['en' => 'Intermediate', 'ar' => 'متوسط', 'fr' => 'Intermédiaire'],
                'sort_order' => 1,
            ],
            [
                'category'   => 'GIS Courses',
                'name'       => ['en' => 'GIS Fundamentals with QGIS', 'ar' => 'أساسيات نظم المعلومات الجغرافية باستخدام QGIS', 'fr' => 'Fondamentaux des SIG avec QGIS'],
                'summary'    => ['en' => 'Get started with geographic data, build clear maps and practise everyday spatial analysis in QGIS.', 'ar' => 'ابدأ العمل بالبيانات الجغرافية وأنشئ خرائط واضحة وتدرّب على التحليل المكاني اليومي باستخدام QGIS.', 'fr' => 'Initiez-vous aux données géographiques, créez des cartes lisibles et pratiquez l’analyse spatiale courante dans QGIS.'],
                'outline'    => ['en' => "Vector and raster data\nCoordinate systems and projections\nEditing attributes and styling layers\nSpatial queries and map layouts", 'ar' => "البيانات المتجهة والنقطية\nأنظمة الإحداثيات والإسقاطات\nتحرير السمات وتنسيق الطبقات\nالاستعلامات المكانية وإخراج الخرائط", 'fr' => "Données vectorielles et raster\nSystèmes de coordonnées et projections\nModification des attributs et styles des couches\nRequêtes spatiales et mise en page cartographique"],
                'duration'   => ['en' => '2 days', 'ar' => 'يومان', 'fr' => '2 jours'],
                'level'      => ['en' => 'Beginner', 'ar' => 'مبتدئ', 'fr' => 'Débutant'],
                'sort_order' => 0,
            ],
            [
                'category'   => 'GIS Courses',
                'name'       => ['en' => 'Spatial Analysis and Terrain Modelling', 'ar' => 'التحليل المكاني ونمذجة التضاريس', 'fr' => 'Analyse spatiale et modélisation du terrain'],
                'summary'    => ['en' => 'Develop spatial analysis skills using terrain models, proximity tools and repeatable processing workflows.', 'ar' => 'طوّر مهارات التحليل المكاني باستخدام نماذج التضاريس وأدوات القرب وسير المعالجة القابل للتكرار.', 'fr' => 'Développez vos compétences en analyse spatiale avec des modèles de terrain, des outils de proximité et des traitements reproductibles.'],
                'outline'    => ['en' => "Digital elevation models\nSlope, aspect and hillshade\nBuffers and overlay analysis\nBuilding a repeatable processing model", 'ar' => "نماذج الارتفاع الرقمية\nالانحدار والاتجاه والتظليل التضاريسي\nتحليل الحرم والتراكب\nبناء نموذج معالجة قابل للتكرار", 'fr' => "Modèles numériques d’élévation\nPente, exposition et ombrage\nZones tampons et analyses de superposition\nCréation d’un modèle de traitement reproductible"],
                'duration'   => ['en' => '3 days', 'ar' => '3 أيام', 'fr' => '3 jours'],
                'level'      => ['en' => 'Intermediate', 'ar' => 'متوسط', 'fr' => 'Intermédiaire'],
                'sort_order' => 1,
            ],
            [
                'category'   => 'E-Learning',
                'name'       => ['en' => 'Remote Sensing Essentials Online', 'ar' => 'أساسيات الاستشعار عن بعد عبر الإنترنت', 'fr' => 'Les bases de la télédétection en ligne'],
                'summary'    => ['en' => 'Build a foundation in remote sensing through short online modules and guided image interpretation exercises.', 'ar' => 'ابنِ أساساً في الاستشعار عن بعد من خلال وحدات قصيرة عبر الإنترنت وتمارين موجّهة لتفسير الصور.', 'fr' => 'Acquérez les bases de la télédétection avec de courts modules en ligne et des exercices guidés d’interprétation d’images.'],
                'outline'    => ['en' => "The electromagnetic spectrum\nSatellite and airborne platforms\nUnderstanding image metadata\nGuided image interpretation exercises", 'ar' => "الطيف الكهرومغناطيسي\nمنصات الأقمار الصناعية والتصوير الجوي\nفهم البيانات الوصفية للصور\nتمارين موجّهة لتفسير الصور", 'fr' => "Le spectre électromagnétique\nPlateformes satellitaires et aériennes\nComprendre les métadonnées des images\nExercices guidés d’interprétation d’images"],
                'duration'   => ['en' => '6 hours · self-paced', 'ar' => '6 ساعات · حسب وتيرتك', 'fr' => '6 heures · à votre rythme'],
                'level'      => ['en' => 'Beginner', 'ar' => 'مبتدئ', 'fr' => 'Débutant'],
                'sort_order' => 0,
            ],
            [
                'category'   => 'E-Learning',
                'name'       => ['en' => 'Practical GIS Online', 'ar' => 'نظم المعلومات الجغرافية عملياً عبر الإنترنت', 'fr' => 'Pratique des SIG en ligne'],
                'summary'    => ['en' => 'Practise common GIS tasks at your own pace, from organising datasets to presenting a finished map.', 'ar' => 'تدرّب على مهام نظم المعلومات الجغرافية حسب وتيرتك، من تنظيم مجموعات البيانات إلى عرض خريطة مكتملة.', 'fr' => 'Pratiquez les tâches SIG courantes à votre rythme, de l’organisation des données à la présentation d’une carte finalisée.'],
                'outline'    => ['en' => "Organising a GIS project\nImporting and checking spatial data\nJoining tables and querying features\nCreating and exporting a map", 'ar' => "تنظيم مشروع نظم معلومات جغرافية\nاستيراد البيانات المكانية والتحقق منها\nربط الجداول والاستعلام عن المعالم\nإنشاء خريطة وتصديرها", 'fr' => "Organisation d’un projet SIG\nImportation et vérification des données spatiales\nJointures de tables et requêtes sur les entités\nCréation et exportation d’une carte"],
                'duration'   => ['en' => '8 hours · self-paced', 'ar' => '8 ساعات · حسب وتيرتك', 'fr' => '8 heures · à votre rythme'],
                'level'      => ['en' => 'Beginner', 'ar' => 'مبتدئ', 'fr' => 'Débutant'],
                'sort_order' => 1,
            ],
        ];

        foreach ($courses as $course) {
            $category = TrainingCategory::query()->where('name->en', $course['category'])->firstOrFail();
            unset($course['category']);

            TrainingCourse::query()->firstOrCreate(
                ['training_category_id' => $category->id, 'name->en' => $course['name']['en']],
                [...$course, 'is_published' => true],
            );
        }
    }
}
