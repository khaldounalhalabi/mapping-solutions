import ActionsButtons from "@/components/datatable/actions-buttons";
import Datatable from "@/components/datatable/datatable";
import Http from "@/modules/http/http";
import { useTranslation } from "@/hooks/use-translation";
import NewsletterSubscriber from "@/models/newsletter-subscriber";

const Index = ({ exportables }: { exportables: string[] }) => {
    const { t } = useTranslation();
    return (
        <Datatable
            title={t("dashboard.titles.index", {
                model: t("models.NewsletterSubscriber.singular"),
            })}
            createUrl={route("v1.web.protected.newsletter.subscribers.create")}
            importRoute={route(
                "v1.web.protected.newsletter.subscribers.import",
            )}
            exportRoute={route(
                "v1.web.protected.newsletter.subscribers.export",
            )}
            importExampleRoute={route(
                "v1.web.protected.newsletter.subscribers.import.example",
            )}
            exportables={exportables}
            getDataArray={(res) => res.data}
            getTotalPages={(res) => res?.paginate?.total_pages ?? 0}
            getTotalRecords={(res) => res.paginate?.total ?? 0}
            api={(
                page?: number | undefined,
                search?: string | undefined,
                sortCol?: string | undefined,
                sortDir?: string | undefined,
                perPage?: number | undefined,
                params?: object | undefined,
            ) =>
                Http.make<NewsletterSubscriber[]>().get(
                    route("v1.web.protected.newsletter.subscribers.data"),
                    {
                        page:     page,
                        search:   search,
                        sort_col: sortCol,
                        sort_dir: sortDir,
                        limit:    perPage,
                        ...params,
                    },
                )
            }
            schema={[
                {
                    name:     "id",
                    label:    t("dashboard.table.id"),
                    sortable: true,
                },
                {
                    name:     "email",
                    label:    t("models.NewsletterSubscriber.fields.email"),
                    sortable: true,
                },
                {
                    label:  t("dashboard.table.options"),
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route(
                                "v1.web.protected.newsletter.subscribers.index",
                            )}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default Index;
