<?php

namespace App\Http\Controllers\WEB\v1;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Inquiry;
use App\Http\Controllers\WebController;
use App\DTOs\v1\Inquiry\RespondInquiryDTO;
use App\Http\Resources\v1\InquiryResource;
use App\Services\v1\Inquiry\InquiryService;

class InquiryController extends WebController
{
    private InquiryService $inquiryService;

    public function __construct()
    {
        $this->inquiryService = InquiryService::make();
        // place the relations you want to return them within the response
        $this->relations = ['product', 'respondedBy'];
    }

    public function data()
    {
        $items = $this->inquiryService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($inquiryId)
    {
        $result = $this->inquiryService->delete($inquiryId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function index()
    {
        $exportables = Inquiry::getModel()->exportable();

        return Inertia::render('dashboard/inquiries/index', [
            'exportables' => $exportables,
        ]);
    }

    public function respond(RespondInquiryDTO $dto, $inquiryId)
    {
        $user = auth()->user();

        abort_unless($user instanceof User, 403);

        $inquiry = $this->inquiryService->respond(
            $inquiryId,
            $dto->toArray(),
            $user->id,
        );

        abort_unless($inquiry instanceof Inquiry, 404);

        Inertia::flash([
            'success' => trans('site.inquiry_response_queued'),
        ]);

        return redirect()->route('v1.web.protected.inquiries.show', $inquiryId);
    }

    public function show($inquiryId)
    {
        $inquiry = $this->inquiryService->view($inquiryId, $this->relations);

        return Inertia::render('dashboard/inquiries/show', [
            'inquiry' => InquiryResource::make($inquiry),
        ]);
    }
}
