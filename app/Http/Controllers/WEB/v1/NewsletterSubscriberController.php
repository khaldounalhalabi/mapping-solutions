<?php

namespace App\Http\Controllers\WEB\v1;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\NewsletterSubscriber;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\NewsletterSubscriberResource;
use App\Services\v1\NewsletterSubscriber\NewsletterSubscriberService;
use App\DTOs\v1\NewsletterSubscriber\StoreUpdateNewsletterSubscriberDTO;

class NewsletterSubscriberController extends WebController
{
    private NewsletterSubscriberService $newsletterSubscriberService;

    public function __construct()
    {
        $this->newsletterSubscriberService = NewsletterSubscriberService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/newsletter-subscribers/create');
    }

    public function data()
    {
        $items = $this->newsletterSubscriberService->paginate($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function destroy($newsletterSubscriberId)
    {
        $result = $this->newsletterSubscriberService->delete($newsletterSubscriberId);

        return rest()
            ->when(
                $result,
                fn ($rest) => $rest->ok()->deleteSuccess(),
                fn ($rest) => $rest->noData(),
            )->send();
    }

    public function edit($newsletterSubscriberId)
    {
        $newsletterSubscriber = $this->newsletterSubscriberService->view($newsletterSubscriberId, $this->relations);

        if (! $newsletterSubscriber) {
            abort(404);
        }

        return Inertia::render('dashboard/newsletter-subscribers/edit', [
            'newsletterSubscriber' => NewsletterSubscriberResource::make($newsletterSubscriber),
        ]);
    }

    public function export(Request $request)
    {
        $ids = $request->ids ?? [];

        try {
            $result = $this->newsletterSubscriberService->export($ids);
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function getImportExample()
    {
        try {
            $result = $this->newsletterSubscriberService->getImportExample();
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function import(Request $request)
    {
        try {
            $request->validate(['excel_file' => 'required|mimes:xls,xlsx']);
            $this->newsletterSubscriberService->import();

            return Inertia::flash([
                'success' => trans('site.success'),
            ])->back();
        } catch (Exception) {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function index()
    {
        $exportables = NewsletterSubscriber::getModel()->exportable();

        return Inertia::render('dashboard/newsletter-subscribers/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($newsletterSubscriberId)
    {
        $newsletterSubscriber = $this->newsletterSubscriberService->view($newsletterSubscriberId, $this->relations);

        return Inertia::render('dashboard/newsletter-subscribers/show', [
            'newsletterSubscriber' => NewsletterSubscriberResource::make($newsletterSubscriber),
        ]);
    }

    public function store(StoreUpdateNewsletterSubscriberDTO $dto)
    {
        $newsletterSubscriber = $this->newsletterSubscriberService->store($dto->toArray(), $this->relations);
        if ($newsletterSubscriber) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.newsletter.subscribers.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }

    public function update(StoreUpdateNewsletterSubscriberDTO $dto, $newsletterSubscriberId)
    {
        $newsletterSubscriber = $this->newsletterSubscriberService->update($dto->toArray(), $newsletterSubscriberId, $this->relations);
        if ($newsletterSubscriber) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.newsletter.subscribers.index');
        }

        return Inertia::flash([
            'error' => trans('site.there_is_no_data'),
        ])->back();
    }
}
