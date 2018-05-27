var express     = require("express"),
    router      = express.Router();
    
//Home page
router.get("/", function(req, res) {
    res.render("home");
});

module.exports = router;