<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
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
        return new Content(view: 'emails.new-inquiry');
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('site.mail.new_inquiry_subject'),
        );
    }
}
