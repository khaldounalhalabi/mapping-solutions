<?php

namespace App\Repositories;

use App\Models\EmailReceiver;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<EmailReceiver>
 */
class EmailReceiverRepository extends BaseRepository
{
    protected string $modelClass = EmailReceiver::class;

    /** @return list<string> */
    public function emailAddresses(): array
    {
        return $this->model->newQuery()->pluck('email')->all();
    }
}
