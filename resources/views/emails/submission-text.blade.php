{!! $title !!}

{{ __('site.mail.reference') }}: #{{ $reference }} {{ __('site.mail.submitted_at') }}: {{ $submittedAt ?? __('site.mail.not_provided') }}

@foreach ($sections as $heading => $fields)
    {!! $heading !!}
    @foreach ($fields as $label => $value)
        {!! $label !!}: {!! filled($value) ? $value : __('site.mail.not_provided') !!}

    @endforeach
@endforeach
{{ __('site.mail.reply_hint') }}

{{ __('site.mail.view_submission') }}: {!! $dashboardUrl !!}
