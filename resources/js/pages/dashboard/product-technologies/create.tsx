import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Check, Images, Shapes } from "lucide-react";

import PageCard from "@/components/ui/page-card";
import Form from "@/components/form/form";
import Media from "@/models/media";
import FilepondInput from "@/components/form/fields/filepond/filepond-input";
import TranslatableInput from "@/components/form/fields/translatable-input";
import FormLocaleProvider from "@/providers/form-locale-provider";
import FormIconPicker from "@/components/form/fields/form-icon-picker";
import { useTranslation } from "@/hooks/use-translation";
import Input from "@/components/form/fields/input";

type IconType = "key" | "file" | null;

const iconOptions = [
    {
        value:       "key",
        title:       "models.product_technology.icon_source.library",
        description:
            "models.product_technology.icon_source.library_description",
        icon:        Shapes,
    },
    {
        value:       "file",
        title:       "models.product_technology.icon_source.upload",
        description: "models.product_technology.icon_source.upload_description",
        icon:        Images,
    },
] as const;

const Create = () => {
    const { t } = useTranslation();
    const [iconType, setIconType] = useState<IconType>(null);

    const { post, setData, processing } = useForm<{
        name:      string;
        color:     string;
        icon_key?: string;
        icon:      Media | File | null;
    }>({
        name:     "",
        color:    "#af52de",
        icon_key: "",
        icon:     null,
    });

    const handleIconTypeChange = (type: IconType) => {
        if (iconType === type) return;

        setIconType(type);

        setData((previous) => ({
            ...previous,
            icon_key: "",
            icon:     null,
        }));
    };

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!iconType) return;

        post(route("v1.web.protected.product.technologies.store"), {
            forceFormData: true,
        });
    };

    return (
        <PageCard
            title={t("dashboard.titles.create", {
                model: t("models.product_technology.singular"),
            })}
        >
            <FormLocaleProvider>
                <Form onSubmit={onSubmit} processing={processing}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Technology Name */}
                        <TranslatableInput
                            name="name"
                            label={t("models.product_technology.fields.name")}
                            onChange={(value) => setData("name", value)}
                            required
                        />

                        <Input
                            name="color"
                            label={t("models.product_technology.fields.color")}
                            type="color"
                            defaultValue="#af52de"
                            onChange={(event) =>
                                setData("color", event.target.value)
                            }
                            className="h-12 cursor-pointer p-1"
                            required
                        />

                        {/* Icon Source */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">
                                    {t(
                                        "models.product_technology.fields.icon_source",
                                    )}
                                    <span className="ml-1 text-destructive">
                                        *
                                    </span>
                                </label>

                                <p className="text-xs text-muted-foreground">
                                    {t(
                                        "models.product_technology.icon_source.create_description",
                                    )}
                                </p>
                            </div>

                            {/* Icon Type Cards */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {iconOptions.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected =
                                        iconType === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            disabled={processing}
                                            onClick={() =>
                                                handleIconTypeChange(
                                                    option.value,
                                                )
                                            }
                                            aria-pressed={isSelected}
                                            className={`
                                                group relative flex items-start gap-3
                                                rounded-xl border p-4 text-left
                                                transition-all duration-200
                                                focus-visible:outline-none
                                                focus-visible:ring-2
                                                focus-visible:ring-ring
                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                                ${
                                                    isSelected
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
                                                }
                                            `}
                                        >
                                            {/* Icon */}
                                            <div
                                                className={`
                                                    flex size-11 shrink-0 items-center
                                                    justify-center rounded-lg
                                                    transition-colors
                                                    ${
                                                        isSelected
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-muted text-muted-foreground group-hover:text-foreground"
                                                    }
                                                `}
                                            >
                                                <Icon className="size-5" />
                                            </div>

                                            {/* Text */}
                                            <div className="min-w-0 flex-1 space-y-1">
                                                <div className="text-sm font-semibold">
                                                    {t(option.title)}
                                                </div>

                                                <p className="text-xs text-muted-foreground">
                                                    {t(option.description)}
                                                </p>
                                            </div>

                                            {/* Selection Indicator */}
                                            <div
                                                className={`
                                                    flex size-5 shrink-0 items-center
                                                    justify-center rounded-full border
                                                    transition-colors
                                                    ${
                                                        isSelected
                                                            ? "border-primary bg-primary text-primary-foreground"
                                                            : "border-muted-foreground/40"
                                                    }
                                                `}
                                            >
                                                {isSelected && (
                                                    <Check
                                                        className="size-3"
                                                        strokeWidth={3}
                                                    />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Selected Icon Input */}
                            {iconType && (
                                <div className="pt-2">
                                    {iconType === "key" && (
                                        <FormIconPicker
                                            key="icon-key"
                                            name="icon_key"
                                            label={t(
                                                "models.product_technology.icon_source.choose_icon",
                                            )}
                                            onChange={(value) =>
                                                setData("icon_key", value)
                                            }
                                        />
                                    )}

                                    {iconType === "file" && (
                                        <FilepondInput
                                            key="icon-file"
                                            name="icon"
                                            label={t(
                                                "models.product_technology.icon_source.upload_icon",
                                            )}
                                            onChange={(file) =>
                                                setData("icon", file)
                                            }
                                            acceptedFileTypes={["image/*"]}
                                        />
                                    )}
                                </div>
                            )}

                            {/* Helper Message */}
                            {!iconType && (
                                <p className="text-xs text-muted-foreground">
                                    {t(
                                        "models.product_technology.icon_source.select_to_continue",
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                </Form>
            </FormLocaleProvider>
        </PageCard>
    );
};

export default Create;
