import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { IconPicker } from "@/components/ui/icon-picker";
import { FC, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

interface FormIconPickerProps {
    label?: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (icon: string | undefined) => void;
}

const FormIconPicker: FC<FormIconPickerProps> = ({
    label,
    name,
    defaultValue,
    placeholder,
    required,
    onChange,
}) => {
    const {
        props: { errors },
    } = usePage();
    const [value, setValue] = useState<string | undefined>(
        defaultValue ?? undefined,
    );

    useEffect(() => {
        onChange?.(value);
    }, [value]);

    return (
        <Field>
            {label && (
                <FieldLabel className="font-medium">
                    {label}{" "}
                    {required && <span className={"text-destructive"}>*</span>}
                </FieldLabel>
            )}
            <IconPicker
                value={value}
                onChange={(v) => setValue(v)}
                placeholder={placeholder}
            />
            {errors[name] && <FieldError>{errors[name]}</FieldError>}
        </Field>
    );
};

export default FormIconPicker;
