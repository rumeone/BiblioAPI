const Router = require('express');
const router = new Router();
const bookController = require('../controllers/bookController');

router.post('/create', bookController.createBook);
router.put('/update', bookController.changeBook);
router.delete('/delete', bookController.deleteBook);

module.exports = router;