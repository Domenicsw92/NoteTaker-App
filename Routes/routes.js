const path = require("path")
// const noteTakerArray = require("../db/db.json")
const fs = require("fs")
const uuid = require("uuid")


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"))
    });

    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    app.get("/api/notes", function (req, res) {
        fs.readFile(__dirname + "./db/db.json", "utf8", (err, notes) => {
            if (err) throw err;
            console.log(notes)
            return res.json(JSON.parse(notes));
        })
    });

    app.post("/api/notes", function (req, res) {
        console.log(req.body)
        let newNotes = req.body;
        fs.readFile(__dirname + "./db/db.json", "utf8", (err, notes) => {
            if (err) throw err;
            console.log(newNotes)
            const notesArray = JSON.parse(notes);
            newNotes.id = uuid.v4();
            notesArray.push(newNotes)
            fs.writeFile("./db/db.json", JSON.stringify(notesArray), "utf8", (err, notes) => {
                return res.json(newNotes)
            })
        });
    })

    app.delete("/api/notes/:id", function (req, res) {
        const noteToDelete = req.params.id;
        console.log(noteToDelete)
        fs.readFile(__dirname + "./db/db.json", (err, notes) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            for (let i = 0; i < data.length; i++) {
                if (notes[i].id === noteToDelete) {
                    notes.splice(i, 1);
                    return;
                }
            }
            fs.writeFile(__dirname + "./db/db.json", JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.send("deleted");
            });
        });
    })

}