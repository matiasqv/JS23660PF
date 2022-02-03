const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
}

function procesarCompra() {
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        location.href = "index.html";
        window.alert("El carrito está vacío, agrega algún producto");
    }
    else if (cliente.value === '' || correo.value === '') {
        window.alert("Ingrese todos los campos requeridos");
    }
    else if (correo.value.indexOf("@") < 0) {
        window.alert("El email debe contener una @");
    } else if (correo.value.indexOf(".com", correo.value.indexOf("@")) < 0) {
        window.alert("El email debe contener .com detras de la @");
    }
    else {
        location.href = "index.html";
        window.alert("Tu pedido fue enviado \nEn breve recibirás un email con la fecha de entrega y la factura \nGracias por su compra" );
        localStorage.clear();
    }
}
