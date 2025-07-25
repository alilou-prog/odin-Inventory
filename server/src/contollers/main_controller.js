const db = require('../models/queries')

module.exports.get_index = (req, res) => {
    res.render('index')
}

module.exports.get_all_categories = async (req, res) => {
    const { rows } = await db.get_all_categories();
    res.json(rows);
    res.end()
};

module.exports.create_category = async (req, res) => {
    console.log("body", req.body);
    await db.create_category(req.body)
}

module.exports.del_category = async (req, res, id) => {
    await db.del_category(id);
    res.end();
}

module.exports.update_category = async (req, res) => {
    await db.update_category(req.body);
    res.end();
}

module.exports.get_items = async (req, res, category_id) => {
    const {rows} = await db.get_items(category_id);
    res.json(rows);
    res.end();
}