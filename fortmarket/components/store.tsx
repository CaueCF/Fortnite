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

    Object.keys(data).map((element: any) =>{
        data[element].map((i:any)=>{
            items.push(i);
        })
        
        
    })
    // data.map((element: Structure) =>{
    //     items.push(element);
    // })

    //console.log(items);
    
    let i = 1;
    const numItems = 15;

    console.log(items.slice(numItems*(i-1), numItems*i));

    return (<div className="grid grid-cols-1 md:grid-cols-3 
        gap-4 max-w-4xl w-full
        justify-center
        items-stretch
        ">
        <Suspense>
            {
                
                items.slice(numItems*(i-1), numItems*i).map((element: Structure, index: number) => {
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
