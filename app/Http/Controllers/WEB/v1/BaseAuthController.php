<?php

namespace App\Http\Controllers\WEB\v1;

use Exception;
use Inertia\Inertia;
use App\Services\v1\User\UserService;
use App\DTOs\v1\AuthDtos\AuthLoginDTO;
use App\DTOs\v1\AuthDtos\UpdateUserDTO;
use App\Http\Controllers\WebController;
use App\Http\Resources\v1\UserResource;
use App\DTOs\v1\AuthDtos\AuthRegisterDTO;
use App\DTOs\v1\AuthDtos\ResetPasswordDTO;
use App\DTOs\v1\AuthDtos\CheckPasswordResetDTO;
use App\DTOs\v1\AuthDtos\RequestResetPasswordDTO;

class BaseAuthController extends WebController
{
    private UserService $userService;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->userService = UserService::make();
        $this->userService->setGuard('web');
        $this->relations = [];
    }

    public function login(AuthLoginDTO $dto)
    {
        $user = $this->userService->login($dto->toArray(), $this->relations);
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

    public function logout()
    {
        $this->userService->logout();
        Inertia::flash([
            'success' => trans('site.logout_success'),
        ]);

        return redirect()->route('v1.web.public.login.page');
    }

    public function register(AuthRegisterDTO $dto)
    {
        $user = $this->userService->register($dto->toArray());
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

    public function requestResetPassword(RequestResetPasswordDTO $dto)
    {
        $result = $this->userService->passwordResetRequest($dto->toArray()['email']);
        if ($result) {
            Inertia::flash([
                'success' => trans('site.email_verification_code_sent'),
            ]);

            return Inertia::render('dashboard/reset-password-code-form');
        } else {
            return Inertia::flash([
                'error' => trans('site.something_went_wrong'),
            ])->back();
        }
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

    public function updateUserDetails(UpdateUserDTO $dto)
    {
        $user = $this->userService->updateUserDetails($dto->toArray(), $this->relations);

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
        $user = $this->userService->userDetails();

        if ($user) {
            return Inertia::render('dashboard/user-details', [
                'user' => UserResource::make($user),
            ]);
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
}
