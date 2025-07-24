import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Items() {
    const { category_id } = useParams()
    const [items, set_items] = useState([]);
    useEffect(() => {
        const fetch_data = async () => {
            const res = await fetch(`/api/categories/${category_id}/items`);
            if (!res.ok) {
                console.error("Failed to fetch data");
                return;
            }
            set_items(await res.json())
        }
        fetch_data()
    }, [category_id])

    return (
        <>
            <h1>Items</h1>
            <ul>
                {items.map(item => <Item item={item} />)}
            </ul>
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