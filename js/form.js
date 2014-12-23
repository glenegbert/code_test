//Create your form validation here.//

function validateForm() {
  var first_name = document.forms["contact_form"]["fname"].value;
  var last_name = document.forms["contact_form"]["lname"].value;
  var phone = document.forms["contact_form"]["phone"].value;
  var email = document.forms["contact_form"]["email"].value;
  var message = document.forms["contact_form"]["message"].value;
  var message_intro = "Please complete the following fields before submitting your information:\n"
  var fields = [first_name, last_name, phone, email, message]
  var errors = ["First Name", "Last Name", "Phone","Email","Message"]
  var error_message = []

  for (var i = 0; i < fields.length; i++) {
    if (fields[i]== null || fields[i]==""){
       error_message.push(errors[i])
     }
  }

  if(error_message.length > 0){
    alert(message_intro + error_message.join("\n"))
    return false;
  } else {
    return true
  }

}

exports.validateForm = validateForm;
