function minhasReservas() {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    }

    var reserva = document.getElementById('reserva');

    fetch(`http://localhost:3000/village/reserva/minhas/${JSON.parse(localStorage.getItem('loggedUser')).email}`, options).then(async response => {
        var array = await response.json()
        
        function getData(data){
            const str = data;
            const [day, month, year] = str.split('/');
            return new Date(+year, +month - 1, +day);
        }   

        array = array.sort(function(a,b){
          
            return getData(a.data) - getData(b.data);
        });



        var lis = '';

        for (let index = 0; index < array.length; index++) {
            const reserva = array[index];

            lis += `<li>Data de reserva: ${reserva.data} - Area: ${reserva.area.substring(4)} - Quantidade de Pessoas: ${reserva.numeroDePessoas} - Nome da reserva: ${reserva.nome}</li>`  
        }

        reserva.innerHTML += lis

    })

}

minhasReservas()