const loggedUser = localStorage.getItem('loggedUser');
const criador = JSON.parse(loggedUser)['_id'];
//const urlVisitasConcatIdCriador = 'https://faunadbvillage.herokuapp.com/visitas/'.concat(criador);
const urlVisitasConcatIdCriador = 'https://faunadbvillage.herokuapp.com/visitas';
const urlGetVisitasByCriador = 'https://faunadbvillage.herokuapp.com/visitasc/'.concat(criador);

visitas = {}

//Bater no endpoint de lista de visitantes e retornar a lista de visitantes
async function loadVisitantes() {
    const userId = JSON.parse(localStorage.getItem('loggedUser'))['_id'];

    const visitantes = await fetch('https://faunadbvillage.herokuapp.com/visitantes/'.concat(userId));
    const res = await visitantes.json();
    return res;
}

async function inserirVisita(url, body){
    console.log(body);
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }

    fetch(url, options).then(function () {
        //Atualizar a lista de visitas agendadas 
    })
}

async function renderizarTabelaVisitas(){
    const tbodyRef = document.getElementById('tabelaVisitas').getElementsByTagName('tbody')[0];
    $('#tabelaVisitas tbody').empty();

    fetch(urlGetVisitasByCriador).then(function(response){
        response.json().then(function (data) {
            visitas = data;
        }).then(() => {

            visitas.sort(function(a,b){
                return new Date(toISOFormat(a['data'].data_hora)) - new Date(toISOFormat(b['data'].data_hora))
              })

            visitas.forEach(element => {
                const id_visita = element['data']['id'];
                const data_hora = element['data'][ 'data_hora'];
                const participantes = element['data']['participantes'];

                var newRow = tbodyRef.insertRow();

                //data_hora
                var newCell = newRow.insertCell();
                var tempDataHora = document.createTextNode(data_hora);
                newCell.appendChild(tempDataHora);

                //Participantes
                var newCell = newRow.insertCell();
                var tempParticipantes = document.createTextNode(participantes);
                newCell.appendChild(tempParticipantes);

                var newCell = newRow.insertCell();

                var deleteIcon = document.createElement("a");
                deleteIcon.setAttribute('class', 'fas fa-times');
                deleteIcon.setAttribute('href', '#');
                deleteIcon.setAttribute('delete_visita_id', id_visita);

                newCell.appendChild(deleteIcon);

            });
        })

        setTimeout(() => {
            var elementsTrash = document.querySelectorAll('.fa-times');
            elementsTrash.forEach(element => {
                element.addEventListener('click', function handleClick(e) {
                    const visitaId = e.target.getAttribute("delete_visita_id");

                    $('#modalExcluirVisita').on('show.bs.modal', function (e) {
                        $(e.currentTarget).find('span[id="idVisitaRemove"]').text(visitaId);
                    });

                    $('#modalExcluirVisita').modal('show');
                })
            });
        }, 500);
    })
}

//Evento de click no botão de envio da visita
$(function () {
    $('#save_visita').click(function () {
        const dataHora = document.getElementById('basicDate').value;
        var visitantesSelecionados = [];
        $(':checkbox:checked').each(function (i) {
            visitantesSelecionados[i] = $(this).val();
        });

        if (visitantesSelecionados.length <= 0 || !dataHora) {
            $('#visitaError').addClass("show");
            setTimeout(function () {
                $('#visitaError').removeClass("show");
                $('#visitaError').addClass("hidden");
            }, 5000);
            return;
        }

        //Limpar os checkboxes selecionados de visitantes
        $(':checkbox:checked').each(function (i) {
            this.checked = false;            
        });

        //Limpar calendário
        $('#basicDate').val('');

        //Montando objeto para salvar no banco
        const myObj = {
            "criador": criador,
            "participantes": visitantesSelecionados,
            "data_hora": dataHora
        }
        //Função que chama a API e faz o POST com o objeto acima no body
        inserirVisita(urlVisitasConcatIdCriador, myObj);

        //Atualiza a tabela de visitas
        setTimeout(() => {
            renderizarTabelaVisitas();
        }, 500);
    });
});


function toISOFormat(dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    const [DD, MM, YYYY] = date.split('/');
    const [HH, mm] = time.split(':');
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }
