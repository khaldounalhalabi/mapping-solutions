<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Models\JobApplication;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewJobApplicationMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public JobApplication $jobApplication)
    {
        $this->locale(config('cubeta-starter.default_locale'));
    }

    public function content(): Content
    {
        return new Content(view: 'emails.new-job-application');
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('site.mail.new_job_application_subject'),
        );
    }
}
