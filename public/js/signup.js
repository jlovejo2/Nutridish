$(document).ready(function() {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const firstNameInput = $('input#firstName-input')
    const lastNameInput = $("input#lastName-input");
    const userNameInput = $("input#userName-input");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
        userName: userNameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.firstName, userData.lastName, userData.userName, userData.email, userData.password);
      
      //This code clears the values in the divs
      firstNameInput.val("");
      lastNameInput.val("");
      userNameInput.val("");
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, userName, email, password) {
      $.post("/api/signup", {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password
      })
        .then(function(data) {
          
          console.log("user added successfully")
          window.location.replace('/members');
        })
        // If there's an error, handle it by throwing up a bootstrap alert
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });