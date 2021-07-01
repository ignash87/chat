const express = require('express')
const router = express.Router();

const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middlewares');

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/userAuth", authMiddleware, userController.userAuth);
router.get("/refresh", userController.refresh);

module.exports = router
