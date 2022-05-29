var btn = document.getElementById('submit');
var alerta = document.getElementById("alerta")

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
    retorno = {};

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i]["email"] == login && usuarios[i]["senha"] == senha) {
            retorno = usuarios[i]            
            encontrou = true;
            break;
        } else {
            encontrou = false;
        }
    }

    if(encontrou){
        localStorage.setItem('loggedUser', JSON.stringify(retorno))
        //console.log(retorno["permissao"]);
        //setTimeout(function(){
        //    window.location.href = 'https://www.google.com';
        // }, 500);
    }else{
        $('#alerta').css("visibility", "visible");
        setTimeout(function(){
            $('#alerta').css("visibility", "hidden");
        }, 3000);       
    }
}