$( document ).ready(function() {
//=====================START VALIDATION RULE CREATION====================== //
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
      emailValidate: 'Email is required.',
      uniqueidValidate: 'A uniqueID is required.'
    }
  });

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

    let name = $('#name'),
      phonenumber = $('#phonenumber'),
      email = $('#email'),
      uniqueid = $('#uniqueid');

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
        if (true) {
          console.log('success');
        }
        // If calling endpoint was successful but errors were encountered...
        else {
          console.log('failure');
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