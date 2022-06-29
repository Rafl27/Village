var salvar = document.getElementById('submit');
salvar.addEventListener('click', func);

var areaReserva = window.location.search.split('=')[1]

var areaTexto = document.getElementById('area');
areaTexto.innerHTML += areaReserva.substring(4)

function datepicker() {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    }
   fetch(`http://localhost:3000/village/reserva/${areaReserva}`, options).then(async response => {
        var array = await response.json()
        $("#datepicker" ).datepicker({
            dateFormat: 'dd/mm/yy',
            minDate: new Date(),
            beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
                return [ array.indexOf(string) == -1 ]
            }
        });
   })

}


function func() {
    var data = document.getElementById("datepicker").value
    var nome = document.getElementById("nome").value
    var numPessoas = document.getElementById("numpessoas").value
    var area = areaReserva
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

datepicker()