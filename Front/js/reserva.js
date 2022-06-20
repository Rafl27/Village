var salvar = document.getElementById('submit');
salvar.addEventListener('click', func);

var area = window.location.search.split('=')[1]

var areaTexto = document.getElementById('area');
areaTexto.innerHTML += area.substring(4)

function func() {
    var data = document.getElementById("data").value
    var nome = document.getElementById("nome").value
    var numPessoas = document.getElementById("numpessoas").value
    var area = area
    var email = JSON.parse(localStorage.getItem('loggedUser')).email


    const options = {
        method: "POST",
        body: JSON.stringify({
            data,
            nome,
            numPessoas,
            email,
            area
        }),
        headers: {
            'Content-Type': "application/json"
        }
    }

    fetch('http://localhost:3000/village/reserva', options).then(response => {
        return response.json();
    }).then(data => {
        window.location.href = "/html/areaReservation.html"
    })

}    