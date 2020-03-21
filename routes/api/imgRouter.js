const router = require("express").Router()
const upload = require('../../middleware/multer')

router.post("/", upload.single('file'), async (req, res) => {
    console.log("loaded", req.file)
    res.sendStatus(200)
})


module.exports = router;