import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Category({ category, set_refresh_categories }) {
    const [updating, set_updating] = useState(false);
    const [input_value, set_input_value] = useState("")
    const navigate = useNavigate()

    const start_updating = () => {
        set_updating(true);
    }

    const submit_update = async (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const name = input_value;
        await fetch(`/api/categories/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name })
        })
        set_updating(false);
        // parent state
        set_refresh_categories(true)
    }

    const del = async (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        await fetch(`/api/categories/${id}`, { method: "DELETE" });
        set_refresh_categories(true)
    }

    const handle_click = (e) => {
        switch (e.target.role) {
            case "update":
                start_updating(e);
                break;
            case "delete":
                del(e);
                break;
            case "submit":
                submit_update(e);
                break;
            case "display-items":
                navigate(`/${category.id}/items`);
                break;
            default:
                return;
        }
    }

    return (
        <li data-id={category.id} onClick={handle_click}>
            {updating ? (
                <form>
                    <label htmlFor="name"></label>
                    <input type="text" name="name" placeholder={category.name} value={input_value} onChange={(e) => set_input_value(e.target.value)} />
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