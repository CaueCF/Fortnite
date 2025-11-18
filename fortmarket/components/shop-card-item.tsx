import Image from "next/image";

const ShopCardItem = ({ item, finalPrice, regularPrice }: { item: any, finalPrice: number, regularPrice: number }) => {

    return (
        <div className='flex flex-col
        bg-[#FFFFFF0D] rounded-md
        h-full w-75
        wrap-break-word
        border
        p-2
        '>
            <div className='w-full rounded-2xl h-30 relative'>
                <Image
                    src={item.images.smallIcon}
                    alt={item.name}
                    fill
                    sizes="auto"
                    style={{
                        objectFit: "contain"
                    }}
                />
            </div>
            <div className="flex flex-col font-semibold">
                <p className='text-lg'>{item.type.displayValue}</p>
                <p className='text-2xl'>{item.name}</p>
            </div>
            <div className="py-2">
                <div className="flex flex-row gap-2 items-center-safe">
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
                </div>
            </div>
        </div>
    )
}

export default ShopCardItem;


