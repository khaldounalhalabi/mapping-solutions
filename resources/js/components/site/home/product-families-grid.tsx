import ProductFamily from "@/models/product-family";

const ProductFamiliesGrid = ({ families }: { families: ProductFamily[] }) => {
    return (
        <div className={"grid grid-cols-5 h-full"}>
            {families.map((f) => (
                <div className={`rounded-lg`}>{f.id}</div>
            ))}
        </div>
    );
};

export default ProductFamiliesGrid;
