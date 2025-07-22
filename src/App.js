require("dotenv").config()
const path = require("path")
const express = require('express')
const app = express()

// config
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));

const assets_path = path.join(__dirname, "public")
app.use(express.static(assets_path))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running. Listening on port ${PORT}`)
})

// routing
app.get("/", (req, res) => {
    res.render("index");
})
