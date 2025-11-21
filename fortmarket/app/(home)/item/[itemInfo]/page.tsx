import ItemDetails from "@/components/item-info";
import Link from "next/link";


export default async function itemInfo(props: PageProps<'/item/[itemInfo]'>) {
    
    const { itemInfo } = await props.params;
    const { regularPrice, finalPrice } = await props.searchParams;

    return (
        <div className="flex flex-col">
            <div className="px-5 pt-3">
              <Link href={"/"}>
                Voltar
            </Link>  
            </div>
            
            <ItemDetails
                itemId={itemInfo}
                regularPrice={Number(regularPrice)}
                finalPrice={Number(finalPrice)}
            />
        </div>
    )
}
