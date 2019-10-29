var performanceStatusController = require('../controllers/performance-status.js');
const express = require("express");
const router = express.Router();


router.route('/')
    .get(performanceStatusController.getData)
    .post(performanceStatusController.addData)

router.route('/:id')
    .put(performanceStatusController.updateData)
    .delete(performanceStatusController.deleteData)


module.exports = router;
