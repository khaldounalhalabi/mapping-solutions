<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\EmailReceiverResource;
use App\Services\v1\EmailReceiver\EmailReceiverService;
use App\DTOs\v1\EmailReceiver\StoreUpdateEmailReceiverDTO;

class EmailReceiverController extends WebController
{
    private EmailReceiverService $emailReceiverService;

    public function __construct()
    {
        $this->emailReceiverService = EmailReceiverService::make();
        $this->relations = [];
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/email-receivers/create');
    }

    public function data(): JsonResponse
    {
        return rest()->ok()->getSuccess()
            ->data($this->emailReceiverService->paginate($this->relations))
            ->send();
    }

    public function destroy(int|string $emailReceiverId): JsonResponse
    {
        $result = $this->emailReceiverService->delete($emailReceiverId);

        return rest()->when(
            $result,
            fn ($rest) => $rest->ok()->deleteSuccess(),
            fn ($rest) => $rest->noData(),
        )->send();
    }

    public function edit(int|string $emailReceiverId): Response
    {
        $emailReceiver = $this->emailReceiverService->view($emailReceiverId);
        abort_unless($emailReceiver, 404);

        return Inertia::render('dashboard/email-receivers/edit', [
            'emailReceiver' => EmailReceiverResource::make($emailReceiver),
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('dashboard/email-receivers/index');
    }

    public function show(int|string $emailReceiverId): Response
    {
        $emailReceiver = $this->emailReceiverService->view($emailReceiverId);
        abort_unless($emailReceiver, 404);

        return Inertia::render('dashboard/email-receivers/show', [
            'emailReceiver' => EmailReceiverResource::make($emailReceiver),
        ]);
    }

    public function store(StoreUpdateEmailReceiverDTO $dto): RedirectResponse
    {
        $this->emailReceiverService->store($dto->toArray());
        Inertia::flash('success', trans('site.stored_successfully'));

        return redirect()->route('v1.web.protected.email.receivers.index');
    }

    public function update(StoreUpdateEmailReceiverDTO $dto, int|string $emailReceiverId): RedirectResponse
    {
        $emailReceiver = $this->emailReceiverService->update($dto->toArray(), $emailReceiverId);
        abort_unless($emailReceiver, 404);
        Inertia::flash('success', trans('site.update_successfully'));

        return redirect()->route('v1.web.protected.email.receivers.index');
    }
}
