const pool = require("./pool")

const get_all_categories = async () => {
    return pool.query("SELECT * FROM categories");
}

module.exports = {
    get_all_categories,
}