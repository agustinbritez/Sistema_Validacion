<template>
  <div>
    <nav class="nav-extended" :class="{ color, text_color }">
      <div class="nav-wrapper">
      
        <a href="https://www.unam.edu.ar/" class="brand-logo hide-on-med-and-down">  <img alt="Vue logo" src="https://www.unam.edu.ar/templates/yootheme/cache/UNAM-HOME-ac63afab.webp" /></a>
        <!-- <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        > -->
        <ul id="nav-not-hidden" class="right">
          <li id="" v-if="account === ''">
            <a
              href="#"
              class="btn light-blue accent-3 connect-wallet"
              @click="connectAccount()"
              >Conectar una wallet</a
            >
          </li>

          <li id="" v-if="account !== ''">
            <a
              href="#"
              class="btn teal lighten-4 black-text connect-wallet"
              @click="verificationAccount()"
              >Conectado
            </a>
          </li>

          <!-- <li>
            <ButtonSetting />
          </li> -->
        </ul>
        <!-- <ul id="nav-hidden" class="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
        </ul>
        <SearchGlobal /> -->
      </div>

      <!-- <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab"  v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="tab" v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
            <router-link :to="{ name: 'Event' }">Eventos</router-link>
          </li>
          <li class="tab" v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
            <router-link :to="{ name: 'Areas' }">Áreas</router-link>
          </li>
          <li class="tab">
            <router-link :to="{ name: 'FindDocument' }"
              >Encontrar Documentos</router-link
            >
          </li>
        </ul>
      </div> -->
      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab"  v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
            <a href="#" @click="switchComponent('Home')">Home</a>
          </li>
          <li class="tab" v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
            <a href="#" @click="switchComponent('Events')">Eventos</a>

          </li>
          <li class="tab" v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
             <a href="#" @click="switchComponent('Areas')">Areas</a>
          </li>
          <li class="tab">
            <a href="#" @click="switchComponent('Documents')">Encontrar Documentos</a>
          </li>
          <li class="tab">
            <a href="#" @click="switchComponent('Tutorial')">Tutorial</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- <ul class="sidenav" id="mobile-demo">
      <a href="#" class="brand-logo">Logo</a>
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul> -->
  </div>
</template>

<script>
// const $ = require('jquery')
import SideNav from "@/components/SideNav.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { inject } from "vue";
import SearchGlobal from "./elements/SearchGlobal.vue";
import ButtonSetting from "./elements/ButtonSetting.vue";
import { getRol } from "../app/app.js";

export default {
  name: "NavBar",
  data() {
    return {};
  },
  setup(props) {
    const rol = inject("rol");
 let organitation= inject("organitation");
 
    return {organitation, rol };
  },
  props: {
    color: String,
    text_color: String,
  },

  computed: {
    ...mapState(["account","current"]),
  },
  components: {
    SideNav,
    SearchGlobal,
    ButtonSetting
  },
  methods: {
    ...mapMutations(["connectAccount", "verificationAccount","switchComponent"]),
   
  },
  mounted() {
    
    //vertifica si esta conectado la Cuenta
    document.getElementsByClassName("connect-wallet")[0].click();
   
  },
};
</script>
<style>
</style>