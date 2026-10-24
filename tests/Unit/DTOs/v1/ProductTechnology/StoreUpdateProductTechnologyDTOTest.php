<?php

namespace Tests\Unit\DTOs\v1\ProductTechnology;

use Tests\TestCase;
use Illuminate\Validation\ValidationException;
use App\DTOs\v1\ProductTechnology\StoreUpdateProductTechnologyDTO;

class StoreUpdateProductTechnologyDTOTest extends TestCase
{
    public function test_accepts_a_hexadecimal_color(): void
    {
        $dto = StoreUpdateProductTechnologyDTO::fromArray([
            'name'     => json_encode(['en' => 'Thermal Imaging'], JSON_THROW_ON_ERROR),
            'color'    => '#007aff',
            'icon_key' => 'camera',
        ]);

        $this->assertSame('#007aff', $dto->color);
        $this->assertSame('#007aff', $dto->toArray()['color']);
    }

    public function test_rejects_an_invalid_color(): void
    {
        try {
            StoreUpdateProductTechnologyDTO::fromArray([
                'name'     => json_encode(['en' => 'Thermal Imaging'], JSON_THROW_ON_ERROR),
                'color'    => 'blue',
                'icon_key' => 'camera',
            ]);
        } catch (ValidationException $exception) {
            $this->assertSame(
                ['The color field must be a valid hexadecimal color.'],
                $exception->validator->errors()->get('color'),
            );

            return;
        }

        $this->fail('An invalid color was accepted.');
    }
}
