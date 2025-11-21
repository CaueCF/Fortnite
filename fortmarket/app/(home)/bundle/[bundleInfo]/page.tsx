import BundleDetails from "@/components/bundle-info";
import Link from "next/link";


export default async function BundleInfo(props: PageProps<'/bundle/[bundleInfo]'>) {
    
    const { bundleInfo } = await props.params;
    const { regularPrice, finalPrice } = await props.searchParams;

    return (
        <div className="flex flex-col">
            <div className="px-5 pt-3">
              <Link href={"/"}>
                Voltar
            </Link>  
            </div>
            
            <BundleDetails
                bundleId={bundleInfo}
                regularPrice={Number(regularPrice)}
                finalPrice={Number(finalPrice)}
            />
        </div>
    )
}
