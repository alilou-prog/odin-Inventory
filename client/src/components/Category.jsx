import { useState } from "react";
import { fetch_data } from "../data/data"
import { useNavigate } from "react-router-dom";

export default function Category({ category, set_categories }) {
    const [updating, set_updating] = useState(false);
    const navigate = useNavigate()

    const start_updating = () => {
        set_updating(true);
    }

    const update = async (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const name = e.target.value;
        await fetch(`/api/categories/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name })
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
                start_updating(e);
                break;
            case "delete":
                del(e);
                break;
            case "sumbit":
                update(e);
                break;
            case "display-items":
                navigate(`/${category.id}/items`);
                break;
            default:
                throw Error(`Invalid value for e.target.role, expected (update | delete), got ${e.target.role}`)
        }
    }

    return (
        <li data-id={category.id} onClick={handle_click}>
            {updating ? (
                <form>
                    <label htmlFor="name"></label>
                    <input type="text" name="name" placeholder={category.name} />
                    <button className="submit" role="submit">Submit</button>
                </form>
            ) :
                (<div className="display">name: {category.name}</div>)
            }
            <div className="btns">
                <button className="update" role="update">Update</button>
                <button className="delete" role="delete">Delete</button>
                <button className="diplay-items" role="display-items">Items</button>
            </div>
        </li>
    )
}