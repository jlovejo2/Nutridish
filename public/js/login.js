$(document).ready(function() {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    //jquery const used to created listener for button on no login found modal
    const modalRedirectSignup = $('#modalSignUpButton');

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      console.log('entered listener');
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    //start listener for modal redirect to signup button
    // modalRedirectSignup.on("click", function(event){
    //   res.render('signup');
    // })


    //Functions to be called below this line
    //_______________________________________________

    // loginUser does a post to our "api/login" route and if successful, redirects us to the members page
    function loginUser(email, password) {
      console.log("entered login user function");
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(function(resp) {
          console.log('password found')
          window.location.replace('/members');
          // res.render("search");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
          console.log('no login')

          $('.noLogin').modal('show');
          //this line of code grabs the modal div and opens it
          $("#noLoginFound").modal('open');

        });
    }
  });