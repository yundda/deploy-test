const express = require("express");
const controller = require("../controller/Cvisitor");
const router = express.Router();

// GET '/'
router.get("/", controller.main);

// GET '/visitors'
router.get("/visitors", controller.getVisitors);

// GET '/visitor/:id'
router.get("/visitor/:id", controller.getVisitor);

// POST '/visitor'
router.post("/visitor", controller.postVisitor);

// DELETE '/visitor'
router.delete("/visitor", controller.deleteVisitor);

// PATCH '/visitor'
router.patch("/visitor", controller.patchVisitor);

module.exports = router;
