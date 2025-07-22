const db = require('../models/queries')

module.exports.get_index = (req, res) => {
    res.render('index')
}

module.exports.get_all_categories = async (req, res) => {
    const { rows } = await db.get_all_categories();
    res.json(rows);
    res.end()
};
