$(document).ready(function(){
    $('#telefone').mask('(00)00000-0000');
  });

var tbodyRef = document.getElementById('tabela').getElementsByTagName('tbody')[0];

visitantes = {};

fetch("../json/visitantes.json")
    .then(mockResponses => mockResponses.json())
    .then(data => {
        visitantes = data;
        func();
    });

async function func() {

    for (var i = 0; i < visitantes.length; i++) {

        var newRow = tbodyRef.insertRow();
        //Nome
        var newCell = newRow.insertCell();
        var nome = document.createTextNode(visitantes[i]["nome"]);
        newCell.appendChild(nome);

        //Telefone
        var newCell = newRow.insertCell();
        var telefone = document.createTextNode(visitantes[i]["telefone"]);
        newCell.appendChild(telefone);

        //Email
        var newCell = newRow.insertCell();
        var email = document.createTextNode(visitantes[i]["email"]);
        newCell.appendChild(email);
    }
}