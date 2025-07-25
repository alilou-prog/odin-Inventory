const pool = require("./pool")

const get_all_categories = async () => {
    return await pool.query("SELECT * FROM categories");
}

const create_category = async ({name}) => {
    return await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}

const del_category = async (id) => {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

const update_category = async (category) => {
    await pool.query(`UPDATE categories 
        SET name = $1
        WHERE id = $2`, 
    [category.name, category.id]);
}

const get_items = async (category_id) => {
    return await pool.query(`SELECT * FROM items WHERE category_id = $1`, [category_id]);
}

const create_item = async (category_id, item) => {
    await pool.query("INSERT INTO items (name, content, category_id) VALUES ($1, $2, $3)", [item.name, item.content, category_id])
}

module.exports = {
    get_all_categories,
    create_category,
    del_category,
    update_category,
    get_items,
    create_item,
}