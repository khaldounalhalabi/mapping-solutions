import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormLocale } from "@/providers/form-locale-provider";
import { translate } from "@/models/translatable";
import { useTranslation } from "@/hooks/use-translation";
import { usePage } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface UsesFieldProps {
    initialValue?: string;
    onChange:      (value: string) => void;
}

export default function UsesField({
    initialValue = "",
    onChange,
}: UsesFieldProps) {
    const { locale } = useFormLocale();
    const [translations, setTranslations] = useState<Record<string, string>>(
        () => (initialValue ? translate(initialValue, true) : {}),
    );
    return (
        <UsesRows
            key={locale}
            initialValue={translations[locale ?? "en"] ?? ""}
            onChange={(value) => {
                const updated = { ...translations, [locale ?? "en"]: value };
                setTranslations(updated);
                onChange(JSON.stringify(updated));
            }}
        />
    );
}

function UsesRows({ initialValue = "", onChange }: UsesFieldProps) {
    const { t } = useTranslation();
    const { errors } = usePage().props;
    const nextId = useRef(0);
    const [rows, setRows] = useState(() => {
        const values = initialValue
            .split(/\r?\n/)
            .filter((value) => value.trim());
        return (values.length ? values : [""]).map((value) => ({
            id: nextId.current++,
            value,
        }));
    });

    const updateRows = (updated: typeof rows) => {
        setRows(updated);
        onChange(updated.map((row) => row.value).join("\n"));
    };

    return (
        <fieldset className="space-y-3">
            <legend className="text-sm font-medium">
                {t("models.ProductRange.fields.uses")}{" "}
                <span className="text-destructive">*</span>
            </legend>
            <div className="space-y-2">
                {rows.map((row, index) => (
                    <div key={row.id} className="flex items-start gap-2">
                        <Input
                            aria-label={t("models.ProductRange.use_number", {
                                number: index + 1,
                            })}
                            aria-invalid={Boolean(errors.uses)}
                            value={row.value}
                            required
                            onChange={(event) =>
                                updateRows(
                                    rows.map((item) =>
                                        item.id === row.id
                                            ? {
                                                  ...item,
                                                  value: event.target.value.replace(
                                                      /[\r\n]/g,
                                                      "",
                                                  ),
                                              }
                                            : item,
                                    ),
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            disabled={rows.length === 1}
                            aria-label={t("models.ProductRange.remove_use", {
                                number: index + 1,
                            })}
                            onClick={() =>
                                updateRows(
                                    rows.filter((item) => item.id !== row.id),
                                )
                            }
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                ))}
            </div>
            {errors.uses && <FieldError>{errors.uses}</FieldError>}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                    updateRows([...rows, { id: nextId.current++, value: "" }])
                }
            >
                <Plus className="size-4" /> {t("models.ProductRange.add_use")}
            </Button>
        </fieldset>
    );
}
