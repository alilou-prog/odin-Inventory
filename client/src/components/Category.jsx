export default function Category({ category, set_categories }) {
    const update = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const updated_elem = {id: id, name: "update value"};
        set_categories(prev => {
            return prev.map(elem => elem.id === id ? updated_elem : elem)
        })
    }

    const del = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        set_categories(prev => {
            return prev.filter(elem => elem.id !== id)
        })
    }

    const handle_click = (e) => {
        switch(e.target.role) {
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