import { useState } from "react"
import { useRef } from "react";

export default function CreateCategory() {
    const [input_value, set_input_value] = useState("");
    const [dialog_is_opened, set_dialog_is_opened] = useState(false);
    const dialog_ref = useRef(null);
    const handle_input_change = (e) => {
        set_input_value(e.target.value);
    }
    const handle_submit = (e) => {
        e.preventDefault();
        fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: input_value })
        })
        set_dialog_is_opened(false);
        dialog_ref.current.close();
    }

    return (
        <div>
            <button onClick={() => { set_dialog_is_opened(true); dialog_ref.current.showModal() }}>Create new category</button>
            <dialog open={dialog_is_opened} ref={dialog_ref}>
                <h2>Add Category</h2>
                <form action="/api/categories/create" method="POST" onSubmit={handle_submit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={input_value} onChange={handle_input_change} />
                    <button type="submit">Submit</button>
                </form>
            </dialog>
        </div>
    )
}