<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ $inquiry->response_subject }}</title>
</head>
<body>
    <main>
        <p>{{ __('site.mail.greeting', ['name' => $inquiry->first_name]) }}</p>

        <p style="white-space: pre-line">{{ $inquiry->response_message }}</p>
    </main>
</body>
</html>
