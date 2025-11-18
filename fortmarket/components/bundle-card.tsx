import Image from "next/image";

const BundleShopCardItem = ({ bundle, finalPrice, regularPrice }: { bundle: any, finalPrice: number, regularPrice: number }) => {

    return (
        <div className='flex flex-col
        bg-[#FFFFFF0D] rounded-md
        h-full w-full
        wrap-break-word
        border
        p-2
        '>
            <div className='w-full rounded-2xl h-30 relative'>
                <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    sizes="auto"
                    style={{
                        objectFit: "contain",
                        width: '100%',
                    }}
                />
            </div>
            <div className="flex flex-col font-semibold">
                <p className='text-lg'>{bundle.info}</p>
                <p className='text-2xl'>{bundle.name}</p>
            </div>
            <div >
                <div className="flex flex-row gap-2">
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

export default BundleShopCardItem;


