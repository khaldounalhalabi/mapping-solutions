<?php

namespace App\Enums;

use App\Modules\SharedModule\Traits\BaseEnum;

enum VacancyTypeEnum: string
{
    use BaseEnum;

    case FULL_TIME = 'full_time';
    case PAID_INTERNSHIP = 'paid_internship';
    case PART_TIME = 'part_time';
    case UNPAID_INTERNSHIP = 'unpaid_internship';
}
