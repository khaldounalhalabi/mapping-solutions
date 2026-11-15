@extends ('emails.layout', ['title' => __('site.mail.reset_subject')])

@section ('body')
    <tr>
        <td style="padding: 28px 24px">
            <p style="
                    margin: 0 0 20px;
                    color: #475569;
                    font-size: 16px;
                    line-height: 1.7;
                ">{{ __('site.mail.reset_message') }}</p>
            <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                    border: 1px solid #ccfbf1;
                    border-radius: 8px;
                    background-color: #f0fdfa;
                "
            >
                <tr>
                    <td
                        align="center"
                        dir="ltr"
                        style="
                            padding: 24px 12px;
                            color: #0f766e;
                            font-family:
                                &quot;Courier New&quot;, Courier, monospace;
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            line-height: 1.4;
                        "
                    >
                        {{ $code }}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
@endsection
