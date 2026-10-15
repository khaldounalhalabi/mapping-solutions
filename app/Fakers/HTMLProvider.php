<?php

namespace App\Fakers;

use Faker\Provider\Base;
use Random\RandomException;

class HTMLProvider extends Base
{
    /**
     * @throws RandomException
     */
    public function html(int $blocks = 3): string
    {
        $html = [];

        for ($i = 0; $i < $blocks; $i++) {
            $type = static::randomElement([
                'paragraph',
                'heading',
                'list',
                'blockquote',
            ]);

            $html[] = match ($type) {
                'heading' => sprintf(
                    '<h2>%s</h2>',
                    e($this->generator->sentence()),
                ),

                'list' => '<ul>'.collect(
                    range(1, random_int(2, 5)),
                )->map(
                    fn () => '<li>'.
                            e($this->generator->sentence()).
                            '</li>',
                )->implode('').'</ul>',

                'blockquote' => sprintf(
                    '<blockquote><p>%s</p></blockquote>',
                    e($this->generator->paragraph()),
                ),

                default => sprintf(
                    '<p>%s</p>',
                    e($this->generator->paragraph()),
                ),
            };
        }

        return implode("\n", $html);
    }
}
