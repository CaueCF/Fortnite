"use client"

import { useState } from "react"
import CardItem from "./card-item"
import { Button } from "./ui/button";
import { JSONPath } from "jsonpath-plus";
import useSWR from "swr";
import ShopCardItem from "./shop-card-item";
import BundleShopCardItem from "./bundle-card";

function getCosmeticsData() {
    const fetcher = (url: any) => fetch(url).then((r) => r.json());
    const { data, error, isLoading } = useSWR('https://fortnite-api.com/v2/cosmetics/?language=pt-BR', fetcher);

    return {
        cosmeticsData: data,
        isLoadingCosmetics: isLoading,
        isErrorCosmetics: error
    };
}

function getShopData() {
    const fetcher = (url: any) => fetch(url).then((r) => r.json());
    const { data, error, isLoading } = useSWR('https://fortnite-api.com/v2/shop/?language=pt-BR', fetcher);

    return {
        shopData: data,
        isLoadingShop: isLoading,
        isErrorShop: error
    };
}


export function Store() {

    let { cosmeticsData, isLoadingCosmetics, isErrorCosmetics } = getCosmeticsData();
    let { shopData, isLoadingShop, isErrorShop } = getShopData()

    const [hub, setHub] = useState("cosmetics");
    const [pageNumber, setPageNumber] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const numItems = 15;

    if ((isLoadingCosmetics && hub === "cosmetics") || (isLoadingShop && hub === "shop")) {
        return <p>Carregando..</p>
    }

    let br = cosmeticsData.data.br;
    let shop = JSONPath({ path: '$.entries[?(@.brItems)]', json: shopData.data })

    //console.log(shop);


    if (totalItems === 0) { setTotalItems(br.length) }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row p-2 items-center-safe gap-1">
                    <Button
                        onClick={() => {
                            setHub("cosmetics")
                            setPageNumber(1)
                            setTotalItems(br.length)
                        }}
                        disabled={(hub === "cosmetics")}
                    >
                        Cosmetics
                    </Button>
                    <Button
                        onClick={() => {
                            setHub("shop")
                            setPageNumber(1)
                            setTotalItems(shop.length)
                        }}
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
                        disabled={(pageNumber === Math.round(totalItems / numItems))}
                        onClick={() => { setPageNumber(pageNumber + 1) }}
                    >
                        Avançar
                    </Button>
                    <Button
                        onClick={() => { setPageNumber(Math.round(totalItems / numItems)) }}
                        disabled={(pageNumber === Math.round(totalItems / numItems))}
                    >
                        Fim
                    </Button>
                </div>
            </div>
            <div className="grid 
            grid-cols-1 md:grid-cols-3
            grid-flow-row auto-rows-max md:auto-rows-min
            gap-4 w-full
            justify-center
            items-stretch
            content-center
            ">
                {
                    hub === "cosmetics" ?
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
                            }) :
                        shop.slice(numItems * (pageNumber - 1), numItems * pageNumber)
                            .map((element: any, index: number) => {

                                if (element.bundle) {
                                    return (<div className="col-span-2 p-2" key={"div"+index}>
                                        <BundleShopCardItem
                                            bundle={element.bundle}
                                            regularPrice={element.regularPrice}
                                            finalPrice={element.finalPrice}
                                            key={index}
                                        />
                                    </div>)
                                } else {
                                    return (
                                        <div key={"div" + index} className="p-2">
                                            <ShopCardItem
                                                regularPrice={element.regularPrice}
                                                finalPrice={element.finalPrice}
                                                key={index}
                                                item={element.brItems[0]}
                                            />
                                        </div>
                                    )
                                }
                            })
                }
            </div>
        </div>
    )

}