'use-client'

import { Suspense } from "react"
import CardItem from "./card-item"


export async function Store() {

    const response = await fetch('https://fortnite-api.com/v2/cosmetics/?language=pt-BR', {
        method: 'GET',
    })

    let data = await response.json();
    data = data.data;
    let br = data.br;
    let items:Structure[] = [];

    // data.map((element: Structure) =>{
    //     items.push(element);
    // })

    console.log(items);
    

    return (<div className="grid grid-cols-1 md:grid-cols-3 
        gap-4 max-w-4xl w-full
        justify-center
        items-stretch
        ">
        <Suspense>
            {
                br.slice(16, 31).map((element: Structure, index: number) => {
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
        </Suspense>
    </div>
    )

}
