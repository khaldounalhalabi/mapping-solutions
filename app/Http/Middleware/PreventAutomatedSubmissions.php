<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Contracts\Encryption\DecryptException;

class PreventAutomatedSubmissions
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->input('_form_token');
        $payload = null;

        if (is_string($token)) {
            try {
                $payload = json_decode(Crypt::decryptString($token), true);
            } catch (DecryptException) {
                $payload = null;
            }
        }

        if (! is_array($payload)
            || ! is_int($payload['issued_at'] ?? null)
            || ! is_string($payload['session'] ?? null)
            || ! hash_equals(hash('sha256', $request->session()->getId()), $payload['session'])
            || now()->timestamp - $payload['issued_at'] < 2
            || now()->timestamp - $payload['issued_at'] > 7200
            || ! in_array($request->input('_website'), [null, ''], true)) {
            throw ValidationException::withMessages([
                '_form_token' => __('site.forms.verification_failed'),
            ]);
        }

        $request->request->remove('_form_token');
        $request->request->remove('_website');

        return $next($request);
    }
}
