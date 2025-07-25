import { useState } from "react"
import { useRef } from "react";

export default function CreateItem({category_id, set_refresh_items}) {
    const [input_values, set_input_values] = useState({name: "", content: ""});
    const [dialog_is_opened, set_dialog_is_opened] = useState(false);
    const dialog_ref = useRef(null);
    const handle_input_change = (e) => {
        set_input_values(prev => {return {...prev, [e.target.name]: e.target.value} } );
    }
    const handle_submit = (e) => {
        e.preventDefault();
        fetch(`/api/categories/${category_id}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input_values)
        })
        set_dialog_is_opened(false);
        dialog_ref.current.close();
        // update state
        set_refresh_items(true);
    }

    return (
        <div>
            <button onClick={() => { set_dialog_is_opened(true); dialog_ref.current.showModal() }}>Create new category</button>
            <dialog open={dialog_is_opened} ref={dialog_ref}>
                <h2>Add Category</h2>
                <form onSubmit={handle_submit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={input_values.name} onChange={handle_input_change} />

                    <label htmlFor="content">Content</label>
                    <input type="text" name="content" value={input_values.content} onChange={handle_input_change}/>

                    <button type="submit">Submit</button>
                </form>
            </dialog>
        </div>
    )
}