import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const BundleShopCardItem = ({ bundle, finalPrice, regularPrice }: { bundle: any, finalPrice: number, regularPrice: number }) => {

    return (
        <Card className="bg-[#FFFFFF0D] rounded-md
         h-full w-full
         wrap-break-word
         border
         p-1">
            <CardContent className="h-30 relative">
                <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    sizes="auto"
                    style={{
                        objectFit: "contain"
                    }}
                />
            </CardContent>
            <CardHeader className="font-semibold">
                <CardDescription className='text-lg'>{bundle.info}</CardDescription>
                <CardTitle className='text-2xl'>{bundle.name}</CardTitle>
            </CardHeader>
            <CardFooter className='gap-2 max-sm:flex-col max-sm:items-center-safe'>
                <div className="relative size-5">
                    <Image
                        src={"/Vbucks.svg"}
                        alt="vbuck icon"
                        fill
                        sizes="auto"
                        style={{
                            objectFit: "contain"
                        }}
                        className="invert"
                    />
                </div>
                <p>{finalPrice}</p>
                {
                    finalPrice < regularPrice ?
                        <p className="line-through">
                            {regularPrice}
                        </p>
                        : <></>
                }
            </CardFooter>
        </Card>
    )
}

export default BundleShopCardItem;


