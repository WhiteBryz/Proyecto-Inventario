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
    }
    // Retorna información básica de un producto.
    info(){
        return `${this.codigo}:: ${this.producto}:: ${this.cantidad}:: ${this.costo}`;
    }
    // Retorna la información con elementos HTML
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
    agregar(nuevoProducto){
            // Si el inventario está vacío simplemente lo agregamos.
            if(this.datos.length == 1){
                this.datos.push(nuevoProducto);
            } else {
                let insertarEn = -1;

                for(let i=1; i < this.datos.length; i++){
                    if(nuevoProducto.codigo < this.datos[i].codigo){
                        insertarEn = i;
                        break;
                    }
                }

                if(insertarEn == -1){
                    // Si no cambió significa que el código del nuevo producto es el más alto.
                    this.datos.push(nuevoProducto);
                } else{
                    // Agregamos un valor nulo al final y desplazamos los códigos al final.
                    for(let i=this.datos.length; i>insertarEn ; i--){
                        this.datos[i] = this.datos[i-1];
                    }
                    this.datos[insertarEn] = nuevoProducto;
                }
            }
    }
    /*==================================================
    Método para listar todos los Productos del 
    inventario
    ===================================================*/
    listar(){
        let listarProductos = "";

        if(this.datos.length == 1){
            return `No se han registrado productos en el inventario<br>`;
        } else {
            for(let i=1;i<this.datos.length;i++){
                listarProductos += `[PRODUCTO NO.: ${i} ] ::: ${this.datos[i].infoHtml()}<br>`;
            }
            return listarProductos;
        }
    }
    /*==================================================
    Método para listar todos los Productos del inventario
    por orden inverso a su ingreso.
    ===================================================*/
    listarInverso(){
        let listarProductosInverso = "";

        if(this.datos.length == 1){
            return `No se han registrado productos en el Inventario<br>`;
        } else{
            for(let i=this.datos.length-1;i>0;i--){
                listarProductosInverso += `[PRODUCTO NO.: ${i} ] ::: ${this.datos[i].infoHtml()}<br>`;
            }
            return listarProductosInverso;
        }
    }
    /*======================================================
    Método que busca un Producto con base en su código y
    retorna su objeto.
    =======================================================*/
    buscar(codigoBuscado){
        let productoBuscado = null;
        let indexCodigo = null;
        let indice = 1;

        // Cuando encontremos un producto o lleguemos al tamaño de nuestros datos, se rompe el ciclo.
        while(!productoBuscado && indice<this.datos.length){
            if(this.datos[indice].codigo == codigoBuscado){
                productoBuscado = this.datos[indice];
                indexCodigo = indice;
            }
            indice++
        }

        // Retornamos el Producto encontrado o valor nulo para condicionarlo posteriormente.
        // Para llamar al Producto o su Índice usar: 
        //      - Por Producto: .buscar(x)[0]
        //      - Por IndexCodigo: .buscar(x)[1]
        return [productoBuscado,indexCodigo];
    }
    /*=================================================
    Método que busca un código y lo elimina.
    ==================================================*/
    eliminar(codigoEliminar){
        // Buscamos el código del producto a eliminar y traemos su Índice.
        let indexCodigo = this.buscar(codigoEliminar)[1];

        if(indexCodigo){
            // Empezamos a partir del índice encontrado.
            // Recorremos los productos a una posición anterior (-1) para no dejar la posición encontrada como nula.
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

        if(miInventario.buscar(codigo)[0]){
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

        // Mandamos mensaje acorde a si se encontró un producto a eliminar o no se encontró.
        if(producoEliminar){
            detalles.innerHTML += `<p>El código ${codigo} fue eliminado correctamente.</p>`
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
        detalles.innerHTML += miInventario.listar();
    })

    /*--------------------------------------------------------------
    Botón ListarInverso
    Busca el código ingresado y lo elimina del inventario.
    ---------------------------------------------------------------*/
    let btnListarInverso = document.getElementById("btnListarInverso");
    btnListarInverso.addEventListener("click",()=>{
        let detalles = document.getElementById("detalles");
        detalles.innerHTML += miInventario.listarInverso();
    })
})

