<template>
  <div>
    <div class="container section">
      <a href="#" class="sidenav-trigger" data-target="menu-side">
        <i class="material-icons">menu</i>
      </a>
      <ul class="sidenav" id="menu-side">
        <li>hola</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: "SideNav",
  mounted() {
    // var elems = document.querySelectorAll(".sidenav");
    //Puede ir la variable options, para cambiar colores.
    // var instances = M.Sidenav.init(elems);
  },
 
};
</script>