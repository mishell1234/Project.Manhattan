// Definimos la fecha de referencia (ejemplo)
var fechaReferencia = '2025-01-04 11:30:00';

// Convertimos la fecha de referencia a un objeto Date
var fechaReferenciaDate = new Date(fechaReferencia.replace(/-/g, '/'));  // Usamos replace para formatear a un formato compatible con Date

// Accedemos al iframe dentro de la página con id 'contentResultxx'
var iframe = document.querySelector('#contentResultxx');

// Verificamos que el iframe existe
if (iframe) {
    // Accedemos al documento del iframe
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Seleccionamos la primera tabla con la clase 'cuerpo' dentro del iframe
    var tabla = iframeDocument.querySelector('.cuerpo');  // Usamos la clase 'cuerpo'

    // Si la tabla existe, procedemos a buscar los td que contienen fechas
    if (tabla) {
        // Seleccionamos todos los <td> dentro de la tabla que tienen los atributos align="left" y nowrap="nowrap"
        var tdsFechas = tabla.querySelectorAll('td[align="left"][nowrap="nowrap"]');

        // Iteramos sobre los <td> encontrados
        Array.from(tdsFechas).forEach(function(tdFecha) {
            var fechaTexto = tdFecha.textContent.trim();  // Extraemos el texto de la fecha

            // Mostramos el valor de la fecha para depurar
            console.log('Fecha extraída del <td>:', fechaTexto);

            // Si la fecha no está vacía, la procesamos
            if (fechaTexto) {
                // Limpiamos la fecha (eliminamos espacios extras)
                var fechaLimpiada = fechaTexto.replace(/\s+/g, ' ').trim();

                // Convertimos la fecha extraída a un objeto Date
                var fechaTd = new Date(fechaLimpiada.replace(/-/g, '/'));

                // Si la fecha es válida
                if (!isNaN(fechaTd)) {
                    // Si la fecha es mayor o igual a la fecha de referencia, buscamos el nombre del cliente
                    if (fechaTd >= fechaReferenciaDate) {
                        // Encontramos la fila (tr) que contiene el td con la fecha
                        var tr = tdFecha.closest('tr');  // Encontramos el tr más cercano

                        // En la misma fila, buscamos el <td> que contiene el nombre del cliente
                        // Suponiendo que el nombre del cliente está en el 11º <td> (índice 10)
                        var valorTdCliente = tr.querySelectorAll('td')[10];  // Index 10 para el 11º <td>

                        // Si encontramos el <td> con el nombre del cliente, mostramos su contenido
                        if (valorTdCliente) {
                            console.log('Nombre del cliente:', valorTdCliente.textContent.trim());
                        } else {
                            console.log('No se encontró el nombre del cliente en esta fila');
                        }
                    }
                } else {
                    console.log('Fecha inválida:', fechaLimpiada);  // Si la fecha es inválida
                }
            }
        });
    } else {
        console.log('No se encontró la tabla con clase "cuerpo" dentro del iframe');
    }
} else {
    console.log('No se encontró el iframe con id "contentResultxx"');
}
