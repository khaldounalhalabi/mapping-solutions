@extends ('emails.layout', ['title' => $inquiry->response_subject])

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
            <p style="
                    margin: 0 0 20px;
                ">{{ __('site.mail.greeting', ['name' => $inquiry->first_name]) }}</p>
            <p style="
                    margin: 0;
                ">{!! nl2br(e($inquiry->response_message)) !!}</p>
        </td>
    </tr>
@endsection
