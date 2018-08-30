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
const header = new Headers({
"Content-Type": "application/json",
"Accept": "application/json"
});

const request = new Request(url, {
method: "POST",
headers: header,
body: data
});
console.log(user);
fetch(request).then(response => response.json()).then(info => {
if (!info.message){
console.log("error signing in!....");
} else{
  localStorage.setItem('jwToken',info.token);
  location.assign ("../index.html");
}
})
.catch(error => console.log(error));

form.reset();
};

form.addEventListener("submit", signUp, false);

