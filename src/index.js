const form = document.forms.signup;

const signUp = e => {
  e.preventDefault();
  const user = {
    email: form.email.value,
    password: form.password.value,
    confirm: form.confirm.value,
    username: form.username.value
  };
  if (user.password !== user.confirm) {
    alert("The password you have entered do not match");
  }
  const data = JSON.stringify(user);
  
  const url = "https://thegbols.herokuapp.com/api/v1/auth/signup";
  const headers = new Headers({
    "Content-Type": "application/json",
    "Accept":"application/json"
  });
  
  const request = new Request(url, {
    method:'POST',
    Headers:headers,
    body:data
  });
  console.log(user);
  fetch(request)
  .then(response => response.json())
  .then(info => console.log(info))
  .catch(error => console.log(error));
  
  form.reset();
};

form.addEventListener("submit", signUp, false);
// form.addEventListener("submit", e => {
//   e.preventDefault();
//   const password = form.password.value;
//   const email = form.email.value;
//   const confirmPassword = form.confirm.value;
//   const username = form.username.value;
//   console.log(confirmPassword, username, email, password);
//   const validEmail = validateEmail(email);
//   if (!validEmail) {
//     console.log(email);
//      alert("The email provided is invalid");
//   }

//   if (password !== confirmPassword) {
//      alert("The passwords provided do not match");
//   }

//   const url = "https://thegbols.herokuapp.com/auth/signup";
//   const headers = new Headers({
//     "Content-Type": "apllication/json",
//     "Accept-Charset": "utf-8"
//   });

//   const request = new Request(url, {
//     method:'POST'
//   },{
//     headers
//   });

//   fetch(request)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.log(error));

//     form.reset();
// });
