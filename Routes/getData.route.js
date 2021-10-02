const {Router} = require("express");
const authenticateToken = require("../middlewares/authenticateToken.middleware");

const router = Router();

router.get("/data", authenticateToken, (req, res) => {

    res.json({
        user: req.user
    });
    
});


module.exports = router;