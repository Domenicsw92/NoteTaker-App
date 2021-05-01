const path = require("path")
const noteTaker = require("../db/db.json")
const fs = require("fs")

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
        console.log(req.body.id)
        res.json(noteTaker)

    });

    app.delete("/api/notes:id", function(req, res){
        const noteToDelete = req.body.id;
        fs.readFile(__dirname + "/db/db.json", (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            for (let i = 0; i < json.length; i++) {
                if (json[i].id === noteToDelete) {
                    json.splice(i, 1);
                    return;
                }
            }
            fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), (err) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.send("deleted");
            });
        });
        // console.log("req params", req.body.id)
        // noteTaker.push(req.body);
        // res.json(noteTaker)
    })

}