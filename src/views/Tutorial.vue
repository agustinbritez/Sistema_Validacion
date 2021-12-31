<template>
    <div class="row">
    <div class="col s12">
      <!-- <ul class="tabs center">
        <li class="tab col s6"><a href="#test1" class="active">¿Como Verificar un Documento?</a></li>
        <li class="tab col s6"><a href="#test2">Segundo Paso</a></li>
      </ul> -->
    </div>
    <!-- <div id="test1" class="col s12"> -->
      <div class="card ">
        <div class="card-content">
          <span class="card-title">¿Como Verificar un Documento?</span>
          <ul>
          <li>
            
            <div class="row left-align">
            <div class="col s4"><p>Primero, ingrese a la vista "Encontrar Documentos".</p></div>
            <div class="col s8"><img  class="responsive-img" src="img/boton_encontrar_documentos.png" alt=""></div>
            </div>
            <hr>
            </li>
          <li>
            <div class="row left-align">
              <div class="col s4"><p>Presionar al botón "Documentos" como se muestra en la imagen.</p></div>
              <div class="col s8"><img class="responsive-img"  src="img/vista_encontrar_documentos.png" alt=""></div>
            </div>
          <hr>
          </li>
          <li>
              <div class="row left-align">
                <div class="col s4"><p>Seleccionar los archivos que quiere verificar (en el ejemplo se seleccionó 3) y presionar el botón abrir.</p></div>
                <div class="col s8"><img class="responsive-img"  src="img/vista_econtrar_documentos_select.png" alt=""></div>
            </div>
          <hr>
          </li>
          <li>
             <div class="row left-align">
                <div class="col s4"><p>En la vista aparecen dos pestañas "VERIFICADOS" y "NO VERIFICADOS" los archivos que aparecen en la pestaña "VERIFICADOS" están
              en la Blockchain y fue emitido por la Universidad.</p></div>
                <div class="col s8"><img class="responsive-img"  src="img/vista_econtrar_documentos_verificados.png" alt=""></div>
            </div>
          <hr>
          </li>
          <li>
             <div class="row left-align">
                <div class="col s4"><p>Mientras que la pestaña "NO VERIFICADOS" muestran los archivos que no fueron emitidos por la Universidad o fueron alterados por terceros.</p></div>
                <div class="col s8"><img class="responsive-img"  src="img/vista_econtrar_documentos_noverificados.png" alt=""></div>
            </div>
          <hr>
          </li>
        </ul>
        </div>
        <div class="card-action">
        </div>
      </div>
      
    <!-- </div> -->
    <!-- <div id="test2" class="col s12">Ir a la vista </div> -->

  </div>
</template>
<script>
export default {
  name: "Tutorial",
  components: {
  },
  mounted() {
    //  var el = document.querySelectorAll(".tabs");
    // var options = {};
    // var instance = M.Tabs.init(el, options);

  },
};
</script>