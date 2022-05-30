
//Mascara para formulario de cadastro
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

        var nome = visitantes[i]["nome"];
        var telefone = visitantes[i]["telefone"];
        var email = visitantes[i]["email"];

        var newRow = tbodyRef.insertRow();
        //Nome
        var newCell = newRow.insertCell();
        var nome = document.createTextNode(nome);
        newCell.appendChild(nome);

        //Telefone
        var newCell = newRow.insertCell();
        var telefone = document.createTextNode(telefone);
        newCell.appendChild(telefone);

        //Email
        var newCell = newRow.insertCell();
        var email = document.createTextNode(email);
        newCell.appendChild(email);

        //Ações
        var newCell = newRow.insertCell();

        var editIcon = document.createElement("a");
        editIcon.setAttribute('class', 'teste fa fa-pencil');
        editIcon.setAttribute('editName', visitantes[i]["email"]);
        newCell.appendChild(editIcon);

        var deleteIcon = document.createElement("a");
        deleteIcon.setAttribute('class', 'teste fas fa-trash');
        deleteIcon.setAttribute('href', '#');
        deleteIcon.setAttribute('excluirUser', visitantes[i]["email"]);
        
        newCell.appendChild(deleteIcon);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e){
        if(e.target.tagName=="A"){
            var image = e.target.getAttribute("excluirUser");
            alert(image);
        }
      })
 }, false);

