<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8" />
    <title>{{ __('site.mail.new_job_application_subject') }}</title>
</head>
<body>
    <main>
        <h1>{{ __('site.mail.new_job_application_subject') }}</h1>
        <p>{{ $jobApplication->first_name }} {{ $jobApplication->last_name }}</p>
        <p>{{ $jobApplication->email }}</p>
        
        <p style="white-space: pre-line">{{ $jobApplication->cover_letter }}</p>
        <p><a href="{{ route('v1.web.protected.job.applications.show', $jobApplication->id) }}">{{ __('site.mail.view_submission') }}</a></p>
    </main>
</body>
</html>
