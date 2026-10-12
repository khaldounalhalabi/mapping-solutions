<?php

namespace App\Services\v1\User;

use Exception;
use App\Models\User;
use RuntimeException;
use App\Traits\Makable;
use App\Mail\ResetPasswordCodeEmail;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Mail;
use App\Services\Contracts\BaseService;
use Illuminate\Contracts\Auth\StatefulGuard;

/**
 * @extends BaseService<User>
 *
 * @property UserRepository $repository
 */
class UserService extends BaseService
{
    use Makable;

    private string $guard = 'web';

    protected string $repositoryClass = UserRepository::class;

    private function generateVerificationCode(): string
    {
        do {
            $code = sprintf('%06d', mt_rand(1, 999999));
            $user = $this->repository->getUserByPasswordResetCode($code);
        } while ($user != null);

        return $code;
    }

    private function guard(): StatefulGuard
    {
        return auth()->guard($this->guard);
    }

    public function login(array $data, ?string $role = null, array $relations = []): ?User
    {
        $guard = $this->guard();
        $authenticated = $guard->attempt([
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        if (! $authenticated) {
            return null;
        }

        $user = $guard->user();

        if (! $user instanceof User) {
            return null;
        }

        if ($role && ! $user->hasRole($role)) {
            $guard->logout();

            return null;
        }

        return $user->load($relations);
    }

    public function logout(): void
    {
        $this->guard()->logout();
    }

    public function passwordReset(string $verificationCode, string $password): bool
    {
        $user = $this->repository->getUserByPasswordResetCode($verificationCode);

        if ($user) {
            $user->password = $password;
            $user->reset_password_code = null;
            $user->save();

            return true;
        }

        return false;
    }

    public function passwordResetRequest(string $email): bool
    {
        $user = $this->repository->getUserByEmail($email);

        if (! $user) {
            return false;
        }

        $user->reset_password_code = $this->generateVerificationCode();
        $user->save();

        Mail::to($user)
            ->send(new ResetPasswordCodeEmail(
                $user->reset_password_code,
                $user->email,
            ));

        return true;
    }

    public function register(array $data, ?string $role = null, array $relations = []): User
    {
        $user = $this->repository->create($data);

        if (! $user instanceof User) {
            throw new RuntimeException('The user repository did not return a user.');
        }

        if ($role) {
            $user->assignRole($role);
        }

        $this->guard()->login($user);

        return $user->load($relations);
    }

    /**
     * @throws Exception
     */
    public function setGuard(string $guard = 'api'): void
    {
        if (! in_array($guard, array_keys(config('auth.guards')))) {
            throw new Exception("Undefined Guard : [$guard]");
        }

        $this->guard = $guard;
    }

    public function updateUserDetails(array $data, ?string $role = null, array $relations = []): ?User
    {
        $guard = $this->guard();
        $user = $guard->user();

        if (! $user instanceof User) {
            return null;
        }

        if ($role && ! $user->hasRole($role)) {
            return null;
        }

        $user = $this->repository->update($data, $user->id);

        if (! $user instanceof User) {
            throw new RuntimeException('The user repository did not return a user.');
        }

        $guard->login($user);

        return $user->load($relations);
    }

    public function userDetails(?string $role = null, array $relations = []): ?User
    {
        $user = $this->guard()->user();

        if (! $user instanceof User) {
            return null;
        }

        if ($role && ! $user->hasRole($role)) {
            return null;
        }

        return $user->load($relations);
    }
}
