import {fetch_data} from "../data/data"

export default function Category({ category, set_categories }) {
    const update = async (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        await fetch(`/api/categories/${id}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name: "updated name" })
        })
        set_categories(await fetch_data())
    }

    const del = async (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        await fetch(`/api/categories/${id}`, { method: "DELETE" });
        set_categories(await fetch_data())
    }

    const handle_click = (e) => {
        switch (e.target.role) {
            case "update":
                update(e);
                break;
            case "delete":
                del(e);
                break;
            default:
                throw Error(`Invalid value for e.target.role, expected (update | delete), got ${e.target.role}`)
        }
    }
    return (
        <li data-id={category.id} onClick={handle_click}>
            <div className="display">name: {category.name}</div>
            <div className="btns">
                <button className="update" role="update">Update</button>
                <button className="delete" role="delete">Delete</button>
            </div>
        </li>
    )
}