var reserva = document.getElementsByClassName('col-md-4 border p-4 bg-white');

Array.prototype.forEach.call(reserva, function(el) {
    el.addEventListener('click', function(){
        window.location.href = "/html/reserva.html?area=" + el.id
    });
})

