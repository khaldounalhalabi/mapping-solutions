import { usePage } from "@inertiajs/react";
import { useRef } from "react";

export default function usePublicFormProtection() {
    const { formProtectionToken, errors } = usePage().props;
    const honeypot = useRef<HTMLInputElement>(null);

    const protect = <T extends object>(data: T) => ({
        ...data,
        _form_token: formProtectionToken,
        _website:    honeypot.current?.value ?? "",
    });

    const protectionFields = (
        <>
            <div hidden aria-hidden="true">
                <input
                    ref={honeypot}
                    type="text"
                    name="_website"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>
            {errors._form_token && <p role="alert">{errors._form_token}</p>}
        </>
    );

    return { protect, protectionFields };
}
