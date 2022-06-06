const btnConfirmaExclusao = document.getElementById("confirmaExclusao");
const btnConfirmaEdicao = document.getElementById("confirmaEdicao");
const btnConfirmaCadastro = document.getElementById("confirmaCadastro");
const tbodyRef = document.getElementById('tabela').getElementsByTagName('tbody')[0];
const user = localStorage.getItem('loggedUser');
const id_criador = JSON.parse(user)['_id'];
const urlVisitantesConcatIdCriador = 'https://faunadbvillage.herokuapp.com/visitantes/'.concat(id_criador);

//Inputs do modal de edição
const fieldNome = document.getElementById('edit_nome');
const fieldEmail = document.getElementById('edit_email');
const fieldTelefone = document.getElementById('edit_telefone');

visitantes = {};

//Mascara para formulario de cadastro e edição
$(document).ready(function () {
    $('#telefone').mask('(00)00000-0000');
    $('#edit_telefone').mask('(00)00000-0000');
});

//Listener para quando fechar algum dos modais de cadastro ou edicao, limpar todos os campos.
$('#modalCadastro, #modalEdicao').on('hidden.bs.modal', function (e) {
    $(this)
        .find("input")
        .val('')
        .end()
})

async function carregarListaVisitantes() {
    $('#tabela tbody').empty();
    fetch(urlVisitantesConcatIdCriador).then(function (response) {
        response.json().then(function (data) {
            visitantes = data;
        }).then(() => {
            for (var i = 0; i < visitantes.length; i++) {

                var id = visitantes[i]['data']["id"];
                var nome = visitantes[i]['data']["nome"];
                var telefone = visitantes[i]['data']["telefone"];
                var email = visitantes[i]['data']["email"];

                var newRow = tbodyRef.insertRow();
                //Nome
                var newCell = newRow.insertCell();
                var tempNome = document.createTextNode(nome);
                newCell.appendChild(tempNome);

                //Telefone
                var newCell = newRow.insertCell();
                var tempTelefone = document.createTextNode(telefone);
                newCell.appendChild(tempTelefone);

                //Email
                var newCell = newRow.insertCell();
                var tempEmail = document.createTextNode(email);
                newCell.appendChild(tempEmail);

                //Ações
                var newCell = newRow.insertCell();

                var editIcon = document.createElement("a");
                editIcon.setAttribute('class', 'teste fa fa-pencil');
                editIcon.setAttribute('href', '#');
                editIcon.setAttribute('edit_user_id', id);
                editIcon.setAttribute('edit_user_name', nome);
                editIcon.setAttribute('onclick', 'editVisitanteHandler()');
                newCell.appendChild(editIcon);

                var deleteIcon = document.createElement("a");
                deleteIcon.setAttribute('class', 'teste fas fa-trash');
                deleteIcon.setAttribute('href', '#');
                deleteIcon.setAttribute('delete_user_id', id);
                deleteIcon.setAttribute('delete_user_name', nome);

                newCell.appendChild(deleteIcon);
            }
        });
    }).catch(function (err) {
        console.error('Falha ao obter os dados de visitantes', err);
    });
}

async function processarDelecaoVisitanteById(url) {
    const options = {
        method: 'DELETE'
    }
    fetch(url, options).then(function () {
        $('#modalConfirmacao').modal('toggle');
        carregarListaVisitantes();
    })
}

async function processarInsercaoVisitante(url, body) {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: body
    }

    fetch(url, options).then(function () {
        $('#modalCadastro').modal('toggle');
        carregarListaVisitantes();
    })
}

function editVisitanteHandler() {
    async function carregarDadosVisitanteSelecionado() {
        const userId = document.getElementById("edit_user_id").innerHTML;
        const url = 'https://faunadbvillage.herokuapp.com/visitante/'.concat(userId);
        const xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (this.status === 200) {
                data = JSON.parse(this.responseText);

                fieldNome.value = data[0]['data']['nome'];
                fieldEmail.value = data[0]['data']['email'];
                fieldTelefone.value = data[0]['data']['telefone'];
            }
            else {
                console.log("File not found");
            }
        }
        xhr.send();
    }
    setTimeout(carregarDadosVisitanteSelecionado, 200);
}

//Trazer lista de visitantes ao carregar página
window.addEventListener('load', function () {
    carregarListaVisitantes();
});

//Listener para cada um dos icones de excluir, identificados por seu respectivo usuario (email)
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName == "A" && e.target.className == "teste fas fa-trash") {
            const userName = e.target.getAttribute("delete_user_name");
            const userId = e.target.getAttribute("delete_user_id");
            //Listener para alterar o texto no modal de confirmação de acordo com o email do usuario clicado
            $('#modalConfirmacao').on('show.bs.modal', function (e) {
                $(e.currentTarget).find('span[id="nomeToRemove"]').text(userName);
                $(e.currentTarget).find('span[id="idToRemove"]').text(userId);
            });
            $('#modalConfirmacao').modal('show');
        }

        if (e.target.tagName == "A" && e.target.className == "teste fa fa-pencil") {
            const userId = e.target.getAttribute("edit_user_id");

            $('#modalEdicao').on('show.bs.modal', function (e) {
                $(e.currentTarget).find('span[id="edit_user_id"]').text(userId);
            });
            $('#modalEdicao').modal('show');
        }
    })
}, false);

//Confirmação do modal, se confirmar vai chamar o endpoint de exclusao enviando o id do registro a excluir
btnConfirmaExclusao.addEventListener('click', function (e) {
    e.preventDefault();
    const idToRemove = document.getElementById('idToRemove').innerHTML;
    const urlDelecao = 'https://faunadbvillage.herokuapp.com/visitantes/'.concat(idToRemove);
    processarDelecaoVisitanteById(urlDelecao);
});

//Confirmação do modal de cadastro, se confirmar vai chamar o endpoint de criação enviando o id do usuario logado para ser usado como chave de criador
btnConfirmaCadastro.addEventListener('click', function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    if (!nome || !telefone || !email) {
        console.log('Dados inválidos');
        return;
    }

    var dados = {
        criador: id_criador,
        nome: nome,
        email: email,
        telefone: telefone
    }

    const obj = JSON.stringify(dados)

    processarInsercaoVisitante('https://faunadbvillage.herokuapp.com/visitantes/', obj);
});

//Confirmação do modal de edição, se confirmar vai chamar o endpoint de edição enviando o id do usuario selecionado
btnConfirmaEdicao.addEventListener('click', function (e) {
    const userId = document.getElementById("edit_user_id").innerHTML;
    const nome = document.getElementById("edit_nome").value;
    const telefone = document.getElementById("edit_telefone").value;
    const email = document.getElementById("edit_email").value;

    if (!nome || !telefone || !email) {
        return;
    }

    var dados = {
        nome: nome,
        email: email,
        telefone: telefone
    }

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://faunadbvillage.herokuapp.com/visitantes/".concat(userId), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //Segurar 500ms para fechar o modal de edição, e atualizar a lista de visitantes
    setTimeout(function () {
        $('#modalEdicao').modal('toggle')
        carregarListaVisitantes();
    }, 500);

    // When response is ready
    xhr.onload = function () {
        if (this.status === 201) {
            console.log("Done");
        }
        else {
            console.log("File not found");
        }
    }
    // At last send the request
    xhr.send(JSON.stringify(dados));
});
