import { userController } from "";
const express = require("express");
const router = express.Router();

//user

//getUser
router.get("/api/users", (req, res) => {
  //noteControllerからgetUsersメソッドを実行
  //userController.getUsers(req.res);
});

module.exports = router;
