const router = require("express").Router();
const { enroll } = require("../controllers/tasks.controller");
const serverless = require('serverless-http');

router.post("/enroll", enroll);

module.exports = serverless(router);