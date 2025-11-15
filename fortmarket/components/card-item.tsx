import Image from "next/image";

const CardItem = ({ item }: { item: Structure }) => {
    return (
        <div className='flex flex-col
        bg-transparent rounded-md
        h-full
        wrap-break-word
        border
        '>
            <div className='w-full rounded-2xl h-30 relative bg-slate-200'>
                <Image
                    src={item.images.smallIcon!}
                    alt={item.name}
                    fill
                    sizes="auto"
                    style={{
                        objectFit: "contain"
                    }}
                />
            </div>
            <p className='text-sm'>{item.type.value}</p>
            <p className='text-lg'>{item.name}</p>
        </div>
    )
}

export default CardItem;


