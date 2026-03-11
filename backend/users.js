express = require("express")

const router = express.Router()

router.get("/", (req,res) => {
    res.send("Users list")
})

router.get( "/about" , (req,res) =>{

    res.send("This is a basic Express server")

})

router.get("/:name", (req,res) => {
    const name = req.params.name
    res.send(`hello ${name}`)
})



module.exports = router