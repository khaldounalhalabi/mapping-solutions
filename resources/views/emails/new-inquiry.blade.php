<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8" />
    <title>{{ __('site.mail.new_inquiry_subject') }}</title>
</head>
<body>
    <main>
        <h1>{{ __('site.mail.new_inquiry_subject') }}</h1>
        <p>{{ $inquiry->first_name }} {{ $inquiry->last_name }}</p>
        <p>{{ $inquiry->email }}</p>
        <p>{{ $inquiry->subject }}</p>
        <p style="white-space: pre-line">{{ $inquiry->message }}</p>
        <p><a href="{{ route('v1.web.protected.inquiries.show', $inquiry->id) }}">{{ __('site.mail.view_submission') }}</a></p>
    </main>
</body>
</html>
