import SeoHead from "@/components/seo-head";
import { usePage } from "@inertiajs/react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import LanguageDropdown from "@/components/dashboard/navbar/language-dropdown";
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import ToasterProvider from "@/providers/toaster-provider";

const AuthLayout = ({ children }: { children?: ReactNode }) => {
    const { currentLocale } = usePage().props;
    return (
        <DirectionProvider direction={currentLocale === "ar" ? "rtl" : "ltr"}>
            <ThemeProvider defaultTheme={"system"}>
                <SeoHead />
                <ToasterProvider>
                    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                        <div className="w-full max-w-sm">
                            <div className="flex justify-end">
                                <LanguageDropdown />
                            </div>
                            <div className={"flex flex-col gap-6"}>
                                {children}
                            </div>
                        </div>
                    </div>
                </ToasterProvider>
            </ThemeProvider>
        </DirectionProvider>
    );
};

export default AuthLayout;
