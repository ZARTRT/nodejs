const Router = require('koa-router');
const templateController = require('../controllers/template');
const router = new Router();

router.prefix('/xhr/v2');

router.get('/templates', templateController.templates);
router.get('/template/:id', templateController.templates);
router.post('/template', templateController.addTemplate);
router.put('/template/:id', templateController.templates);
router.del('/template/:id', templateController.templates);

module.exports = router;
