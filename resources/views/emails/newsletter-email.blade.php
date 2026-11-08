<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ $newsletterEmail->title }}</title>
</head>
<body>
    <main>{!! $content !!}</main>

    <hr />

    <p>
        {{ __('site.mail.subscription_reason') }}
        <a href="{{ $unsubscribeUrl }}">{{ __('site.mail.unsubscribe') }}</a>
    </p>
</body>
</html>
