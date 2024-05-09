$(document).ready(function () {

    $('#selectOpciones').on('change', function() {
        let opcionSeleccionada = $(this).val();
        let contenido = '';
        switch (opcionSeleccionada) {
            case 'futbol':
                contenido = `
                    <div class="col-md-4">
                        <p class="nombre">Haydee Lujan Martinez</p>
                        <div class="card" style="width: 18rem;">
                            <img src="/imagenes/persona.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p>Haydee Lujan Haydee Lujan</p>
                                <p><strong>Haydee Lujan</strong></p>
                                <button type="button" class="btn btn-primary btn-ver-detalles" data-bs-toggle="modal" data-bs-target="#personaModal" id="modalDet" >Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <p class="nombre">Haydee Lujan Martinez</p>
                        <div class="card" style="width: 18rem;">
                            <img src="/imagenes/persona.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <p class="nombre">Haydee Lujan Martinez</p>
                        <div class="card" style="width: 18rem;">
                            <img src="/imagenes/persona.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <br>
                    <button class="btn btn-primary boton-estadisticas" onclick="listar()">Mostrar Estadisticas</button>
                `;
                break;
            case 'hockey':
                contenido = `
                    <div class="col-md-4">
                        <div class="card" style="width: 18rem;">
                            <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card" style="width: 18rem;">
                            <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                break;
        }
        $('#tarjetasContainer').html(contenido);
    });

    //para abrir la modal
    $(document).on('click', '.btn-ver-detalles', function(){
        var dniPersona = $(this).data('id');
        mostrarInfoPersona(dniPersona);
        $('#personaModal').modal('show'); 
    });

    //para que al cargar la pagina automaticamente se muestre solo el inicio
    $('.inicioo').show();

    $('#inicio').on('click', function () {
        $('.inicioo').show();
        $('.inicio-nosotros').show();
        $('.disciplina').hide();
    }); 

    
    $('#disciplinas').on('click', function () {
        $('.disciplina').show();
        $('.inicioo').hide();
        $('.nosotros').hide();
    }); 

    $('#acerca-de').on('click', function () {
        $('.nosotros').show();
        $('.inicioo').hide();
        $('.disciplina').hide();
    }); 

    $('#contactenos').on('click', function(){
        $('contacto').show();
        $('.nosotros').hide();
        $('.inicioo').hide();
        $('.disciplina').hide();
    });
 
});

var cantElem = 0;
    function listar() {
        $.ajax({
            type: "GET",
            url: "http://giau.ing.unlpam.edu.ar/api/estadisticas_anuales.php?id_categoria=1",
            dataType: "json",
            success: function (result, status) {
                var contenido = '';
                result.forEach(e => {
                    contenido += '<tr><td>' + e.id + '</td><td>' + e.partidos + '</td><td>' + e.ganados + '</td><td>' + e.empatados + '</td><td>' + e.perdidos + '</td><td>' + e.puntos + '</td></tr>';
                });
                $("#estadisticas").html(contenido);
                $("#titulosTabla").show(); // Mostrar la tabla después de obtener los datos
            },
            error: function (xhr, status, error) {
                alert("Error: " + status);
            }
        });
    }

    function mostrarInfoPersona(dniPersona) {
        $.ajax({
            type: "GET",
            url: "http://giau.ing.unlpam.edu.ar/api//palmares.php?dni=" + dniPersona,
            dataType: "json",
            success: function (result, status) {
                var contenido = '';
                result.forEach(e => {
                    contenido += '<tr><td>' + e.id + '</td><td>' + e.dni + '</td><td>' + e.anio + '</td><td>' + e.detalle + '</td></tr>';
                });
                $('#personaModal').html(contenido);
            },
            error: function (xhr, status, error) {
                alert("Error: " + status);
            }
        });
    }