const mainController = require("../controllers/MainController");

const router = [
    {
        url:'*',
        method:'*',
        handle:mainController.index
    },{
        url:'/index',
        method:'GET',
        handle:(req, res) => mainController.index(req, res)
    },{
        url:'/upload',
        method:'POST',
        handle:(req, res) => mainController.upload(req, res)
    }
]
module.exports = router;