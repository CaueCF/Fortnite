import ItemDetails from "@/components/item-info";


const itemInfo = async (props: PageProps<'/[itemInfo]'>) => {
    const itemInfo = await props.params;
    return(
        <ItemDetails 
        itemId={itemInfo.itemInfo}
        />
    )
}

export default itemInfo;