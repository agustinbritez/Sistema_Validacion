<template>
  <div>
    <div class="container">
      <div class="card  ">
        <div class="card-title   ">
          <h1 class="tile">Área {{ " ID: " + areaView.id + "" }}</h1>
          <!-- filter -->
          <div></div>
        </div>
        <div class="card-content">
          <div class="container">
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s8">
                    <input
                      id="owner"
                      class="inputCounter"
                      :disabled="disabledOwner"
                      type="text"
                      data-length="100"
                      v-model="areaAux.owner"
                    />
                    <label for="owner" class="active">Propietario del Área </label>
                  </div>
                  <div class="col s2">
                    <a href="#" @click.prevent="cambiarOwner()">
                      <i class="material-icons">border_color</i>
                    </a>
                  </div>
                  <div class="col s2">
                    <button
                      class="btn"
                      @click.prevent="saveOwner()"
                      :disabled="disabledOwner"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col s10"></div>
                  <div class="col">
                    <a href="#" @click.prevent="cambiarInput()">
                      <i class="material-icons">border_color</i>
                    </a>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input
                      id="name"
                      class="inputCounter"
                      :disabled="disabledInput"
                      type="text"
                      data-length="50"
                      v-model="areaAux.name"
                    />

                    <label for="name" class="active">Nombre</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <Multiselect
                      v-model="areaAux.state_id"
                      :options="statesSelect"
                      label="name"
                      placeholder="Select your character"
                      trackBy="name"
                      :disabled="disabledInput"
                      :searchable="true"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <textarea
                      id="description"
                      class="materialize-textarea"
                      data-length="250"
                      :disabled="disabledInput"
                      v-model="areaAux.description"
                    ></textarea>
                    <label for="description" class="active"> Descripción</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="card-action   ">
          <div class="row">
            <div class="col s6">
              <button
                class="btn"
                @click.prevent="saveEdit()"
                :disabled="disabledInput"
              >
                Save
              </button>
            </div>
            <div class="col s6">
              <button
                class="btn"
                @click.prevent="cancelEdit()"
                :disabled="disabledInput"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <listEvents :area_id="area_id" />
      <br />
    </div>
  </div>
</template>

<script>
import { provide } from "vue";
import * as AppWeb3 from "../../app/app.js";
import { useRoute } from "vue-router";
import Multiselect from "@vueform/multiselect";
import listEvents from "../Event/listEvents.vue";
import * as Menssage from "../../app/menssage.js";

export default {
  name: "Event",
  components: {
    Multiselect,
    listEvents,
  },
  setup(props) {
    let router = useRoute();
    let area_id = router.params.id;

    return { area_id };
  },
  data() {
    return {
      areaView: {},
      areaAux: {},
      statesSelect: [],
      disabledInput: true,
      disabledOwner: true,
    };
  },
  async mounted() {
    M.AutoInit();
    //animacion para setting
    var dropsdowns = document.querySelectorAll(".dropdown-trigger");
    var options = { coverTrigger: false };
    var instancesDropsdown = M.Dropdown.init(dropsdowns, options);

    let router = useRoute();
    await this.getStatesAll();
    this.areaView = await AppWeb3.getArea(router.params.id);
    this.areaAux.id = this.areaView.id;
    this.areaAux.name = this.areaView.name;
    this.areaAux.description = this.areaView.description;
    this.areaAux.owner = this.areaView.owner;
    this.areaAux.state_id = this.areaView.state_id;
  },
  methods: {
    async getStatesAll() {
      let states = await AppWeb3.getStatesAll();
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
    },
    cambiarInput() {
      this.disabledInput = !this.disabledInput;
      this.areaAux.id = this.areaView.id;
      this.areaAux.name = this.areaView.name;
      this.areaAux.description = this.areaView.description;
      this.areaAux.state_id = this.areaView.state_id;
    },
    cambiarOwner() {
      this.disabledOwner = !this.disabledOwner;
      this.areaAux.owner = this.areaView.owner;
    },
    async saveOwner() {
      const retorno = await AppWeb3.changeOwnerArea(
        this.areaAux.owner,
        this.area_id
      );
      if (retorno) {
        this.areaView.owner = this.areaAux.owner;
        this.cambiarOwner();
        M.toast({
          html: Menssage.updated(),
          classes: Menssage.updated_color(),
        });
      } else {
        M.toast({ html: Menssage.error(), classes: Menssage.error_color() });
      }
    },
    cancelEdit() {
      this.cambiarInput();
    },
    async saveEdit() {
      const retorno2 = await AppWeb3.editArea(
        this.areaAux.id,
        this.areaAux.name,
        this.areaAux.description,
        this.areaAux.state_id
      );
      if (retorno2) {
        this.areaView.id = this.areaAux.id;
        this.areaView.name = this.areaAux.name;
        this.areaView.description = this.areaAux.description;
        this.areaView.state_id = this.areaAux.state_id;
        this.cambiarInput();
        M.toast({
          html: Menssage.updated(),
          classes: Menssage.updated_color(),
        });
      } else {
        M.toast({ html: Menssage.error(), classes: Menssage.error_color() });
      }
    },
  },
};
</script>