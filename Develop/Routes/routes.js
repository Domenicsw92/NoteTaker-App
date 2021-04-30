const path = require("path")
const noteTaker = require("../db/db.json")

module.exports = function (app){
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("/api/notes", function(req, res){
        res.json(noteTaker)
    });
    app.post("/api/notes", function(req, res){
        console.log(req.body)
        req.body.id = noteTaker.length 
        noteTaker.push(req.body);
        res.json(noteTaker)

    });
    // make a put route

    app.delete("/api/notes", function(req, res){
        req.body.id = noteTaker.length 
        noteTaker.push(req.body);
        res.json(noteTaker)
    })

}