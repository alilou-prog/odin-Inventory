import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CreateItem from "./CreateItem";
import Item from "./Item";

export default function Items() {
    const { category_id } = useParams()
    const [category, set_category] = useState({})
    const [items, set_items] = useState([]);
    const [refresh_items, set_refresh_items] = useState(false);

    useEffect(() => {
        const fetch_category = async () => {
            const res = await fetch(`/api/categories/${category_id}`)
            if (!res.ok) {
                console.error("Failed to fetch data");
                return;
            }
            set_category(await res.json())
        }

        const fetch_items = async () => {
            const res = await fetch(`/api/categories/${category_id}/items`);
            if (!res.ok) {
                console.error("Failed to fetch data");
                return;
            }
            set_items(await res.json())
            set_refresh_items(false);
        }

        fetch_category()
        fetch_items()
    }, [category_id, refresh_items])

    return (
        <>
            <h1>Category: {category.name}</h1>
            <ul>
                {
                items ?
                    (items.map(item => <Item category_id={category_id} item={item} set_refresh_items={set_refresh_items} />))
                    :
                    (<spane>Loading...</spane>)
                }
            </ul>
            <CreateItem category_id={category_id} set_refresh_items={set_refresh_items} />
            <Link to={'/'}>Home</Link>

        </>
    )
}

