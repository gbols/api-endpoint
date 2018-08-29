const form = document.forms.signup;
const password = forms.password;
const email = forms.email;
const confirmPassword = forms.confirm;
const username = forms.username;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validEmail = validateEmail(email);

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validEmail) {
    alert("The email provided is invalid");
  }

  if (password !== confirmPassword) {
    alert("The passwords provided do not match");
  }

  const url = "https://thegbols.herokuapp.com/auth/signup";
  const headers = new Headers({
    "Content-Type": "apllication/json",
    "Accept-Charset": "utf-8"
  });

  const request = new Request(url, {
    method:'POST'
  },{
    headers
  });

  fetch(request)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
});
