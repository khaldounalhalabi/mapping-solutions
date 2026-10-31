import { Setting } from "@/models/setting";
import { useTranslation } from "@/hooks/use-translation";
import SettingTypeEnum from "@/enums/setting-type-enum";
import { translate } from "@/models/translatable";
import Media from "@/models/media";
import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";

function SettingValue({ setting }: { setting: Setting }) {
    const { t } = useTranslation();
    if (
        setting.structure.value_type === SettingTypeEnum.TRANSLATABLE ||
        setting.structure.value_type === SettingTypeEnum.TRANSLATABLE_TEXT
    ) {
        return translate(String(setting.value));
    }

    if (
        setting.structure.value_type == SettingTypeEnum.TRANSLATABLE_HTML_TEXT
    ) {
        return (
            <div className={"max-h-10 overflow-y-hidden"}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: translate(String(setting.value)),
                    }}
                />
            </div>
        );
    }
    if (
        setting?.structure?.value_type == SettingTypeEnum.RESOURCE &&
        setting?.structure?.is_multiple
    ) {
        // @ts-ignore
        return setting?.value?.join(" , ");
    }

    if (setting.structure.value_type == SettingTypeEnum.FILE && setting.value) {
        try {
            return (
                <a
                    className={"cursor-pointer"}
                    download
                    href={(setting?.value as Media | undefined)?.url}
                >
                    <Button className={"cursor-pointer"}>
                        {t("dashboard.actions.download")}
                    </Button>
                </a>
            );
        } catch (e) {
            return t("dashboard.table.no_data");
        }
    }

    return setting.value;
}

export default function index({ settings }: { settings: Setting[] }) {
    const { t } = useTranslation();

    return (
        <PageCard title={t("dashboard.titles.index" , {
            model: t("models.Setting.plural")
        })}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={"text-start"}>ID</TableHead>
                        <TableHead className={"text-start"}>
                            {t("models.Setting.label")}
                        </TableHead>
                        <TableHead className={"text-start"}>
                            {t("models.Setting.value")}
                        </TableHead>
                        <TableHead className={"text-start"}>
                            {t("dashboard.table.actions")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {settings.map((set, index) => (
                        <TableRow key={index}>
                            <TableCell className={"text-start"}>
                                {set.id}
                            </TableCell>
                            <TableCell className={"text-start"}>
                                {translate(set.label)}
                            </TableCell>
                            <TableCell
                                className={
                                    "overflow-x-hidden max-w-96 text-start"
                                }
                            >
                                <SettingValue setting={set} />
                            </TableCell>
                            <TableCell className={"text-start"}>
                                <Link
                                    href={route(
                                        "v1.web.protected.settings.edit",
                                        set.id,
                                    )}
                                >
                                    <Button
                                        size={"icon"}
                                        type={"button"}
                                        variant={"secondary"}
                                    >
                                        <PencilIcon />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </PageCard>
    );
}
