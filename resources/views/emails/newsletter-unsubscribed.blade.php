@extends ('emails.layout', ['title' => __('site.mail.unsubscribed_title')])

@section ('body')
    <tr>
        <td
            style="
                padding: 28px 24px;
                color: #475569;
                font-size: 16px;
                line-height: 1.7;
            "
        >
            <p style="margin: 0">{{ __('site.mail.unsubscribed_message') }}</p>
        </td>
    </tr>
@endsection
