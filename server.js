let express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", (req, res) => {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/api/reservations", (req, res) => {
  return res.json(reservations);
});

app.get("/api/reservation/:table", (req, res) => {
  let selected = req.params.table;
  console.log(selected);
  for (let reservation of reservations) {
    if (selected === reservation.routeName) {
      return res.json(reservation);
    }
  }
  return res.json(false);
});

app.post("/api/create_reservation", (req, res) => {
  let newreservation = req.body;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  console.log(newreservation);
  reservations.push(newreservation);
  res.json(newreservation);
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});

