<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewInquiryMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Inquiry $inquiry)
    {
        $this->locale(config('cubeta-starter.default_locale'));
    }

    public function content(): Content
    {
        $this->inquiry->loadMissing('product');

        return new Content(
            view: 'emails.new-inquiry',
            text: 'emails.submission-text',
            with: [
                'title'        => __('site.mail.new_inquiry_subject'),
                'reference'    => $this->inquiry->id,
                'submittedAt'  => $this->inquiry->created_at?->format('Y-m-d H:i T'),
                'dashboardUrl' => route('v1.web.protected.inquiries.show', $this->inquiry->id),
                'sections'     => [
                    __('site.mail.contact_details') => [
                        __('site.models.Inquiry.fields.first_name') => $this->inquiry->first_name,
                        __('site.models.Inquiry.fields.last_name')  => $this->inquiry->last_name,
                        __('site.models.Inquiry.fields.email')      => $this->inquiry->email,
                        __('site.models.Inquiry.fields.phone')      => $this->inquiry->phone,
                        __('site.models.Inquiry.fields.company')    => $this->inquiry->company,
                        __('site.models.Inquiry.fields.country')    => $this->inquiry->country,
                    ],
                    __('site.mail.submission_details') => [
                        __('site.models.Inquiry.fields.product_id') => $this->inquiry->product?->name->forceTranslate(),
                        __('site.models.Inquiry.fields.subject')    => $this->inquiry->subject,
                        __('site.models.Inquiry.fields.message')    => $this->inquiry->message,
                    ],
                ],
            ],
        );
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [new Address($this->inquiry->email, trim($this->inquiry->first_name.' '.$this->inquiry->last_name))],
            subject: __('site.mail.new_inquiry_subject'),
        );
    }
}
