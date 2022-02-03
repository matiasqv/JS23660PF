const carro = new Carrito();
const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const procesarPedidoBtn = document.getElementById("procesar-pedido");

cargarEventos();

function cargarEventos() {
	//Se ejecuta cuando se presionar Compar (agregar-carrito)
	productos.addEventListener("click", (e) => {
		carro.comprarProducto(e);
	});

	//Cuando se elimina productos del carrito
	carrito.addEventListener("click", (e) => {
		carro.eliminarProducto(e);
	});

	//Al vaciar carrito
	vaciarCarritoBtn.addEventListener("click", (e) => {
		carro.vaciarCarrito(e);
	});

	//Al cargar documento se muestra lo almacenado en LS
	document.addEventListener("DOMContentLoaded", () => {
		carro.leerLocalStorage();
		fetchProductos();
	});

	//Enviar pedido a otra pagina
	procesarPedidoBtn.addEventListener("click", (e) => {
		carro.procesarPedido(e);
	});
}

async function fetchProductos() {
	let res = await fetch("../data/productos.json");
	let data = await res.json();
	let html = "";


	data.forEach((producto, index) => {
		articulo = `
			<div class="card mb-4 shadow-sm ">
				<div class="card-header">
					<h4 class="my-0 font-weight-bold">${producto.producto}</h4>
				</div>
				<div class="card-body">
					<img src=${producto.imagen} class="card-img-top" style="height: 15em; object-fit: cover;" alt=${producto.producto}>
					<h1 class="card-title pricing-card-title">${producto.marca}</h1>
					<h3 class="my-0 font-weight-bold precio">$<span class="">${producto.precio}</span></h3>
					<ul class="list-unstyled mt-3 mb-4">
					${producto.detalles.map((ele) => `<li>${ele}</li>`).join("")}
					</ul>
					<a href="" class="btn btn-block btn-primary agregar-carrito" data-id=${producto.id}>Comprar</a>
				</div>
			</div>
		`

		if(index === 0){
			html += `<div class="card-deck mb-3 text-center md:w-10">${articulo}`
		}else if(index % 3 === 0 && index !== 0){
			html += `</div><div class="card-deck mb-3 text-center md:w-10">${articulo}`
		}else{
			html += articulo
		}
	});
	productos.innerHTML = html;
}

