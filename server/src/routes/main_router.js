const {Router} = require("express")
const router = Router()
const main_ctrls = require("../contollers/main_controller")

router.get('/', main_ctrls.get_index)
router.get('/api/categories', main_ctrls.get_all_categories)

router.get('/api/categories/:id', (req, res) => main_ctrls.get_category(req, res, req.params.id))
router.post('/api/categories', main_ctrls.create_category)
router.delete('/api/categories/:id', (req, res) => main_ctrls.del_category(req, res, req.params.id))
router.put('/api/categories/:id', main_ctrls.update_category)

router.get('/api/categories/:id/items', (req, res) => main_ctrls.get_items(req, res, req.params.id));
router.post('/api/categories/:id/items', (req, res) => main_ctrls.create_item(req, res, req.params.id))
router.put('/api/categories/:category_id/items', main_ctrls.update_item)
router.delete('/api/categories/:category_id/items', main_ctrls.delete_item)

module.exports = router;