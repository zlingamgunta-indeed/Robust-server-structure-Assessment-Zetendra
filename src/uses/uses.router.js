const router = require("express").Router();
const controllers = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:useId").get(controllers.read).delete(controllers.deleteUse).all(methodNotAllowed);
router.route("/").get(controllers.list).all(methodNotAllowed);

module.exports = router;