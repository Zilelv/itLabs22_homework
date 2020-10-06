const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const people = [];
class Person {
    constructor(name, surname, age, city) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.city = city;
    }
}

var John = new Person("John", "Walker", 50, "Alabama");
people.push(John);

function popUp(id) {
        var newPerson = people.slice(id, 1);
        //editName = newPerson[0].name;
        //editSurname = newPerson[0].surname;
       // editCity = newPerson[0].city;
        console.log(newPerson);  
    }


app.get("/", (req, res) => {
    res.render("home", {
        people: people,
    });
    

});

app.post("/", (req, res) => {
    const newPerson = new Person(
        req.body.name, req.body.surname, req.body.age, req.body.city
    );
    people.push(newPerson);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    people.splice(req.body.id, 1);
    res.redirect("/");
});

app.post("/save", (req,res) => {
    people[req.body.editId].name = req.body.editName;
    people[req.body.editId].surname = req.body.editSurname;
    people[req.body.editId].city = req.body.editCity;
    res.redirect("/");
})


app.listen(3000, () => console.log("started on 3000"));
