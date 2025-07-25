import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CreateItem from "./CreateItem";

export default function Items() {
    const { category_id } = useParams()
    const [items, set_items] = useState([]);
    const [refresh_items, set_refresh_items] = useState(false);

    useEffect(() => {
        const fetch_data = async () => {
            const res = await fetch(`/api/categories/${category_id}/items`);
            if (!res.ok) {
                console.error("Failed to fetch data");
                return;
            }
            set_items(await res.json())
            set_refresh_items(false);
        }
        fetch_data()
    }, [category_id, refresh_items])

    return (
        <>
            <h1>Items</h1>
            <ul>
                {items.map(item => <Item item={item} />)}
            </ul>
            <h2>Create Item</h2>
            <CreateItem category_id={category_id} set_refresh_items={set_refresh_items}/>
            
        </>
    )
}

function Item({ item }) {
    return (
        <li>
            <p>
                name: {item.name}
                <br />
                content: {item.content}
            </p>
        </li>
    )
}