function mostrarRegistro(id) {
    document.location.assign("index.php?id=" + id);
}

function mostrarResultados(letraEscogida) {
    document.location.assign("index.php?letra=" + letraEscogida);
}

function mostrarDatosIndividuales() {
    document.getElementById("contenedor").style.display = "none";
    document.getElementById("registro").style.display = "flex";
}

function ocultarTarjeton() {
    //recarga la página
    document.location.assign("index.php");
}

function abrirNuevoContacto() {
    document.getElementById("modal").style.display = "block";
}

function cerrarNuevoContacto() {
    document.getElementById("modal").style.display = "none";
}

function validarFormulario() {
    //definimos accesos a los campos del formulario y leemmos los valores de los campos 
    var nombre = document.getElementById('nombreNC').value;
    var apellido = document.getElementById('apellidoNC').value;
    var empresa = document.getElementById('empresa').value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById('telefono').value;

    //creamos una badera que nos va a indicar la falta llenar algun campo
    var flagCampos = false;
    //correo: declaramos la banderas que validan cada condición
    var flagPrimerCaracter = false;
    var flagArroba = false;
    var flagPosicionArroba = false;
    var flagUltimoPunto = false;
    var flagNumCaracteres = false;

    // declaramos un arreglo para los mensajes de validación
    var mensaje = new Array();


    // checamos si los campos contienen informacion, si no la tienen cambiamos su color 
    if (nombre == "") {
        flagCampos = true;
        mensaje.push("Completa correctamente el campo de nombre");
    }

    if (apellido == "") {
        flagCampos = true;
        mensaje.push("Completa correctamente el campo de apellido");
    }
    if (empresa == "") {
        flagCampos = true;
        mensaje.push("Completa correctamente el campo de empresa");
    }

    if (telefono == "") {
        flagCampos = true;
        mensaje.push("Completa correctamente el campo de telefono");
    }
    //empieza la validacion de email
    if (email == "") {
        flagCampos = true;
    }
    // declaramos de longitud para el correo
    var n = email.length;
    //checamos la longitud del email ingresado
    if (n < 6) {
        flagNumCaracteres = true;
    }

    //checamos que el primer caracter sea una letra mayúscula o minúscula
    var primerCaracter = email.charCodeAt(0);
    if ((primerCaracter >= 65 && primerCaracter <= 90) || (primerCaracter >= 97 && primerCaracter <= 122)) {
        // no hacemos nada, está correcto
    } else {
        flagPrimerCaracter = true;
    }

    // checamos el número de @
    var numArrobas = 0;
    for (var i = 0; i < n; i++) {
        if (email.charAt(i) == "@") numArrobas++;
    }
    if (numArrobas != 1) {
        flagArroba = true;
    }

    //checamos  posición de la arroba si tenemos solo una arroba
    if (!flagArroba) {
        var posArroba = email.indexOf("@");
        if (posArroba >= 1 && posArroba <= email.length - 5) {
            //esta correcto
        } else {
            flagPosicionArroba = true;
        }
    }

    // checamos la posición del último punto
    var ultimoPunto = email.lastIndexOf(".");
    if ((ultimoPunto >= email.length - 5 && ultimoPunto <= email.length - 3) && ultimoPunto != -1) {
        //posición correcta
    } else {
        flagUltimoPunto = true;
    }
    //Vemos el si es valida
    if ((flagUltimoPunto) || (flagNumCaracteres) || (flagPosicionArroba) || (flagPrimerCaracter) || (flagArroba)) {
        mensaje.push("El email ingresado es inválido");
    }
    //checamos el estado de las banderas
    if (!flagUltimoPunto && !flagNumCaracteres && !flagPosicionArroba && !flagPrimerCaracter && !flagArroba) {
        //borramos los mensajes de la lista de errores si es que existen
        document.getElementById("msj").innerHTML = "";
        //añadimos el aviso que paso
        alert("Todo esta bien");
    } else {
        //corremos una función que lee los mensajes de arreglo mensaje, y los imprime
        imprimirErrores(mensaje);
    }
}


function imprimirErrores(errores) {
    //borramos todos los errores impresos anteriormente, si es que existen
    var listaErrores = document.getElementById("msj");
    listaErrores.innerHTML = "";

    //leemos el arreglo errores y por cada uno de sus elementos creamos un elemento li que añadimos al tag ul que
    //muestra la lista de errores
    errores.forEach(function (error) {
        var li = document.createElement("li");
        li.innerHTML = "<span class='error'>" + error + "</span>";
        listaErrores.appendChild(li);
    });
}