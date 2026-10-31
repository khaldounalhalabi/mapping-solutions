<?php

namespace App\Modules\Settings\App\Enums;

enum SettingTypeEnum: string
{
    public static function getAllValues(): array
    {
        return array_column(self::cases(), 'value');
    }
    case BOOLEAN = 'boolean';
    case DATE = 'date';
    case DATETIME = 'datetime';
    case FILE = 'file';
    case HTML_TEXT = 'HTML_TEXT';
    case NUMERIC = 'numeric';
    case PHONE = 'phone';
    case RESOURCE = 'resource';
    case SELECT = 'select';
    case STRING = 'string';
    case TEXT = 'text';
    case TIME = 'time';
    case TRANSLATABLE = 'translatable';
    case TRANSLATABLE_HTML_TEXT = 'translatable_html_text';
    case TRANSLATABLE_TEXT = 'translatable_text';
    case URL = 'url';
}
