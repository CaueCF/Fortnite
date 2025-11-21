import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const ShopCardItem = ({ item, finalPrice, regularPrice }: { item: any, finalPrice: number, regularPrice: number }) => {

    return (
        <Link href={`/item/${item.id}?regularPrice=${regularPrice}&finalPrice=${finalPrice}`}>
            <Card className="bg-[#FFFFFF0D] rounded-md
         h-full w-75
         wrap-break-word
         border
         p-1">
                <CardContent className="h-30 relative">
                    <Image
                        src={item.images.smallIcon}
                        alt={item.name}
                        fill
                        sizes="auto"
                        style={{
                            objectFit: "contain"
                        }}
                    />
                </CardContent>
                <CardHeader className="font-semibold">
                    <CardDescription className='text-lg'>{item.type.displayValue}</CardDescription>
                    <CardTitle className='text-2xl'>{item.name}</CardTitle>
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
        </Link>
    )
}

export default ShopCardItem;


