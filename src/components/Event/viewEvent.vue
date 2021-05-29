<template>
  <div>
    <div class="container">
      <div class="card  ">
        <div class="card-title   ">
          <h1 class="tile">Evento {{ " ID: " + eventView.id + "" }}</h1>
          <!-- filter -->
          <div></div>
        </div>
        <div class="card-content">
          <div class="container">
            <div class="row">
              <form class="col s12">
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
                      v-model="eventAux.name"
                    />

                    <label for="name" class="active">Nombre</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <textarea
                      id="description"
                      class="materialize-textarea"
                      data-length="250"
                      v-model="eventAux.description"
                      :disabled="disabledInput"
                    ></textarea>
                    <label for="description" class="active"> Descripción</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input
                      id="startEvent"
                      type="datetime-local"
                      class="form-control"
                      :disabled="disabledInput"
                      v-model="eventAux.startEvent"
                    />
                    <label for="startEvent" class="active">Inicio del Evento</label>
                  </div>
                  <div class="input-field col s6">
                    <input
                      id="endEvent"
                      type="datetime-local"
                      class="form-control"
                      :disabled="disabledInput"
                      v-model="eventAux.endEvent"
                    />
                    <label for="endEvent" class="active">Final del Evento</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <Multiselect
                      id="state"
                      v-model="eventAux.state_id"
                      :options="statesSelect"
                      label="name"
                      placeholder="Select state"
                      trackBy="name"
                      :disabled="disabledInput"
                      :searchable="true"
                    />
                    <label for="state" class="active"> Estado </label>
                  </div>
                  <div class="input-field col s6">
                    <Multiselect
                      id="area_id"
                      v-model="eventAux.area_id"
                      :options="areasSelect"
                      label="name"
                      placeholder="Select Area"
                      trackBy="name"
                      :disabled="disabledInput"
                      :searchable="true"
                    />
                    <label for="area_id" class="active"> Área</label>
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
                class="btn indigo lighten-1"
                @click.prevent="saveEdit()"
                :disabled="disabledInput"
              >
                Guardar
              </button>
            </div>
            <div class="col s6">
              <button
                class="btn"
                @click.prevent="cancelEdit()"
                :disabled="disabledInput"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
     
      <br />
    </div>
     <ListDocuments :event_id="eventView.id" />
  </div>
</template>

<script>
import { provide } from "vue";
import * as AppWeb3 from "../../app/app.js";
import { useRoute } from "vue-router";
import Multiselect from "@vueform/multiselect";
import ListDocuments from "../Document/ListDocuments.vue";
import * as Menssage from "../../app/menssage.js";

export default {
  name: "Event",
  components: {
    Multiselect,
    ListDocuments,
  },
  setup(props) {
    let router = useRoute();
    let area_id = router.params.id;

    return { area_id };
  },
  data() {
    return {
      eventView: {},
      eventAux: {},
      statesSelect: [],
      areasSelect: [],
      disabledInput: true,
    };
  },
  async mounted() {
    let router = useRoute();
    await this.getStatesAll();
    await this.getAllAreasOfOwner();
    this.eventView = await AppWeb3.getEvent(router.params.id);

    this.eventAux.id = this.eventView.id;
    this.eventAux.name = this.eventView.name;
    this.eventAux.description = this.eventView.description;
    this.eventAux.startEvent = this.eventView.startEvent;
    this.eventAux.endEvent = this.eventView.endEvent;
    this.eventAux.state_id = this.eventView.state_id;
    this.eventAux.area_id = this.eventView.area_id;
  },
  methods: {
    async getStatesAll() {
      let states = await AppWeb3.getStatesAll();
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
    },
    async getAllAreasOfOwner() {
      let cantAreas = await AppWeb3.getLengthAreaOfOwner();
      let areas = await AppWeb3.getAllAreaOfOwner(0, cantAreas);

      for (let index = 0; index < areas.length; index++) {
        areas[index].value = areas[index].id;
        this.areasSelect.push(areas[index]);
      }
    },
    cambiarInput() {
      this.disabledInput = !this.disabledInput;
      this.eventAux.id = this.eventView.id;
      this.eventAux.name = this.eventView.name;
      this.eventAux.description = this.eventView.description;
      this.eventAux.startEvent = this.eventView.startEvent;
      this.eventAux.endEvent = this.eventView.endEvent;
      this.eventAux.state_id = this.eventView.state_id;
      this.eventAux.area_id = this.eventView.area_id;
    },
    cancelEdit() {
      this.cambiarInput();
    },
    async saveEdit() {
      const retorno2 = await AppWeb3.editEvent(
        this.eventAux.id,
        this.eventAux.name,
        this.eventAux.description,
        this.eventAux.startEvent,
        this.eventAux.endEvent,
        this.eventAux.area_id,
        this.eventAux.state_id
      );
      if (retorno2) {
        this.eventView.id = this.eventAux.id;
        this.eventView.name = this.eventAux.name;
        this.eventView.description = this.eventAux.description;
        this.eventView.startEvent = this.eventAux.startEvent;
        this.eventView.endEvent = this.eventAux.endEvent;
        this.eventView.state_id = this.eventAux.state_id;
        this.eventView.area_id = this.eventAux.area_id;

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