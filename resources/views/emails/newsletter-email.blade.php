<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $newsletterEmail->title }}</title>
</head>
<body>
    <main>
        {!! $content !!}
    </main>

    <hr>

    <p>
        You are receiving this email because you subscribed to our newsletter.
        <a href="{{ $unsubscribeUrl }}">Unsubscribe</a>
    </p>
</body>
</html>
