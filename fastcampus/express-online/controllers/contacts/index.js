const { Router } = require("express");
const router = Router();
const ctrl = require("./contacts.ctrl");

router.get("/", (_, res) => {
  res.send("contacts app");
});

router.get("/list", ctrl.get_list);

module.exports = router;
