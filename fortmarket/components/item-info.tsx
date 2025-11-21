import Image from "next/image"

export async function ItemDetails(
    { itemId, finalPrice, regularPrice }:
        { itemId: string, finalPrice?: number, regularPrice?: number }
) {

    const res = await fetch(`https://fortnite-api.com/v2/cosmetics/br/${itemId}?language=pt-BR`, {
        method: "GET",
    })

    let item = await res.json();
    item = item.data;

    return (
        <div className="min-h-screen text-white p-4 font-sans">
            <div className="flex flex-col lg:flex-row gap-4">

                <div className="relative flex-1
                    bg-zinc-900 
                    flex flex-col 
                    justify-end 
                    p-4 
                    max-h-10/12 
                    rounded-lg">

                    {item.images.icon ?
                        <div className=" items-center 
                        w-auto h-full overflow-hidden 
                        relative block">
                            <Image
                                src={item.images.icon}
                                alt={item.name}
                                loading="eager"
                                fill={true}
                                sizes="auto"
                                className="object-contain"
                            />
                        </div> : <p className="place-self-center-safe justify-self-center-safe">Item sem imagem</p>}
                </div>

                <div className="w-full lg:w-[400px] xl:w-[450px] 
                    bg-zinc-900 
                    p-8 space-y-6 
                    rounded-lg
                    wrap-break-word">

                    <div>
                        <p className="text-zinc-400 text-lg uppercase">{item.type.displayValue}</p>
                        <p className="text-4xl font-extrabold uppercase tracking-tight">
                            {item.name}
                        </p>
                    </div>


                    {finalPrice ?
                        <div className="flex items-end  space-x-3">
                            <div className="relative size-8 p-2 object-contain self-center-safe">
                                <Image
                                    src={"/Vbucks.svg"}
                                    alt="vbuck icon"
                                    fill
                                    sizes="auto"
                                    className="invert"
                                />
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight self-center-safe">
                                {finalPrice}
                            </h2>
                            {
                                !finalPrice < !regularPrice ?
                                    <span className="text-lg text-zinc-500 line-through">
                                        {regularPrice}
                                    </span> : <></>
                            }
                        </div> : <></>}


                    <div className="space-y-4 text-sm text-zinc-400">
                        <p className="text-white text-base">{item.description}</p>

                            { item.set ? 
                            <p>{item.set.text}</p>:<></>
                            }
                        {item.introduction ?
                            <p>{item.introduction.text}</p> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;