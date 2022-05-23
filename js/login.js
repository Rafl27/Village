var btn = document.getElementById('submit');


fetch("../json/users.json")
.then(mockResponses => {
   return mockResponses.json();
})
.then(data => console.log(data));



btn.addEventListener('click', func);

function func() {
    var login = document.getElementById("inputEmail").value
    var senha = document.getElementById("inputPassword").value

    
}