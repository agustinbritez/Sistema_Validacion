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
            <div class="row" v-if="!actionEdit">
              <div class="input-field col s12">
                <input
                  id="owner"
                  class="inputCounter"
                  type="text"
                  data-length="100"
                  v-model="areaEdit.owner"
                />
                <label for="owner" :class="{ active: actionEdit }"
                  >Propietario del Área
                </label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="name"
                  class="inputCounter"
                  type="text"
                  data-length="50"
                  v-model="areaEdit.name"
                />
                <label for="name" :class="{ active: actionEdit }">Nombre</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="description"
                  class="materialize-textarea"
                  data-length="250"
                  v-model="areaEdit.description"
                ></textarea>
                <label for="description" :class="{ active: actionEdit }">
                  Descripción</label
                >
              </div>
            </div>
              <div class="row">
                  <div class="input-field col s6">
                    <Multiselect
                      v-model="areaEdit.state_id"
                      :options="statesSelect"
                      label="name"
                      placeholder="Selecciones un estado"
                      trackBy="name"
                      :disabled="disabledInput"
                      :searchable="true"
                    />
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
              >Guardar</a
            >
          </div>
          <div class="col s2 offset-s6">
            <a href="#!" class="modal-close waves-effect waves-red btn-flat"
              >Cancelar</a
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
import * as Menssage from "../../app/menssage.js";
import { inject } from "vue";

export default {
  name: "EditEvent",
  props: ["modalName", "actionEdit", "nameModal"],
  components: { Multiselect },
  data() {
    return {
            statesSelect: [],

    };
  },
  computed: {},
  setup() {
    const areaEdit = inject("areaEdit");
    const loadList = inject("loadList");

    return { areaEdit, loadList };
  },
  methods: {
    async getStatesAll() {
      let states = await AppWeb3.getStatesAll();
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
    },
    async editOrNew() {
      ///if actionEdit is false == new event
      var elem = document.getElementById(this.modalName);
      var modalInstance = M.Modal.getInstance(elem);
      modalInstance.close();
      if (this.actionEdit) {
        //edit
        await AppWeb3.editArea(
          this.areaEdit.id,
          this.areaEdit.name,
          this.areaEdit.description,
          this.areaEdit.state_id
        );
        M.toast({ html: Menssage.updated() , classes: "green accent-3" });
      } else {
        //new
        console.log("Prueba");
        await AppWeb3.addArea(
          this.areaEdit.owner,
          this.areaEdit.name,
          this.areaEdit.description
        );
        M.toast({ html: Menssage.added(), classes: "green accent-3" });
      }

      this.loadList = !this.loadList;
     
    },
  },
  async mounted() {
    await this.getStatesAll();
    var elems = document.querySelectorAll("#" + this.modalName);
    // console.log(this.areaEdit.name);
    var instances = M.Modal.init(elems);
    // console.log(instances);
    var inputName = document.getElementById("name");
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>