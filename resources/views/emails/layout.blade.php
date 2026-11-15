<!DOCTYPE html>
<html
    lang="{{ app()->getLocale() }}"
    dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"
>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>{{ $title }}</title>
</head>
<body
    style="
        margin: 0;
        padding: 0;
        background-color: #f1f5f9;
        color: #1e293b;
        font-family: Arial, Helvetica, sans-serif;
        -webkit-text-size-adjust: 100%;
    "
>
    <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="background-color: #f1f5f9"
    >
        <tr>
            <td align="center" style="padding: 32px 12px">
                <table
                    role="presentation"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                        max-width: 680px;
                        border-collapse: separate;
                        background-color: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        overflow: hidden;
                    "
                >
                    <tr>
                        <td
                            style="
                                padding: 28px 24px;
                                background-color: #0f253b;
                                border-top: 5px solid #14b8a6;
                            "
                        >
                            <p style="
                                    margin: 0 0 18px;
                                    color: #99f6e4;
                                    font-size: 13px;
                                    font-weight: bold;
                                    letter-spacing: 1px;
                                ">{{ config('app.name') }}</p>
                            <h1
                                style="
                                    margin: 0;
                                    color: #ffffff;
                                    font-size: 26px;
                                    line-height: 1.3;
                                "
                            >
                                {{ $title }}
                            </h1>
                            @isset ($intro)
                                <p style="
                                        margin: 12px 0 0;
                                        color: #cbd5e1;
                                        font-size: 14px;
                                        line-height: 1.6;
                                    ">{{ $intro }}</p>
                            @endisset
                        </td>
                    </tr>
                    @yield ('body')
                </table>
                <p style="
                        margin: 20px 0 0;
                        color: #64748b;
                        font-size: 12px;
                    ">{{ config('app.name') }}</p>
            </td>
        </tr>
    </table>
</body>
</html>
