/*==================================================
Clase que crea los productos (objetos) y que se
almacenarán en la Clase Inventario.
===================================================*/
class Producto{
    constructor(codigo,producto,cantidad,costo){
        this.codigo = parseInt(codigo);
        this.producto = producto;
        this.cantidad = cantidad;
        this.costo = costo;
        this.siguiente = null;
        this.anterior = null;
    }
    // Retorna información básica de un producto.
    info(){
        return `${this.codigo}:: ${this.producto}:: ${this.cantidad}:: ${this.costo}`;
    }
    // Retorna la información con elementos HTML
    infoHtml(){
        return `<b>Código:</b> ${this.codigo} ::: <b>Nombre:</b> ${this.producto} ::: <b>Cantidad:</b> ${this.cantidad} ::: <b>Costo:</b> ${this.costo}<br>`;
    }
}

/*==================================================
Clase que guarda los productos (objetos Producto) y
que contiene los métodos: Agregar, Listar, Buscar y
Eliminar.
===================================================*/
class Inventario{
    constructor(){
        this.primero = null;
    }
    /*==================================================
    Método para agregar nuevos Productos al inventario
    con recursividad.
        - Ingresa objeto Producto.
    ===================================================*/
    agregar(nuevoProducto){
            // Si el inventario está vacío simplemente lo agregamos.
            if(!this.primero){
                this.primero = nuevoProducto;
            } else {
                return this._recAgregar(nuevoProducto,this.primero);
            }
    }
    _recAgregar(nuevoProducto,nodox){
        if(nuevoProducto.codigo < this.primero.codigo){ // Si es menor que el primero nodo.
            nuevoProducto.siguiente = nodox;
            nodox.anterior = nuevoProducto;
            this.primero = nuevoProducto;
        } else if(nuevoProducto.codigo < nodox.codigo){ // Si está en medio de dos nodos.
            nuevoProducto.siguiente = nodox;
            nuevoProducto.anterior = nodox.anterior;
            nodox.anterior.siguiente = nuevoProducto;
            nodox.anterior = nuevoProducto;
        } else if(!nodox.siguiente){ // Si es más grande que todos.
            nuevoProducto.anterior = nodox;
            nodox.siguiente = nuevoProducto
        } else{
            return this._recAgregar(nuevoProducto,nodox.siguiente)
        }
    }
    /*==================================================
    Método para listar todos los Productos del 
    inventario con recursividad
    ===================================================*/
    listar(){
        if(!this.primero){
            return `No se han registrado productos en el inventario<br>`
        } else{
            return this._recListar(this.primero);
        }
    }
    _recListar(nodox){ // recursividad
        // cuando llegue al último devuelve los datos.
        if(!nodox.siguiente){
            return nodox.infoHtml();
        } else{
            return nodox.infoHtml() + this._recListar(nodox.siguiente);
        }
    }
    /*==================================================
    Método para listar todos los Productos del inventario
    por orden inverso a su ingreso.
    ===================================================*/
    listarInverso(){
        if(!this.primero){
            return `No se han registrados productos en el inventario<br>`
        } else{
            return this._recListarInverso(this.primero);
        }
    }
    _recListarInverso(nodox){
        // cuando llegue al último devuelve la información
        if(!nodox.siguiente){
            return nodox.infoHtml();
        } else{
            return this._recListarInverso(nodox.siguiente) + nodox.infoHtml();
        }
    }
    /*======================================================
    Método que busca un Producto con base en su código y
    retorna su objeto.
        - Ingresa el número del código.
    =======================================================*/
    buscar(codigoBuscado){
        if(!this.primero){
            return false;
        } else{
            return this._recBuscar(parseInt(codigoBuscado),this.primero);
        }
    }
    _recBuscar(codigoBuscado,nodox){
        if(nodox.codigo == codigoBuscado){
            return nodox;
        } else if(!nodox.siguiente){
            return false;
        } else{
            return this._recBuscar(codigoBuscado,nodox.siguiente);
        }
    }

    /*=================================================
    Método que busca un código y lo elimina.
        - Ingresa un objeto (usar método .buscar(x);)
    ==================================================*/
    eliminar(codigoEliminar){
        if(!codigoEliminar.anterior){ // Es el primero
            if(!codigoEliminar.siguiente){ // Es el único
                this.primero = null;
            }else {
                this.primero = codigoEliminar.siguiente;
                codigoEliminar.siguiente.anterior = null;
            }
        } else if(!codigoEliminar.siguiente){ // Es el último
            codigoEliminar.anterior.siguiente = null
        } else { // Está entre dos nodos
            codigoEliminar.anterior.siguiente = codigoEliminar.siguiente;
            codigoEliminar.siguiente.anterior = codigoEliminar.anterior;
        }
    }
}

// Función que borra la información de los inputs.
function borrarInformacionDeInputs(){
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtProducto").value = "";
    document.getElementById("txtCantidad").value = "";
    document.getElementById("txtCosto").value = "";
}

// Función que confirma el guardado de los datos
function mensajeDeGuardado(){
    document.getElementById("detalles").innerHTML += "Se guardó correctamente la Información<br>"
}

// Variable global
let miInventario = new Inventario()

/*===========================================================
Codigo que se ejecuta una vez se carga toda la página de HTML
============================================================*/
document.addEventListener("DOMContentLoaded",()=>{    
    
    /*--------------------------------------------------------------
    Botón de Agregar
    Agrega nuevos elementos a nuestro inventario.
    ---------------------------------------------------------------*/
    const btnAdd = document.getElementById("btnAdd");
    
    btnAdd.addEventListener("click",()=>{
        let codigo = document.getElementById("txtCodigo").value;
        let producto = document.getElementById("txtProducto").value;
        let cantidad = document.getElementById("txtCantidad").value;
        let costo = document.getElementById("txtCosto").value;

        if(miInventario.buscar(codigo)){
            detalles.innerHTML+=`<p>El código <b>${codigo}<b> ya existe en el inventario.<p>`
        } else{
            let nuevoProducto = new Producto(codigo,producto,cantidad,costo);
            miInventario.agregar(nuevoProducto);

            // Boramos la información de los inputs y mandamos un mensaje de que se guardó la información correctamente.
            borrarInformacionDeInputs();
            mensajeDeGuardado();  
        }
    });
    
    /*--------------------------------------------------------------
    Botón de Buscar
    Busca los elementos de nuestro inventario mediante el input del código.
    ---------------------------------------------------------------*/
    const btnBuscar = document.getElementById("btnBuscar");
    
    btnBuscar.addEventListener("click",() => {
        let codigo = document.getElementById("txtCodigo").value;
        let productoBuscado = miInventario.buscar(codigo);
        let detalles = document.getElementById("detalles");

        // Si regresa el producto buscado lo mostramos, sino mostramos que no se encontró.
        if (productoBuscado){
            detalles.innerHTML += `==== PRODUCTO ====<br>
            <b>Código:</b> ${productoBuscado.codigo} ::: <b>Nombre:</b> ${productoBuscado.producto} ::: <b>Cantidad:</b> ${productoBuscado.cantidad} ::: <b>Costo:</b> ${productoBuscado.costo}<br>`
        } else {
            detalles.innerHTML+=`<p>Producto con el código <b>${codigo}</b> no fue encontrado.<p>`
        }
    })

    /*--------------------------------------------------------------
    Botón Eliminar
    Busca el código ingresado y lo elimina del inventario.
    ---------------------------------------------------------------*/
    let btnEliminar = document.getElementById("btnEliminar");
    
    btnEliminar.addEventListener("click",()=>{
        let codigo = document.getElementById("txtCodigo").value;
        let producoEliminar = miInventario.buscar(codigo);
        let detalles = document.getElementById("detalles");

        // Mandamos mensaje acorde a si se encontró un producto a eliminar o no se encontró.
        if(producoEliminar){
            miInventario.eliminar(producoEliminar);
            detalles.innerHTML += `<p> El producto fue eliminado correctamente</p>`
        } else {
            detalles.innerHTML += `<p>El código ${codigo} NO se encuentra en la lista, favor de verificarlo.</p>`
        }
    })

    /*--------------------------------------------------------------
    Botón Listar
    Busca el código ingresado y lo elimina del inventario.
    ---------------------------------------------------------------*/
    let btnListar = document.getElementById("btnListar");
    btnListar.addEventListener("click",()=>{
        let detalles = document.getElementById("detalles");
        detalles.innerHTML += "<br>"+ miInventario.listar();
    })

    /*--------------------------------------------------------------
    Botón ListarInverso
    Busca el código ingresado y lo elimina del inventario.
    ---------------------------------------------------------------*/
    let btnListarInverso = document.getElementById("btnListarInverso");
    btnListarInverso.addEventListener("click",()=>{
        let detalles = document.getElementById("detalles");
        detalles.innerHTML += "<br>"+ miInventario.listarInverso();
    })
});
