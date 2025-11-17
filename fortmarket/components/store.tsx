"use client"

import { useState } from "react"
import CardItem from "./card-item"
import { Button } from "./ui/button";


export function Store({ cosmeticsData, shopData }: { cosmeticsData: any, shopData:any }) {

    let br = cosmeticsData.br;
    let shop = shopData;
    console.log(shop.entries);

    const [pageNumber, setPageNumber] = useState(1);
    const [hub, setHub] = useState("cosmetics");
    const numItems = 15;

    return (
        <div className="flex flex-col">
            <div className="flex flex-row p-2 self-start items-center-safe gap-1">
                <Button
                onClick={() => { setHub("cosmetics") }}
                disabled={(hub === "cosmetics")}
                >
                    Cosmetics
                </Button>
                <Button
                onClick={() => { setHub("shop") }}
                disabled={(hub === "shop")}
                >
                    Shop
                </Button>
            </div>
            <div className="flex flex-row p-2 self-end items-center-safe gap-1">
                <Button
                onClick={() => { setPageNumber(1) }}
                disabled={(pageNumber === 1)}
                >
                    Inicio
                </Button>
                <Button
                    onClick={() => { setPageNumber(pageNumber - 1) }}
                    disabled={(pageNumber === 1)}
                >
                    Voltar
                </Button>
                <p className="p-4">{pageNumber}</p>
                <Button
                    disabled={(pageNumber === Math.round(br.length/numItems))}
                    onClick={() => { setPageNumber(pageNumber + 1) }}
                >
                    Avançar
                </Button>
                <Button
                onClick={() => { setPageNumber(Math.round(br.length/numItems)) }}
                disabled={(pageNumber === Math.round(br.length/numItems))}
                >
                    Fim
                </Button>
            </div>
            <div className="grid 
            grid-cols-1 md:grid-cols-3 
            gap-4 w-full
            justify-center
            items-stretch
            ">
                {
                hub === "cosmetics"?
                    br.slice(numItems * (pageNumber - 1), numItems * pageNumber)
                        .map((element: Structure, index: number) => {
                            return (
                                <div key={"div" + index} className="p-2">
                                    <CardItem
                                        key={index}
                                        item={element}
                                    />
                                </div>
                            )
                        }):
                        shop.entries.slice(numItems * (pageNumber - 1), numItems * pageNumber)
                        .map((element: Structure, index: number) => {
                            return (
                                <div key={"div" + index} className="p-2">
                                    <CardItem
                                        key={index}
                                        item={element}
                                    />
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )

}