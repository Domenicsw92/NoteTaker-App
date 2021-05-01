const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(express.static("public"))

require("./Routes/htmlroutes")(app)
require("./Routes/routes")(app)

// Listen
app.listen(PORT, function() {
    console.log(`Listening on Port ${PORT}`);
});
