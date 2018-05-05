const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

let name = $('#name'),
  phonenumber = $('#phonenumber'),
  email = $('#email'),
  uniqueid = $('#uniqueid');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// =====================START VALIDATION RULE CREATION====================== //
// Validation rules for all input fields
$('#form').validate({
  rules: {
    nameValidate: { required: true },
    phonenumberValidate: { required: true },
    emailValidate: { required: true },
    uniqueidValidate: { required: true }

  },
  messages: {
    nameValidate: 'Name is required.',
    phonenumberValidate: 'Phone number is required.',
    emailValidate: 'Employee name is required.',
    uniqueidValidate: 'A uniqueID is required.'
  }
});

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

app.post("/api/create_reservation", async (req, res) => {
  let reservation = req.body;
  const {body: {name, phonenumber, email, uniqueid}} = req;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  const update = await connection.push(newreservation);
  console.log(update);
  res.json(update);

// =====================START POSTING TO CREATE RESERVATION ENDPOINT====================== //
// On submit, check validation. If validation passes, get values and call create_reservation endpoint.
  $('#submit').on('click', (event) => {
    // If validation fails, return without POSTing.
    if (!$('#form').valid()) {
      return;
    }
    event.preventDefault();

    // Disable submit button to prevent multiple clicks and lets the user know void is processing.
    $('#submit').attr('disabled');




    // JSON we will send as request body to create_reservation endpoint
    let data = {
      name: name.val().trim(),
      phonenumber: phonenumber.val().trim(),
      email: email.val().trim(),
      uniqueid: uniqueid.val().trim()
    };

    // Calling the create_reservation endpoint
    $.ajax({
      type: 'POST',
      url: '/api/create_reservation',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      success: (response) => {
        // success button enabled again.
        $('#submit').removeAttr('disabled');
        // console.log(response); //For debug purposes

        // If POST is successful
        if () {

        }
        // If calling endpoint was successful but errors were encountered...
        else {

        }
      },
      // If calling endpoint fails completely...
      error: () => {
        // If API call fails
      }
    });
    // =====================END POSTING TO CREATE RESERVATION ENDPOINT====================== //
  });
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});

