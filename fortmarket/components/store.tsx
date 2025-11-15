'use-client'

import { Suspense } from "react"
import CardItem from "./card-item"


export async function Store() {

    const response = await fetch('https://fortnite-api.com/v2/cosmetics/?language=pt-BR', {
        method: 'GET',
    })

    let data = await response.json();
    data = data.data.br;

    return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4
    items-stretch justify-center-safe
    ">
        <Suspense>
            {
                data.slice(0, 20).map((element: Structure, index: number) => {
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
