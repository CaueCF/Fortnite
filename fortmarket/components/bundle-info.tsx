import { Button } from "@/components/ui/button";
import Image from "next/image"

export async function BundleDetails(
    { bundleId, finalPrice, regularPrice }:
        { bundleId: string, finalPrice: number, regularPrice: number }
) {

    const res = await fetch(`https://fortnite-api.com/v2/cosmetics/br/${bundleId}?language=pt-BR`, {
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

                    {/* <Button className=" absolute top-4 left-4 
                    bg-zinc-700 hover:bg-zinc-600 
                    text-white font-bold 
                    px-6 py-2 
                    rounded-sm uppercase tracking-wider">
                        Ver Prévia
                    </Button> */}

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
                    </div>
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

                    <div className="flex items-end space-x-3">
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            {finalPrice}
                        </h2>

                        {/* <span className="size-4 rounded-full bg-yellow-500 inline-block"></span> */}
                        {
                            finalPrice < regularPrice ?
                                <span className="text-lg text-zinc-500 line-through">
                                    {regularPrice}
                                </span> : <></>
                        }
                    </div>

                    {/* <div className="flex flex-col space-y-3">
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600 
                            text-black font-extrabold uppercase 
                            py-6 text-lg rounded-sm tracking-wider"
                        >
                            Adquirir V-Bucks
                        </Button>
                        <Button
                            className="bg-zinc-700 hover:bg-zinc-600 
                            text-white font-bold uppercase 
                            py-6 text-lg rounded-sm tracking-wider"
                                        >
                            Ver Pacotão
                        </Button>
                    </div> */}

                    <div className="space-y-4 text-sm text-zinc-400">
                        <p className="text-white text-base">{item.description}</p>

                        <p>{item.introduction.text}</p>
                        {/* <p className="text-xs text-zinc-500">{saleDate}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BundleDetails;