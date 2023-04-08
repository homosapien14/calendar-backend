const router = require("express").Router();
const { enroll } = require("../controllers/tasks.controller");

router.post("/enroll", enroll);

module.exports = router;