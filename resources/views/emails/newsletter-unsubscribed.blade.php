<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ __('site.mail.unsubscribed') }}</title>
</head>
<body>
    <main>
        <h1>{{ __('site.mail.unsubscribed_title') }}</h1>
        <p>{{ __('site.mail.unsubscribed_message') }}</p>
    </main>
</body>
</html>
