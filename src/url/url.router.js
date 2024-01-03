const router = require("express").Router();
const controllers = require("./url.controller");
const usesControllers = require("../uses/uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:urlId/uses").get(usesControllers.listUrlUses).all(methodNotAllowed)
router.route("/:urlId/uses/:useId").get(usesControllers.getUrlUse).delete(usesControllers.deleteUrlUseMatched).all(methodNotAllowed)
router.route("/:urlId").get(controllers.read).put(controllers.update).all(methodNotAllowed)
router.route("/").post(controllers.create).get(controllers.list).all(methodNotAllowed)

module.exports = router