import ItemDetails from "@/components/item-info";


const itemInfo = async (props: PageProps<'/[item-info]'>) => {
    const itemId = await props.params
    return(
        <ItemDetails 
        itemId={itemId}
        />
    )
}

export default itemInfo;