const express = require("express")
const app = express()
app.set("view engine", "ejs")

app.get("/", async (req,res) => {
  res.render("index.ejs")
})
app.listen(process.env.PORT, () => {console.log("website started")})