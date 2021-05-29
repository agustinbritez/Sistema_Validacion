<template>
  <div>
    <!-- Modal Structure -->
    <!-- <a class="waves-effect waves-light btn modal-trigger" :href="'#'+modalName"
      >Modal</a
    > -->

    <!-- Modal Structure -->
    <div :id="modalName" class="modal">
      <div class="modal-content">
        <h5>{{ nameModal }}</h5>
        <hr />
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="name"
                  class="inputCounter"
                  type="text"
                  data-length="50"
                  v-model="eventEdit.name"
                />
                <label for="name" :class="{ active: activeInput }"
                  >Nombre</label
                >
              </div>
              <div class="input-field col s6" v-if="showSelectArea">
                <Multiselect
                  v-model="eventEdit.area_id"
                  :options="areasSelect"
                  label="name"
                  placeholder="Seleccionar un Área"
                  trackBy="name"
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
                  v-model="eventEdit.description"
                ></textarea>
                <label for="description" :class="{ active: activeInput }">
                  Descripción</label
                >
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input
                  id="startEvent"
                  type="datetime-local"
                  class="form-control"
                  v-model="eventEdit.startEvent"
                />
                <label for="startEvent" class="active">Inicio del Evento</label>
              </div>

              <div class="input-field col s6">
                <input
                  id="endEvent"
                  type="datetime-local"
                  class="form-control"
                  v-model="eventEdit.endEvent"
                />
                <label for="endEvent" class="active">Fin del Evento</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row">
          <div class="col s2">
            <a
              href="#!"
              @click.prevent="editOrNew()"
              class="waves-effect waves-green darken-1 btn-flat"
              >Save</a
            >
          </div>
          <div class="col s2 offset-s6">
            <a href="#!" class="modal-close waves-effect waves-red btn-flat"
              >Cancel</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import * as AppWeb3 from "../../app/app.js";
import { mapState } from "vuex";
import { inject, provide, ref, watchEffect } from "vue";

export default {
  name: "EditEvent",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    activeInput: {
      type: Boolean,
      default: false,
    },
    activeInput: {
      type: String,
      default: "Event Edit",
    },
    showSelectArea: {
      type: Boolean,
      default: true,
    },
  },
  components: { Multiselect },
  data() {
    return {
      areasSelect: [],
    };
  },
  computed: {
    ...mapState(["account"]),
  },
  setup() {
    const eventEdit = inject("eventEdit");
    const load = inject("load");

    return { eventEdit, load };
  },
  methods: {
    async getAllAreasOfOwner() {
      let cantAreas = await AppWeb3.getLengthAreaOfOwner();
      let areas = await AppWeb3.getAllAreaOfOwner(0, cantAreas);

      for (let index = 0; index < areas.length; index++) {
        areas[index].value = areas[index].id;
        this.areasSelect.push(areas[index]);
      }
    },
    async editOrNew() {
      ///if activeInput is false == new event
      console.log(this.eventEdit);
      if (this.eventEdit.startEvent > this.eventEdit.endEvent) {
        M.toast({
          html:
            "La fecha final del evento no puede ser menor a la fecha de inicio",
          classes: "red accent-3",
        });
        return;
      }
      if (this.activeInput) {
        //edit

        let ep = await AppWeb3.editEvent(
          this.eventEdit.id,
          this.eventEdit.name,
          this.eventEdit.description,
          this.eventEdit.startEvent,
          this.eventEdit.endEvent,
          parseInt(this.eventEdit.area_id),
          this.eventEdit.state_id
        );
        if (!ep) {
          M.toast({
            html: "El evento contiene documentos no se puede modificar",
            classes: "red accent-3",
          });
        }
      } else {
        //new
        console.log(this.eventEdit.startEvent);
        await AppWeb3.addEvent(
          parseInt(this.eventEdit.area_id),
          this.eventEdit.name,
          this.eventEdit.description,
          this.eventEdit.startEvent,
          this.eventEdit.endEvent
        );
      }

      this.load = !this.load;
      var elem = document.getElementById(this.modalName);
      var modalInstance = M.Modal.getInstance(elem);
      modalInstance.close();
    },
  },
  mounted() {
    var elems = document.querySelectorAll("#" + this.modalName);
    // console.log(this.eventEdit.name);
    var instances = M.Modal.init(elems);
    // console.log(instances);
    var inputName = document.getElementById("name");
    var inputDescription = document.getElementById("description");
    var selects = document.querySelectorAll(".select");
    M.CharacterCounter.init(inputName);
    M.CharacterCounter.init(inputDescription);
    var selects = M.FormSelect.init(selects);

    this.getAllAreasOfOwner();
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

