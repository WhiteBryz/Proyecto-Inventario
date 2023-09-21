/*==================================================
Clase que crea los productos (objetos) y que se
almacenarán en la Clase Inventario.
===================================================*/
class Producto{
    constructor(codigo,producto,cantidad,costo){
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.costo = costo;
    }
    // Retorna la información de de un producto.
    info(){
        return `${this.codigo}:: ${this.producto}:: ${this.cantidad}:: ${this.costo}`;
    }
    infoHtml(){
        return `<b>Código:</b> ${this.codigo} ::: <b>Nombre:</b> ${this.producto} ::: <b>Cantidad:</b> ${this.cantidad} ::: <b>Costo:</b> ${this.costo}`;
    }
}


/*==================================================
Clase que guarda los productos (objetos Producto) y
que contiene los métodos: Agregar, Listar, Buscar y
Eliminar.
===================================================*/
class Inventario{
    constructor(){
        // El índice 0 lo anulamos.
        this.datos=[null];
    }
    /*==================================================
    Método para agregar nuevos Productos al inventario
    ===================================================*/
    agregar(nuevo){
        this.datos.push(nuevo);
    }
    /*==================================================
    Método para lista todos los Productos del inventario
    por orden de ingreso.
    ===================================================*/
    listar(){
        let listaProductos = "";

        if(this.datos.length>1){
            for(let i=1;i<this.datos.length;i++){
                listaProductos += `[PRODUCTO NO.: ${i} ] ::: ${this.datos[i].infoHtml()}<br>`;
            }
            return listaProductos;
        } else {
            return `No se han registrado productos en el Inventario`;
        }
    }
    /*======================================================
    Método que busca un Producto con base en su código y
    retorna su objeto.
    =======================================================*/
    buscar(codigoBuscado){
        let codigoEncontrado = null;
        let indexCodigo = null;
        
        this.datos.forEach((producto,index) => {
            // Si no es nulo. Ayuda a poder eliminar el primer Producto porque si estuviera en el índice 0 devolvería un índice=0, que esto igual a nulo. De esta manera obligamos que el primer producto tenga índice 1 y al ejecutar el método "eliminar" se pueda hacer de manera correcta. 
            if(producto){
                if(producto.codigo == codigoBuscado){
                    codigoEncontrado = producto;
                    indexCodigo = index;
                }
            }
        })
        // Retornamos el Producto encontrado o valor nulo para condicionarlo posteriormente.
        // Para llamar al Producto o su Índice usar: 
        //      - Producto: .buscar(x)[0]
        //      - IndexCodigo: .buscar(x)[1]
        return [codigoEncontrado,indexCodigo];
    }
    /*=================================================
    Método que busca un código y lo elimina.
    ==================================================*/
    eliminar(codigoEliminar){
        let indexCodigo = null;

        // Buscamos el código del producto a eliminar y traemos su Índice.
        indexCodigo = this.buscar(codigoEliminar)[1];

        if(indexCodigo){
            // Recorremos los productos una posición anterior para no dejar valores nulos.
            for(let x = indexCodigo; x<this.datos.length; x++){
                this.datos[x] = this.datos[x+1];
            }
            this.datos.pop();
            // Retornamos verdadero para condicionarlo posteriormente
            return true;
        } else{
            return indexCodigo;
        }
    }
}

// Función que borra la información de los inputs.
function borrarInformacion(){
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtProducto").value = "";
    document.getElementById("txtCantidad").value = "";
    document.getElementById("txtCosto").value = "";
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

        let nuevo = new Producto(codigo,producto,cantidad,costo);
        miInventario.agregar(nuevo);

        // Boramos la información de los inputs y mandamos un mensaje de que se guardó la información correctamente.
        borrarInformacion();
        mensajeDeGuardado();  
    });
    
    /*--------------------------------------------------------------
    Botón de Buscar
    Busca los elementos de nuestro inventario mediante el input del código.
    ---------------------------------------------------------------*/
    const btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click",() => {
        let codigo = document.getElementById("txtCodigo").value;
        let productoBuscado = miInventario.buscar(codigo)[0];
        let detalles = document.getElementById("detalles");

        // Si regresa el producto buscado lo mostramos, sino mostramos que no se encontró.
        if (productoBuscado){
            detalles.innerHTML += `==== PRODUCTO ====<br>
            <b>Código:</b> ${productoBuscado.codigo} ::: <b>Nombre:</b> ${productoBuscado.producto} ::: <b>Cantidad:</b> ${productoBuscado.cantidad} ::: <b>Costo:</b> ${productoBuscado.costo}<br>`
        } else {
            detalles.innerHTML+=`<p>Producto con el código <b>${codigo}<b> no fue encontrado.<p>`
        }
    })

    /*--------------------------------------------------------------
    Botón Eliminar
    Busca el código ingresado y lo elimina del inventario.
    ---------------------------------------------------------------*/
    let btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.addEventListener("click",()=>{
        let codigo = document.getElementById("txtCodigo").value;
        let producoEliminar = miInventario.eliminar(codigo);
        let detalles = document.getElementById("detalles");

        if(!producoEliminar){
            detalles.innerHTML += `<p>El código ${codigo} NO se encuentra en la lista, favor de verificarlo.</p>`
        } else {
            detalles.innerHTML += `<p>El código ${codigo} fue eliminado correctamente.</p>`
        }
    })

    /*--------------------------------------------------------------
    Botón Listar
    Busca el código ingresado y lo elimina del inventario.
    ---------------------------------------------------------------*/
    let btnListar = document.getElementById("btnListar");
    btnListar.addEventListener("click",()=>{
        let detalles = document.getElementById("detalles");
        detalles.innerHTML += miInventario.listar();
    })
})

