const Router = require('express');
const router = new Router();
const readerController = require('../controllers/readerController');

router.post('/create', readerController.createReader);
router.put('/update', readerController.changeReader);
router.delete('/delete', readerController.deleteReader);
router.post('/issueBook', readerController.issueBook);
router.post('/returnBook', readerController.returnBook);


module.exports = router;