import { useEffect, useState } from "react";

const ItemDetail=(props)=>{

    const [id, setId] = useState('');
    useEffect(()=>{
        const id = props.match.params.id;
        setId(id)
    })
    return(
        <>
        {id}
        </>
    )
}
export default ItemDetail;