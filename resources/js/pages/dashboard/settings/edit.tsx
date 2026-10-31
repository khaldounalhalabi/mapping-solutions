import Input from "@/components/form/fields/input";
import Radio from "@/components/form/fields/radio";
import SettingTypeEnum from "@/enums/setting-type-enum";
import { isSettingType, Setting } from "@/models/setting";
import { useForm } from "@inertiajs/react";
import Media from "@/models/media";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import TextEditor from "@/components/form/fields/text-editor";
import TranslatableInput from "@/components/form/fields/translatable-input";
import TranslatableTextarea from "@/components/form/fields/translatable-textarea";
import TranslatableTextEditor from "@/components/form/fields/translatable-text-editor";
import Textarea from "@/components/form/fields/textarea";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import Select from "@/components/form/fields/select/select";
import ApiSelect from "@/components/form/fields/select/api-select";
import { translate } from "@/models/translatable";
import Http from "@/modules/http/http";
import ApiResponse from "@/modules/http/api-response";
import { getNestedPropertyValue } from "@/helper";
import { Option } from "@/components/form/fields/select/types";
import PageCard from "@/components/ui/page-card";
import FormLocaleProvider from "@/providers/form-locale-provider";
import Form from "@/components/form/form";

const TRANSLATABLE_FIELDS: SettingTypeEnum[] = [
    SettingTypeEnum.TRANSLATABLE_HTML_TEXT,
    SettingTypeEnum.TRANSLATABLE,
    SettingTypeEnum.TRANSLATABLE_TEXT,
];

type SettingFormData = {
    value:   string | number | boolean | undefined | File | Media | null;
    _method: "PUT";
};

const Edit = ({ setting }: { setting: Setting }) => {
    const { t } = useTranslation();

    const { post, processing, setData } = useForm<SettingFormData>({
        value:   setting.value,
        _method: "PUT",
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.settings.update", setting.id));
    };

    function getInputBySettingType() {
        if (isSettingType(setting, SettingTypeEnum.BOOLEAN)) {
            return (
                <Radio
                    name="value"
                    items={[
                        {
                            label: t("dashboard.boolean.yes"),
                            value: "1",
                        },
                        {
                            label: t("dashboard.boolean.no"),
                            value: "0",
                        },
                    ]}
                    onChange={(value) => setData("value", value)}
                    label={t("models.Setting.value")}
                    checked={`${setting.value}`}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.DATE)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="date"
                    onChange={(e) => {
                        setData("value", e.target.value);
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.DATETIME)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="datetime-local"
                    onChange={(e) => {
                        setData("value", e.target.value.replace("T", " "));
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.HTML_TEXT)) {
            return (
                <div className="md:col-span-2">
                    <TextEditor
                        name="value"
                        label={t("models.Setting.value")}
                        onChange={(value) => setData("value", value)}
                        defaultValue={setting.value}
                    />
                </div>
            );
        }

        if (isSettingType(setting, SettingTypeEnum.TRANSLATABLE)) {
            return (
                <TranslatableInput
                    name="value"
                    label={t("models.Setting.value")}
                    onChange={(value) => setData("value", value)}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.TRANSLATABLE_TEXT)) {
            return (
                <TranslatableTextarea
                    name="value"
                    label={t("models.Setting.value")}
                    onChange={(value) => setData("value", value)}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.TRANSLATABLE_HTML_TEXT)) {
            return (
                <div className="md:col-span-2">
                    <TranslatableTextEditor
                        name="value"
                        label={t("models.Setting.value")}
                        onChange={(value) => setData("value", value)}
                        defaultValue={setting.value}
                    />
                </div>
            );
        }

        if (isSettingType(setting, SettingTypeEnum.NUMERIC)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="number"
                    onChange={(e) => {
                        const value = e.target.value;

                        setData(
                            "value",
                            value === "" ? undefined : Number(value),
                        );
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.STRING)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="text"
                    onChange={(e) => {
                        setData("value", e.target.value);
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.PHONE)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="tel"
                    onChange={(e) => {
                        setData("value", e.target.value);
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.TIME)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="time"
                    onChange={(e) => {
                        setData("value", e.target.value);
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.URL)) {
            return (
                <Input
                    name="value"
                    label={t("models.Setting.value")}
                    type="url"
                    onChange={(e) => {
                        setData("value", e.target.value);
                    }}
                    defaultValue={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.TEXT)) {
            return (
                <div className="md:col-span-2">
                    <Textarea
                        label={t("models.Setting.value")}
                        name="value"
                        onChange={(e) => {
                            setData("value", e.target.value);
                        }}
                        defaultValue={setting.value}
                    />
                </div>
            );
        }

        if (isSettingType(setting, SettingTypeEnum.FILE)) {
            return (
                <div className="md:col-span-2">
                    <FilepondInput
                        name="cover"
                        label={t("models.Setting.value")}
                        onChange={(file) => {
                            setData("value", file);
                        }}
                        defaultValue={setting.value}
                        acceptedFileTypes={[]}
                    />
                </div>
            );
        }

        if (isSettingType(setting, SettingTypeEnum.SELECT)) {
            return (
                <Select
                    data={setting.structure.options ?? []}
                    onChange={(value) => {
                        setData("value", value);
                    }}
                    label={t("models.Setting.value")}
                    selected={setting.value}
                />
            );
        }

        if (isSettingType(setting, SettingTypeEnum.RESOURCE)) {
            return (
                <ApiSelect
                    label={
                        translate(setting.label) +
                        ` - Current Value : ${setting.value}`
                    }
                    name="value"
                    api={(page?: number, search?: string) => {
                        if (setting.structure.resource_api) {
                            return Http.make<unknown[]>().get(
                                setting.structure.resource_api,
                                {
                                    page,
                                    search,
                                },
                            );
                        }

                        return Promise.resolve(
                            new ApiResponse(
                                [],
                                false,
                                404,
                                "Undefined ROUTE",
                                undefined,
                            ),
                        );
                    }}
                    getDataArray={(response) => {
                        return response.data ?? [];
                    }}
                    getIsLast={(data) => {
                        return data.paginate?.is_last_page ?? true;
                    }}
                    getTotalPages={(data) => {
                        return data?.paginate?.total_pages ?? 0;
                    }}
                    getOptionValue={(item) =>
                        getNestedPropertyValue(
                            item,
                            setting.structure.resource_value ?? "id",
                        )
                    }
                    getOptionLabel={(item) =>
                        setting.structure.is_translated
                            ? translate(
                                  getNestedPropertyValue(
                                      item,
                                      setting.structure.resource_label ?? "",
                                  ),
                              )
                            : getNestedPropertyValue(
                                  item,
                                  setting.structure.resource_label ?? "",
                              )
                    }
                    isMultiple={setting.structure.is_multiple ?? false}
                    onChange={(option: Option | Option[]) => {
                        if (Array.isArray(option)) {
                            setData(
                                "value",
                                JSON.stringify(option.map((o) => o.value)),
                            );
                        } else {
                            setData("value", option.value);
                        }
                    }}
                    closeOnSelect={!setting.structure.is_multiple}
                />
            );
        }

        return null;
    }

    const formContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {getInputBySettingType()}

            <div className="md:col-span-2">
                {translate(setting.description)}
            </div>
        </div>
    );

    return (
        <PageCard
            title={t("dashboard.titles.edit", {
                setting_label: translate(setting.label),
            })}
        >
            {TRANSLATABLE_FIELDS.includes(setting.structure.value_type) ? (
                <FormLocaleProvider>
                    <Form onSubmit={onSubmit} processing={processing}>
                        {formContent}
                    </Form>
                </FormLocaleProvider>
            ) : (
                <Form onSubmit={onSubmit} processing={processing}>
                    {formContent}
                </Form>
            )}
        </PageCard>
    );
};

export default Edit;
