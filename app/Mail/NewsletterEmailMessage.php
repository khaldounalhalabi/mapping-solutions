<?php

namespace App\Mail;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Models\NewsletterEmail;
use App\Serializers\SerializedMedia;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewsletterEmailMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public NewsletterEmail $newsletterEmail,
        public string $unsubscribeUrl,
    ) {}

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     *
     * @throws Exception
     */
    public function attachments(): array
    {
        return array_map(
            fn (SerializedMedia $attachment): Attachment => Attachment::fromData(
                fn (): string => $attachment->contents(),
                $attachment->name().'.'.$attachment->extension,
            )->withMime($attachment->mimeType),
            $this->newsletterEmail->attachments ?? [],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.newsletter-email',
            with: [
                'content'        => $this->newsletterEmail->content,
                'unsubscribeUrl' => $this->unsubscribeUrl,
            ],
        );
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->newsletterEmail->title,
        );
    }
}
