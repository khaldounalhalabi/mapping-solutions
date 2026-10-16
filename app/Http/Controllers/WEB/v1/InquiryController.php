<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Models\Inquiry;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\InquiryResource;
use App\Services\v1\Inquiry\InquiryService;

class InquiryController extends WebController
{
    private InquiryService $inquiryService;

    public function __construct()
    {
        $this->inquiryService = InquiryService::make();
        // place the relations you want to return them within the response
        $this->relations = ['product'];
    }

    public function data()
    {
        $items = $this->inquiryService->indexWithPagination($this->relations);

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

    public function show($inquiryId)
    {
        $inquiry = $this->inquiryService->view($inquiryId, $this->relations);

        return Inertia::render('dashboard/inquiries/show', [
            'inquiry' => InquiryResource::make($inquiry),
        ]);
    }
}
