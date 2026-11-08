import { usePage } from "@inertiajs/react";
import SettingKeyEnum from "@/enums/setting-key-enum";
import { Setting, SettingByKey, SettingValueByKey } from "@/models/setting";

const useSettings = () => {
    const { settings } = usePage<{
        settings: Setting[];
    }>().props;

    function getSetting<K extends SettingKeyEnum>(
        key: K,
    ): SettingByKey<K> | undefined {
        return settings.find((setting) => setting.key === key) as
            SettingByKey<K> | undefined;
    }

    function valueOf<K extends SettingKeyEnum>(
        key: K,
        defaultValue: NonNullable<SettingValueByKey[K]>,
    ): NonNullable<SettingValueByKey[K]>;
    function valueOf<K extends SettingKeyEnum>(
        key: K,
    ): NonNullable<SettingValueByKey[K]> | null;

    function valueOf<K extends SettingKeyEnum>(
        key: K,
        defaultValue?: NonNullable<SettingValueByKey[K]>,
    ): NonNullable<SettingValueByKey[K]> | null {
        const value = getSetting(key)?.value;

        return (value ?? defaultValue ?? null) as NonNullable<
            SettingValueByKey[K]
        >;
    }

    return { getSetting, valueOf , settings };
};

export default useSettings;
