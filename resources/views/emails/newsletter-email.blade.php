@extends ('emails.layout', ['title' => $newsletterEmail->title])

@section ('body')
    <tr>
        <td
            style="
                padding: 28px 24px;
                color: #1e293b;
                font-size: 16px;
                line-height: 1.7;
                overflow-wrap: anywhere;
                word-break: break-word;
            "
        >
            {!! $content !!}
        </td>
    </tr>
    <tr>
        <td
            style="
                padding: 20px 24px;
                background-color: #f8fafc;
                border-top: 1px solid #e2e8f0;
                color: #64748b;
                font-size: 13px;
                line-height: 1.7;
            "
        >
            {{ __('site.mail.subscription_reason') }}
            <a
                href="{{ $unsubscribeUrl }}"
                style="color: #0f766e; text-decoration: underline"
                >{{ __('site.mail.unsubscribe') }}</a
            >
        </td>
    </tr>
@endsection
