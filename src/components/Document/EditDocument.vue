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
              <div class="input-field col s12">
                <input
                  id="reson"
                  type="text"
                  v-model="documentEdit.reasonState"
                />
                <label for="reson" :class="{ active: actionEdit }"
                  >Reson State</label
                >
              </div>
            </div>
            <!-- <div class="row">
              <div class="input-field col s12">
                <input
                  id="newDocument"
                  type="text"
                  v-model="documentEdit.newDocument"
                />
                <label for="newDocument" :class="{ active: actionEdit }"
                  >New Version</label
                >
              </div>
            </div> -->

            <div class="row">
              <div class="input-field col s6">
                <Multiselect
                  class="selec"
                  v-model="documentEdit.state_id"
                  :options="statesSelect"
                  label="name"
                  placeholder="Seleccione su estado"
                  trackBy="name"
                  :disabled="disabledInput"
                  :searchable="true"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <Multiselect
                  class="selec"
                  v-model="documentEdit.event_id"
                  :options="eventSelect"
                  label="name"
                  placeholder="Select your event"
                  trackBy="name"
                  :disabled="disabledInput"
                  :searchable="true"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="expiration"
                  type="datetime-local"
                  class="form-control"
                  v-model="documentEdit.expiration"
                />
                <label for="expiration" class="active">Expiration</label>
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

    <!-- <div id="newDocument" class="modal">
      <div class="modal-content">
        <ViewDocument />
      </div>
      <div class="modal-footer"></div>
    </div> -->
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
      eventSelect: [],
    };
  },
  computed: {},
  setup() {
    const documentEdit = inject("documentEdit");
    const documentChang = inject("documentChang");
    const loadList = inject("loadList");

    return { documentEdit, loadList, documentChang };
  },
  methods: {
    async getStatesAll() {
      let states = await AppWeb3.getStatesAll();
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
    },
    async getAllEvents() {
      let events = await AppWeb3.getAllEvents();
      for (let index = 0; index < events.length; index++) {
        this.eventSelect.push(events[index]);
      }
    },
    async editOrNew() {
      ///if actionEdit is false == new event
      var elem = document.getElementById(this.modalName);
      var modalInstance = M.Modal.getInstance(elem);
      modalInstance.close();

      //edit
      await AppWeb3.editDocuments(
        [this.documentEdit.idHash],
        this.documentEdit.event_id,
        this.documentEdit.state_id,
        this.documentEdit.reasonState,
        this.documentEdit.expiration

      );
      this.documentChang = !this.documentChang;
      M.toast({ html: Menssage.updated(), classes: "green accent-3" });

      this.loadList = !this.loadList;
    },
  },
  async mounted() {
    await this.getStatesAll();
    await this.getAllEvents();
    var elems = document.querySelectorAll("#" + this.modalName);
    // console.log(this.documentEdit.name);
    var instances = M.Modal.init(elems);
    // console.log(instances);
    var inputName = document.getElementById("name");
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>