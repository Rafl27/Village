var btn = document.getElementById('submit');
usuarios = {};

fetch("../json/users.json")
    .then(mockResponses => {
        return mockResponses.json();
    })
    .then(function (data) {
        usuarios = data;
    });

btn.addEventListener('click', func);

function func() {
    var login = document.getElementById("inputEmail").value
    var senha = document.getElementById("inputPassword").value

    var encontrou = false;

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i]["email"] == login && usuarios[i]["senha"] == senha) {
            encontrou = true;
            break;
        } else {
            encontrou = false;
        }
    }

    if(encontrou){
        console.log("Login e senha OK");
    }else{
        console.log("Login ou senha incorretos");
    }
}