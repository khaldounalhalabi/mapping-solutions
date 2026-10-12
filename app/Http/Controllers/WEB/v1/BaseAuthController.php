<?php

namespace App\Http\Controllers\WEB\v1;

use App\DTOs\v1\AuthDtos\AuthLoginDTO;
use App\DTOs\v1\AuthDtos\AuthRegisterDTO;
use App\DTOs\v1\AuthDtos\CheckPasswordResetDTO;
use App\DTOs\v1\AuthDtos\RequestResetPasswordDTO;
use App\DTOs\v1\AuthDtos\ResetPasswordDTO;
use App\DTOs\v1\AuthDtos\UpdateUserDTO;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\UserResource;
use App\Services\v1\User\UserService;
use Exception;
use Inertia\Inertia;

class BaseAuthController extends WebController
{
    private UserService $userService;

    private ?string $role = null;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->userService = UserService::make();
        $this->userService->setGuard('web');
        $this->relations = [];
    }

    public function roleHook(string $role)
    {
        $this->role = $role;
    }

    public function login(AuthLoginDTO $dto)
    {
        $user = $this->userService->login($dto->toArray(), $this->role, $this->relations);
        if ($user) {
            Inertia::flash([
                'success' => trans('site.successfully_logged_in'),
            ]);

            return redirect()->route('v1.web.protected.me');
        } else {
            return Inertia::flash([
                'error' => trans('site.credentials_not_match_records'),
            ])->back();
        }
    }

    public function updateUserDetails(UpdateUserDTO $dto)
    {
        $user = $this->userService->updateUserDetails($dto->toArray(), $this->role, $this->relations);

        if ($user) {
            Inertia::flash([
                'success' => trans('site.update_successfully'),
            ]);

            return redirect()->route('v1.web.protected.me');
        } else {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function userDetails()
    {
        $user = $this->userService->userDetails($this->role);

        if ($user) {
            return Inertia::render('user-details', [
                'user' => UserResource::make($user),
            ]);
        } else {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function requestResetPassword(RequestResetPasswordDTO $dto)
    {
        $result = $this->userService->passwordResetRequest($dto->toArray()['email']);
        if ($result) {
            Inertia::flash([
                'success' => trans('site.email_verification_code_sent'),
            ]);

            return Inertia::render('reset-password-code-form');
        } else {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function validateResetPasswordCode(CheckPasswordResetDTO $dto)
    {
        $dto->toArray();
        Inertia::flash([
            'success' => trans('site.code_correct'),
        ]);

        return redirect()->route('v1.web.public.reset.password.page');
    }

    public function resetPassword(ResetPasswordDTO $dto)
    {
        $data = $dto->toArray();
        $result = $this->userService->passwordReset($data['reset_password_code'], $data['password']);

        if ($result) {
            Inertia::flash([
                'success' => trans('site.password_changed_successfully'),
            ]);

            return redirect()->route('v1.web.public.login.page');
        } else {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function register(AuthRegisterDTO $dto)
    {
        $user = $this->userService->register($dto->toArray(), $this->role);
        if ($user) {
            Inertia::flash([
                'success' => trans('site.registered_successfully'),
            ]);

            return redirect()->route('v1.web.protected.me');
        } else {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
    }

    public function logout()
    {
        $this->userService->logout();
        Inertia::flash([
            'success' => trans('site.logout_success'),
        ]);

        return redirect()->route('v1.web.public.login.page');
    }
}
