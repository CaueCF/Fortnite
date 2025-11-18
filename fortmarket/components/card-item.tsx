import Image from "next/image";

const CardItem = ({ item }: { item: any }) => {

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
        </div>
    )
}

export default CardItem;


