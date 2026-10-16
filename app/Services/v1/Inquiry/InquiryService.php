<?php

namespace App\Services\v1\Inquiry;

use App\Models\Inquiry;
use App\Traits\Makable;
use App\Repositories\InquiryRepository;
use App\Services\Contracts\BaseService;

/**
 * @extends BaseService<Inquiry>
 *
 * @property InquiryRepository $repository
 */
class InquiryService extends BaseService
{
    use Makable;

    protected string $repositoryClass = InquiryRepository::class;
}
