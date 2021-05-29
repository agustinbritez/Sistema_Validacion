<template>
  <div class="home container">
    <!-- <img alt="Vue logo" src="https://www.unam.edu.ar/templates/yootheme/cache/UNAM-HOME-ac63afab.webp" /> -->
    <div>
      <h3>Organización</h3>
      <div class="row">
        <div class="input-field col s8">
          <input
            id="owner"
            class="inputCounter"
            :disabled="disabledOwner"
            type="text"
            data-length="100"
            v-model="ownerOrg"
          />
          <label for="owner" class="active"
            >Propietario de la Organización
          </label>
        </div>
        <div class="col s2">
          <a href="#" @click.prevent="cambiarOwner()">
            <i class="material-icons">border_color</i>
          </a>
        </div>
        <div class="col s2">
          <button
            class="btn indigo lighten-1"
            @click.prevent="saveOwner()"
            :disabled="disabledOwner"
          >
            Guardar
          </button>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s8">
          <input
            id="name"
            class="inputCounter"
            :disabled="disabledOrg"
            type="text"
            data-length="50"
            v-model="organitationName"
          />

          <label for="name" class="active">Nombre Organización</label>
        </div>
        <div class="col s2">
          <a href="#" @click.prevent="cambiarOrg()">
            <i class="material-icons">border_color</i>
          </a>
        </div>
        <div class="col s2">
          <button
            class="btn indigo lighten-1"
            @click.prevent="editOrg()"
            :disabled="disabledOrg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <div>
      <h3>Estados</h3>

      <div class="row">
        <div class="input-field col s2">
          <Multiselect
            class="selec"
            v-model="stateAux.id"
            :options="statesSelect"
            label="name"
            placeholder="Seleccione un estado"
            trackBy="name"
            :searchable="true"
          />
        </div>
        <div class="input-field col s3">
          <input
            id="state_name"
            class="inputCounter"
            type="text"
            data-length="50"
            v-model="stateAux.name"
          />

          <label for="state_name" class="active">Nombre del Estado</label>
        </div>
        <div class="input-field col s5">
          <input
            id="mean"
            class="inputCounter"
            type="text"
            data-length="50"
            v-model="stateAux.mean"
          />

          <label for="mean" class="active">Significado del Estado</label>
        </div>
        <div class="col s1">
          <button
            class="btn "
            @click.prevent="newState()"
            :disabled="disabledState"
          >
            Nuevo
          </button>
        </div>
        <div class="col s1">
          <button class="btn indigo lighten-1" @click.prevent="editState()">Editar</button>
        </div>
      </div>
    </div>

    <!-- <router-link :to="{ name: 'FindDocument' }">
      <button class="btn pulse">Validar Documentos</button></router-link
    > -->
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Multiselect from "@vueform/multiselect";
import {
  getOrganitation,
  getOwnerOrg,
  getStatesAll,
  getState,
  setOwner,
  setOrganitation,
  addState,
  editState,
} from "../app/app.js";
import { inject, ref, watchEffect } from "vue";

export default {
  name: "Home",
  components: { Multiselect },
  setup(props) {
    let organitationName = inject("organitationName");
    let disabledOwner = ref(true);
    let disabledOrg = ref(true);
    let disabledState = ref(true);
    let ownerOrg;
    let stateAux = ref({ id: -1, name: "", mean: "" });
    //  stateAux.value.id=0;
    watchEffect(() => {
      console.log("asdasd");
      getState(stateAux.value.id).then((state) => {
        stateAux.value.name = state.name;
        stateAux.value.mean = state.mean;
      });
    });
    return { organitationName, disabledOwner, disabledOrg, ownerOrg, stateAux };
  },
  data() {
    return {
      statesSelect: [],
    };
  },

  mounted() {
    getOrganitation().then((org) => {
      this.organitationName = org;
    });
    getOwnerOrg().then((own) => {
      this.ownerOrg = own;
    });
    getStatesAll().then((states) => {
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
    });
  },
  methods: {
    cambiarOwner() {
      this.disabledOwner = !this.disabledOwner;
    },
    cambiarOrg() {
      this.disabledOrg = !this.disabledOrg;
    },
    saveOwner() {
      setOwner(this.ownerOrg);
    },
    editOrg() {
      setOrganitation(this.organitationName);
    },
    newState() {
      if (this.stateAux.name.trim() != "") {
        addState(this.stateAux.name, this.stateAux.mean).then(() => {
          getStatesAll().then((states) => {
            this.statesSelect=[];
            for (let index = 0; index < states.length; index++) {
              this.statesSelect.push(states[index]);
            }
          });
        });
      } else {
        M.toast({
          html: "No se puede crear un estado vacío",
          classes: "red",
        });
      }
    },
    editState() {
      if (this.stateAux.name.trim() != "") {
        editState(
          this.stateAux.id,
          this.stateAux.name,
          this.stateAux.mean
        ).then(() => {
          this.statesSelect=[];
          getStatesAll().then((states) => {
            for (let index = 0; index < states.length; index++) {
              this.statesSelect.push(states[index]);
            }
          });
        });
      } else {
        M.toast({
          html: "No se puede crear un estado vacío",
          classes: "red",
        });
      }
    },
  },
};
</script>
<style scoped>
body {
  background-color: black;
}
</style>>
  

<style src="@vueform/multiselect/themes/default.css"></style>