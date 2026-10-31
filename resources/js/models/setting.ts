import SettingTypeEnum from "@/enums/setting-type-enum";
import Media from "@/models/media";
import SettingKeyEnum from "@/enums/setting-key-enum";

type SettingBase<T extends SettingTypeEnum, V extends any> = {
    id:        number;
    key:       string;
    label:     string;
    structure: {
        value_type:      T;
        options?:        string[];
        resource_api?:   string;
        resource_label?: string;
        resource_value?: string;
        is_translated?:  boolean;
        is_multiple?:    boolean;
    };
    value?:       V | undefined;
    description?: string;
};

type StringSetting = SettingBase<SettingTypeEnum.STRING, string>;
type NumericSetting = SettingBase<SettingTypeEnum.NUMERIC, number>;
type BooleanSetting = SettingBase<SettingTypeEnum.BOOLEAN, boolean>;
type DateSetting = SettingBase<SettingTypeEnum.DATE, string>;
type TimeSetting = SettingBase<SettingTypeEnum.TIME, string>;
type DateTimeSetting = SettingBase<SettingTypeEnum.DATETIME, string>;
type TranslatableSetting = SettingBase<SettingTypeEnum.TRANSLATABLE, string>;
type TranslatableTextSetting = SettingBase<
    SettingTypeEnum.TRANSLATABLE_TEXT,
    string
>;
type TextSetting = SettingBase<SettingTypeEnum.TEXT, string>;
type HTMLTextSetting = SettingBase<SettingTypeEnum.HTML_TEXT, string>;
type SelectSetting = SettingBase<SettingTypeEnum.SELECT, string>;
type ResourceSetting = SettingBase<SettingTypeEnum.RESOURCE, string>;
type FileSetting = SettingBase<SettingTypeEnum.FILE, Media>;
type TranslatableHTMLSetting = SettingBase<
    SettingTypeEnum.TRANSLATABLE_HTML_TEXT,
    string
>;
type PhoneSetting = SettingBase<SettingTypeEnum.PHONE, string>;
type URLSetting = SettingBase<SettingTypeEnum.URL, string>;

export type Setting =
    | StringSetting
    | NumericSetting
    | BooleanSetting
    | DateSetting
    | TimeSetting
    | DateTimeSetting
    | TranslatableSetting
    | TextSetting
    | HTMLTextSetting
    | SelectSetting
    | ResourceSetting
    | TranslatableTextSetting
    | FileSetting
    | TranslatableHTMLSetting
    | PhoneSetting
    | URLSetting;

export function isSettingType<T extends SettingTypeEnum>(
    setting: Setting,
    type: T,
): setting is Extract<Setting, { structure: { value_type: T } }> {
    return setting.structure.value_type === type;
}

// Map each setting key to its corresponding value type.
export type SettingKeyTypeMap = {
    [SettingKeyEnum.ADDRESS]:                SettingTypeEnum.STRING;
    [SettingKeyEnum.CONTACT_EMAIL]:          SettingTypeEnum.STRING;
    [SettingKeyEnum.CONTACT_PHONE]:          SettingTypeEnum.PHONE;
    [SettingKeyEnum.START_YEAR]:             SettingTypeEnum.NUMERIC;
    [SettingKeyEnum.ADDRESS_GOOGLE_MAP_URL]: SettingTypeEnum.URL;
    [SettingKeyEnum.LINKEDIN_URL]:           SettingTypeEnum.STRING;
    [SettingKeyEnum.FACEBOOK_URL]:           SettingTypeEnum.STRING;
    [SettingKeyEnum.INSTAGRAM_URL]:          SettingTypeEnum.STRING;
    [SettingKeyEnum.YOUTUBE_URL]:            SettingTypeEnum.STRING;
};

// Resolve a setting variant by its value_type.
export type SettingByType<T extends SettingTypeEnum> = Extract<
    Setting,
    { structure: { value_type: T } }
>;

// Resolve the setting variant associated with a key.
export type SettingByKey<K extends SettingKeyEnum> = SettingByType<
    SettingKeyTypeMap[K]
> & {
    key: K;
};
export type SettingValueByKey = {
    [K in SettingKeyEnum]: SettingByType<SettingKeyTypeMap[K]>["value"];
};
