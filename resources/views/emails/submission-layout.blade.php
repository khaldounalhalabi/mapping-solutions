@extends ('emails.layout', ['intro' => __('site.mail.submission_intro')])

@section ('body')
    <tr>
        <td
            style="
                padding: 18px 24px;
                background-color: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
                font-size: 13px;
                line-height: 1.8;
            "
        >
            <strong>{{ __('site.mail.reference') }}:</strong>
            #{{ $reference }}<br />
            <strong>{{ __('site.mail.submitted_at') }}:</strong>
            {{ $submittedAt ?? __('site.mail.not_provided') }}
        </td>
    </tr>
    @foreach ($sections as $heading => $fields)
        <tr>
            <td style="padding: 24px 24px 0">
                <h2
                    style="
                        margin: 0 0 12px;
                        color: #0f253b;
                        font-size: 17px;
                        line-height: 1.4;
                    "
                >
                    {{ $heading }}
                </h2>
                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                        border-collapse: collapse;
                        table-layout: fixed;
                        text-align: start;
                        font-size: 14px;
                        line-height: 1.7;
                    "
                >
                    @foreach ($fields as $label => $value)
                        <tr>
                            <th
                                scope="row"
                                width="34%"
                                valign="top"
                                style="
                                    padding: 12px 8px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #64748b;
                                    font-weight: normal;
                                    text-align: start;
                                    overflow-wrap: anywhere;
                                "
                            >
                                {{ $label }}
                            </th>
                            <td
                                valign="top"
                                style="
                                    padding: 12px 8px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #1e293b;
                                    overflow-wrap: anywhere;
                                    word-break: break-word;
                                "
                            >
                                {!! nl2br(e(filled($value) ? $value : __('site.mail.not_provided'))) !!}
                            </td>
                        </tr>
                    @endforeach
                </table>
            </td>
        </tr>
    @endforeach
    <tr>
        <td style="padding: 28px 24px">
            <p style="
                    margin: 0 0 20px;
                    font-size: 14px;
                    line-height: 1.7;
                    color: #475569;
                ">{{ __('site.mail.reply_hint') }}</p>
            <a
                href="{{ $dashboardUrl }}"
                style="
                    display: inline-block;
                    padding: 12px 20px;
                    border-radius: 6px;
                    background-color: #0f766e;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    text-decoration: none;
                "
                >{{ __('site.mail.view_submission') }}</a
            >
        </td>
    </tr>
@endsection
