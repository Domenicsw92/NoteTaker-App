const path = require("path")
const fs = require("fs")
const uuid = require("uuid");
const { json } = require("body-parser");


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
        fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err,data) => {
            if (err) throw err;
            let newNotes = req.body;
            console.log(newNotes)
            let notesArray = JSON.parse(data);
            // let id = notesArray[notesArray.length - 1].id +1;
            // newNotes.id = id
            // newNotes.id = uuidv4();
            console.log(data)
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
                if (data[i].id === noteToDelete) {
                    data.splice(i, 1);
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