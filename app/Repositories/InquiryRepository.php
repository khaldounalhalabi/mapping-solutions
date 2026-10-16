<?php

namespace App\Repositories;

use App\Models\Inquiry;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Inquiry>
 */
class InquiryRepository extends BaseRepository
{
    protected string $modelClass = Inquiry::class;
}
