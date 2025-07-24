const pool = require("./pool")

const get_all_categories = async () => {
    return await pool.query("SELECT * FROM categories");
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

module.exports = {
    get_all_categories,
    del_category,
    update_category,
    get_items,
}