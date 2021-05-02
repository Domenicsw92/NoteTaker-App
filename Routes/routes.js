const path = require("path")
const fs = require("fs")
const uuid = require("uuid");



module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"),"utf8", (err, data) => {
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
            console.log("the newest of notes!",newNotes)
            let notesArray = JSON.parse(data);
            let id = 1 
            if (notesArray.length > 0) {
                id = notesArray[ notesArray.length - 1 ].id + 1;
            }
            newNotes.id = id
            
            // newNotes.id = uuid.v4();
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
        const noteToDelete = JSON.parse(req.params.id);
        console.log(noteToDelete)
        fs.readFile(path.join(__dirname , "../db/db.json"), "utf8", (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            let notesArray = JSON.parse(data)
            for (let i = 0; i < notesArray.length; i++) {
                if (notesArray[i].id === noteToDelete) {
                    console.log("getting deleted",notesArray[i])
                    notesArray.splice(i, 1);
                }
            }
            console.log("-------------->", notesArray)
            fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(notesArray), (err) => {
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