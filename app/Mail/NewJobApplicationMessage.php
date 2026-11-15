<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Models\JobApplication;
use Illuminate\Mail\Mailables\Address;
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
        $this->jobApplication->loadMissing('vacancy');

        return new Content(
            view: 'emails.new-job-application',
            text: 'emails.submission-text',
            with: [
                'title'        => __('site.mail.new_job_application_subject'),
                'reference'    => $this->jobApplication->id,
                'submittedAt'  => $this->jobApplication->created_at?->format('Y-m-d H:i T'),
                'dashboardUrl' => route('v1.web.protected.job.applications.show', $this->jobApplication->id),
                'sections'     => [
                    __('site.mail.contact_details') => [
                        __('site.models.JobApplication.fields.first_name') => $this->jobApplication->first_name,
                        __('site.models.JobApplication.fields.last_name')  => $this->jobApplication->last_name,
                        __('site.models.JobApplication.fields.email')      => $this->jobApplication->email,
                        __('site.models.JobApplication.fields.phone')      => $this->jobApplication->phone,
                    ],
                    __('site.mail.submission_details') => [
                        __('site.models.JobApplication.fields.vacancy_id')             => $this->jobApplication->vacancy?->title->forceTranslate(),
                        __('site.models.JobApplication.fields.referral_source')        => $this->jobApplication->referral_source,
                        __('site.models.JobApplication.fields.eligible_to_work_in_uk') => __($this->jobApplication->eligible_to_work_in_uk ? 'site.mail.yes' : 'site.mail.no'),
                        __('site.models.JobApplication.fields.notice_period')          => $this->jobApplication->notice_period,
                        __('site.models.JobApplication.fields.gdpr_consent')           => __($this->jobApplication->gdpr_consent ? 'site.mail.yes' : 'site.mail.no'),
                        __('site.models.JobApplication.fields.linkedin_url')           => $this->jobApplication->linkedin_url,
                        __('site.models.JobApplication.fields.cover_letter')           => $this->jobApplication->cover_letter,
                        __('site.models.JobApplication.fields.relevant_experience')    => $this->jobApplication->relevant_experience,
                    ],
                ],
            ],
        );
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [new Address($this->jobApplication->email, trim($this->jobApplication->first_name.' '.$this->jobApplication->last_name))],
            subject: __('site.mail.new_job_application_subject'),
        );
    }
}
