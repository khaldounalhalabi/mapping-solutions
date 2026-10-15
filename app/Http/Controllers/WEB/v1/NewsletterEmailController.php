<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\NewsletterEmailResource;
use App\DTOs\v1\NewsletterEmail\StoreNewsletterEmailDTO;
use App\Services\v1\NewsletterEmail\NewsletterEmailService;

class NewsletterEmailController extends WebController
{
    private NewsletterEmailService $newsletterEmailService;

    public function __construct()
    {
        $this->newsletterEmailService = NewsletterEmailService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function create()
    {
        return Inertia::render('dashboard/newsletter-emails/create');
    }

    public function data()
    {
        $items = $this->newsletterEmailService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        return Inertia::render('dashboard/newsletter-emails/index');
    }

    public function show($newsletterEmailId)
    {
        $newsletterEmail = $this->newsletterEmailService->view($newsletterEmailId, $this->relations);

        return Inertia::render('dashboard/newsletter-emails/show', [
            'newsletterEmail' => NewsletterEmailResource::make($newsletterEmail),
        ]);
    }

    public function store(StoreNewsletterEmailDTO $dto)
    {
        $newsletterEmail = $this->newsletterEmailService->store($dto->toArray(), $this->relations);
        if ($newsletterEmail) {
            Inertia::flash([
                'success' => trans('site.stored_successfully'),
            ]);

            return redirect()->route('v1.web.protected.newsletter.emails.index');
        }

        return Inertia::flash([
            'success' => trans('site.something_went_wrong'),
        ])->back();
    }
}
