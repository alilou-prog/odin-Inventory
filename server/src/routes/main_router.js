const {Router} = require("express")
const router = Router()
const main_ctrls = require("../contollers/main_controller")

router.get('/', main_ctrls.get_index)
router.get('/api/categories', main_ctrls.get_all_categories)

module.exports = router;