// src/components/FortniteShopItemDetails.tsx

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image"

export async function FortniteShopItemDetails({itemId}:{itemIde:any}) {

    fetch("https://fortnite-api.com/v2/cosmetics/br/%7Bcosmetic-id%7D")

    return (
        <div className="min-h-screen bg-black text-white p-4 font-sans">
            <div className="flex flex-col lg:flex-row gap-8">

                <div className="relative flex-1 
                    bg-zinc-900 
                    flex flex-col 
                    justify-end 
                    p-6 
                    min-h-[500px] lg:min-h-[90vh] 
                    rounded-lg">

                    {/* Botão VER PRÉVIA */}
                    <Button className="absolute 
                    top-6 left-6 
                    bg-zinc-700 hover:bg-zinc-600 
                    text-white font-bold 
                    px-6 py-2 
                    rounded-sm uppercase tracking-wider">
                        Ver Prévia
                    </Button>

                    <div className="flex justify-center items-center h-full">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="auto"
                            style={{
                                objectFit: "contain",
                                width: '100%',
                            }}
                            className="max-h-[80%] object-contain"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-[400px] xl:w-[450px] 
                    bg-zinc-900 
                    p-8 space-y-6 
                    rounded-lg">

                    {/* Tag NOVO */}
                    <Badge
                        variant="default"
                        className="bg-yellow-500 
                        text-black 
                        font-bold 
                        uppercase text-xs 
                        px-2 py-1 rounded-sm"
                    >
                        Novo!
                    </Badge>

                    <div>
                        <p className="text-zinc-400 text-sm uppercase">{style}</p>
                        <h1 className="text-5xl font-extrabold uppercase tracking-tight">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-end space-x-3">
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            {vbucksCurrent}
                        </h2>

                        <span className="size-4 rounded-full bg-yellow-500 inline-block"></span>
                        <span className="text-lg text-zinc-500 line-through">
                            {vbucksOld}
                        </span>
                    </div>

                    <div className="flex flex-col space-y-3">
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
                    </div>

                    <div className="space-y-4 text-sm text-zinc-400">
                        <p className="text-white text-base">{description}</p>

                        <div className="space-y-2">
                            <p className="text-white text-base">
                                Esses itens podem ser usados em:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {usedIn.map((use: any, index: number) => (
                                    <Badge
                                        key={index}
                                        className="bg-zinc-700 text-white 
                                        border-zinc-600 border 
                                        px-3 py-1 
                                        text-xs rounded-sm"
                                    >
                                        {use}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <p>{seasonInfo}</p>
                        <p className="text-xs text-zinc-500">{saleDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}