import { useState } from "react";

export default function Item({ category_id, item, set_refresh_items }) {
    const [updating, set_updating] = useState(false);
    const [input_values, set_input_values] = useState({ name: "", content: "" })

    const start_updating = () => {
        set_updating(true);
    }

    const submit_update = async (e, id) => {
        e.preventDefault();
        await fetch(`/api/categories/${category_id}/items`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...input_values, category_id })
        })
        set_updating(false);
        // parent state
        set_refresh_items(true)
    }

    const del = async (e, id) => {
        await fetch(`/api/categories/${category_id}/items`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
        set_refresh_items(true)
    }

    const handle_click = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        switch (e.target.role) {
            case "update":
                start_updating(e);
                break;
            case "delete":
                del(e, id);
                break;
            case "submit":
                submit_update(e, id);
                break;
            default:
                return;
        }
    }

    const handle_input_change = (e) => {
        set_input_values(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }

    return (
        <li data-id={item.id} onClick={handle_click}>
            {updating ?
                (
                    <form>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={input_values.name} onChange={handle_input_change} placeholder={item.name} />

                        <label htmlFor="content">Content</label>
                        <input type="text" name="content" value={input_values.content} onChange={handle_input_change} placeholder={item.content} />

                        <button role="submit">Submit</button>
                    </form>
                )
                :
                (
                    <p>
                        name: {item.name}
                        <br />
                        content: {item.content}
                    </p>
                )
            }
            <div className="control">
                <button role="update">Update</button>
                <button role="delete">Delete</button>
            </div>
        </li>
    )
}
