const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let reservations = [
  {
    name: "Alex",
    phonenumber: "555-567-4321",
    email: "fake1@gmail.com",
    uniqueid: 1,
  },
  {
    name: "Thomas",
    phonenumber: "555-567-4325",
    email: "fake2@gmail.com",
    uniqueid: 2,
  },
  {
    name: "Geoff",
    phonenumber: "555-567-43231",
    email: "fake3@gmail.com",
    uniqueid: 3,
  }
];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservation/:table", function(req, res) {
  let selected = req.params.table;

  console.log(selected);

  for (let i = 0; i < reservations.length; i++) {
    if (selected === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }
  return res.json(false);
});

app.post("/api/create_reservation", async (req, res) => {
  let reservation = req.body;
  const { body: { name, phonenumber, email, uniqueid } }  = req;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  const update = await connection.push(newreservation);
  console.log(update);
  res.json(update);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
