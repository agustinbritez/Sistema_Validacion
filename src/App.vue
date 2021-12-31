<template>
  <div>
    <NavBar :color="'blue'" :text_color="''" :key="componentKey" />
    <!-- router-view muestra el componente relacionado a la ruta actual en el NavBar estan como se llaman alas rutas -->
    <!-- <transition>
      <router-view />
    </transition> -->
    <!-- https://stackoverflow.com/questions/47512931/how-to-dynamically-change-components-in-vuejs -->
    <!-- <div :is="Home" :swap-component="swapComponent"></div> -->
    
    <component :is="current" v-bind="{ idProps: 4 }"  ></component>
    <!-- kkeep-alive mantiene el componente sin destruir pero no me sirve porque asi carda de nuevo los eventos y areas que existen -->
    <!-- <keep-alive>
    <component :is="current" v-bind="{ idProps: 4 }"  ></component>
    </keep-alive> -->
    <PreLoad></PreLoad>
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import PreLoad from "./components/elements/PreLoad.vue";
import Home from "./views/Home.vue";
import Areas from "./views/Areas.vue";
import Events from "./views/Events.vue";
import Tutorial from "./views/Tutorial.vue";
import FindDocument  from "@/components/Document/FindDocument.vue";
import ViewArea  from "@/components/Areas/ViewArea.vue";
import viewEvent  from "@/components/Event/viewEvent.vue";

import { mapState } from "vuex";
import "../public/materialize/js/materialize.min.js";
import { provide, reactive, ref, watchEffect } from "vue";
import { getRol } from "./app/app.js";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    PreLoad,
    Home:Home,
    Areas:Areas,
    ViewArea:ViewArea,
    Events:Events,
    ViewEvent:viewEvent,
    Documents:FindDocument,
    Tutorial
  },
  computed: {
    ...mapState(["account", "isLoading","current","idProps"]),
  },
  methods: {
     componentKey() {
      this.rol = this.rol;
    },
  },
  data() {
    return {
      idProp:0
    };
  },
  setup() {
    const rol = ref({});
    provide("rol", rol);
    rol.value="NADA";
    const organitationName = ref("Validation System");
    provide("organitationName", organitationName);

    const uploadedFiles = ref([]);
    const allHashes = ref([]);
    const reduceHash = (hash) => {
      console.log(hash);
      if (hash.length >= 9) {
        let newHash = hash[0] + hash[1] + hash[2] + hash[3];
        newHash =
          newHash +
          "..." +
          hash[hash.length - 4] +
          hash[hash.length - 3] +
          hash[hash.length - 2] +
          hash[hash.length - 1];
        return newHash;
      }
      return "";
    };

    provide("reduceHash", reduceHash);
    provide("uploadedFiles", uploadedFiles);
    provide("allHashes", allHashes);
    const documentsArray = ref({});
    provide("documentsArray", documentsArray);
    let documentEdit = ref({});
    provide("documentEdit", documentEdit);

    return {
      organitationName,
      rol,
      uploadedFiles,
      allHashes,
      documentsArray,
      reduceHash,
    };
  },
  mounted() {
    let router = useRouter();
    console.log(router.currentRoute.value.name);
if (typeof window.ethereum !== "undefined") {
   window.ethereum.on("accountsChanged", function (accounts) {
      getRol().then((x) => {
        console.log("cambio?" + x);
        if (x != "OWNER" && x != "OWNER_AREA") {
          if (
            router.currentRoute.value.name != "Home" &&
            router.currentRoute.value.name != "FindDocument"
          ) {
            router.push({ name: "Home" });
          }
        }
        this.rol = x;
        location.reload();
      });
    });
     getRol().then((x) => {
      this.rol = x;
      //cambiar esto porque carga infinitamente
      if (x != "OWNER" && x != "OWNER_AREA") {
        if (
          router.currentRoute.value.name != "Home" &&
          router.currentRoute.value.name != "FindDocument"
        ) {
          router.push({ name: "Home" });
        }
      }
    });
}else{
}
 

   

    //Activar animaciones
    // M.AutoInit();
    //animacion para setting
    var dropsdowns = document.querySelectorAll(".dropdown-trigger");
    var options = { coverTrigger: false };
    var instancesDropsdown = M.Dropdown.init(dropsdowns, options);
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
body {
  background-color: #e0ffff;
  /* background-color: #40592c; */

  /* background-color: rgb(221, 218, 126); */
}
.card-title,
.card-action,
.pagination,
nav,
footer,
.tab-verify,
.modal-footer {
  background-color: #20b2aa !important;
  font-size: 15px;
  /* background-color: rgb(221, 218, 126); */
}
.card,
.modal {
  background-color: #afeeee !important;
}
label {
  color: black !important;
}

.selec {
  border: 2px solid black;
}
</style>
<style>
@import "../public/materialize/css/materialize.min.css";
</style>

