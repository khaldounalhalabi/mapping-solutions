import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";
import { Link } from "@inertiajs/react";
import { FieldGroup } from "@/components/ui/field";
import Gallery from "@/components/ui/gallery";
import DetailItem from "@/components/ui/detail-item";
import { translate } from "@/models/translatable";
import Supplier from "@/models/supplier";

const Show = ({ supplier }: { supplier: Supplier }) => {
    return (
        <PageCard
            title="Supplier Details"
            actions={
                <Link
                    href={route("v1.web.protected.suppliers.edit", supplier.id)}
                >
                    <Button>Edit</Button>
                </Link>
            }
        >
            <FieldGroup>
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <DetailItem label="Name" value={supplier.name} />
                    <DetailItem
                        label="Logo"
                        value={<Gallery sources={[supplier?.logo?.url]} />}
                        className="md:col-span-2"
                        orientation="vertical"
                    />
                </div>

                <DetailItem
                    label="Description"
                    value={translate(supplier.description)}
                    orientation="vertical"
                    className="md:col-span-2"
                />
            </FieldGroup>
        </PageCard>
    );
};

export default Show;
