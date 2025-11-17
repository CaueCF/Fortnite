"use client"

import { useState } from "react"
import CardItem from "./card-item"
import { Button } from "./ui/button";


export function Store({ data }: { data: any }) {

    let br = data.br;

    // let items:Structure[] = [];

    // Object.keys(data).map((element: any) =>{
    //     data[element].map((i:any)=>{
    //         items.push(i);
    //     })

    // })

    //console.log(items);

    const [pageNumber, setPageNumber] = useState(1);
    const numItems = 15;

    //console.log(br.slice(numItems*(i-1), numItems*i));

    return (
        <div className="flex flex-col">
            <div className="flex flex-row p-2 self-end items-center-safe">
                <Button onClick={() => { setPageNumber(1) }}>
                    Inicio
                </Button>
                <Button className="p-2"
                    onClick={() => { setPageNumber(pageNumber - 1) }}
                    disabled={(pageNumber === 1)}
                >
                    Voltar
                </Button>
                <p className="p-4">{pageNumber}</p>
                <Button className="p-2"
                    disabled={(pageNumber === Math.round(br.length/numItems))}
                    onClick={() => { setPageNumber(pageNumber + 1) }}
                >
                    Avançar
                </Button>
                <Button onClick={() => { setPageNumber(Math.round(br.length/numItems)) }}>
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
                        })
                }
            </div>
        </div>
    )

}