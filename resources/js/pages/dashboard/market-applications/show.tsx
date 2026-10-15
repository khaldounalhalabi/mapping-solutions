import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import { useTranslation } from "@/hooks/use-translation";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import MarketApplication from "@/models/market-application";
import { DynamicIcon } from "lucide-react/dynamic";

const Show = ({
    marketApplication,
}: {
    marketApplication: MarketApplication;
}) => {
    const { t } = useTranslation();
    return (
        <PageCard
            title={t("dashboard.titles.details", {
                model: t("models.MarketApplication.singular"),
            })}
            actions={
                <Link
                    href={route(
                        "v1.web.protected.market.applications.edit",
                        marketApplication.id,
                    )}
                >
                    <Button>{t("dashboard.actions.edit")}</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem
                        label={t("models.MarketApplication.fields.name")}
                        value={translate(marketApplication.name)}
                    />
                    <DetailItem
                        label={t("models.MarketApplication.fields.icon_key")}
                        value={
                            <DynamicIcon name={marketApplication.icon_key} />
                        }
                    />
                </div>

                <DetailItem
                    label={t("models.MarketApplication.fields.summary")}
                    value={translate(marketApplication.summary)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
                <DetailItem
                    label={t("models.MarketApplication.fields.description")}
                    value={translate(marketApplication.description)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
