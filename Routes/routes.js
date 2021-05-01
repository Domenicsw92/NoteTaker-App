const path = require("path")
const fs = require("fs")
const uuid = require("uuid")


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
            console.log(data)
            return res.json(JSON.parse(data));
        })
        ;
    });

    app.post("/api/notes", function (req, res) {
        console.log("new note",req.body)
        fs.readFile(path.join(__dirname,"../db/db.json"), (err,data) => {
            if (err) throw err;
            const newNotes = req.body;
            console.log(newNotes)
            const notesArray = JSON.parse(data);
            newNotes.id = uuid.v4();
            notesArray.push(newNotes)
            fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(notesArray), (err,data) => {
                return res.json(newNotes)
            }
            )
            
        }
        )
        
        ;
    });

    app.delete("/api/notes/:id", function (req, res) {
        const noteToDelete = req.params.id;
        console.log(noteToDelete)
        fs.readFile(path.join(__dirname , "../db/db.json"), (err, data) => {
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
            fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(data), (err) => {
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