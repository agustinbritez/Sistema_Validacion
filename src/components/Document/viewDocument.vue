<template>
  <div>
    <div class="container">
      <div class="row" v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
        <div class="input-field col s4" v-if="!knowEvent || event_id2 == 0">
          <Multiselect
            class="selec"
            id="area_id"
            @change="getEventOfArea()"
            v-model="area_id"
            :options="areasSelect"
            label="name"
            placeholder="Seleccionar Área"
            trackBy="name"
            :disabled="disabledInput"
            :searchable="true"
          />
        </div>
        <div class="input-field col s4" v-if="!knowEvent || event_id2 == 0">
          <Multiselect
            class="selec"
            id="event_id"
            v-model="event_id"
            :options="eventsSelect"
            label="name"
            placeholder="Seleccionar un Evento"
            trackBy="name"
            :disabled="disabledInput"
            :searchable="true"
          />
        </div>
        <div class="input-field col s4">
          <Multiselect
            class="selec"
            id="state_id"
            v-model="state_id"
            :options="statesSelect"
            label="name"
            placeholder="Seleccionar un Estado"
            trackBy="name"
            :disabled="disabledInput"
            :searchable="true"
          />
        </div>
        <!-- <a class="btn deep-purple accent-2" @click="search()">
          <i class="material-icons">search</i>
        </a> -->
      </div>
      <div class="row" v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
        <div class="input-field col s4">
          <input
            id="expiration"
            type="datetime-local"
            class="form-control"
            v-model="expiration"
          />
          <label for="expiration" class="active">Fecha de Vencimiento</label>
        </div>
        <!-- <div class="input-field col s4">
          <input
            id="endEvent"
            type="datetime-local"
            class="form-control"
            v-model="endEvent"
          />
          <label for="endEvent" class="active">End Event</label>
        </div> -->
        <div class="input-field col s8">
          <input type="text" name="" id="reasonState" v-model="reasonState" />
          <label for="reasonState" class="active">Razón del Estado</label>
        </div>
      </div>
      <DropFile />
    </div>
    <div class="row">
      <div class="col s12">
        <ul class="tabs tabs-transparent">
          <li class="tab col s6 tab-verify">
            <a class="active" href="#tab_verify">Verificados</a>
          </li>
          <li class="tab col s6 tab-verify">
            <a href="#tab_nverify">No Verificados</a>
          </li>
        </ul>
      </div>
      <!-- VERIFY -->
      <div id="tab_verify" class="col s12">
        <br />
        <div class="row">
          <div class="col s10"></div>
          <div class="col s2">
            <button
              v-if="
                allHashes.length > 0 && (rol == 'OWNER_AREA' || rol == 'OWNER')
              "
              class="btn"
              @click="saveDocuments(true)"
            >
              Editar Todo
            </button>
          </div>
        </div>
        <table class="highlight centered">
          <thead>
            <tr>
              <th>Hash</th>
              <th>Nombre Archivo</th>

              <th>Estado</th>
              <th>Evento ID</th>
              <th class="hide-on-med-and-down">Nueva Versión</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="document in documentsArray.documentsExists"
              :key="document.idHash"
              class="row"
            >
              <td>{{ reduceHash(document.idHash) }}</td>

              <td>{{ document.fileName }}</td>
              <td>{{ document.state ? document.state.name : "" }}</td>
              <td>
                {{
                  document.event
                    ? document.event.name + " (" + document.event.id + ")"
                    : ""
                }}
              </td>
              <td class="hide-on-med-and-down">
                {{ document.newDocument ? "Yes" : "No" }}
              </td>
              <td>
                <div class="row" v-if="document.exists">
                  <a
                    href="#"
                    @click.prevent="documentViewModal(document)"
                    class="modal-trigger green-text text-accent-4"
                  >
                    <i class="blue-text text-accent-4 material-icons"
                      >visibility</i
                    ></a
                  >&nbsp;

                  <a
                    v-if="rol == 'OWNER_AREA' || rol == 'OWNER'"
                    href="#"
                    @click.prevent="openModalEdit(document)"
                    class="modal-trigger green-text text-accent-4"
                  >
                    <i class="material-icons">edit</i> </a
                  >&nbsp;

                  <a
                    v-if="rol == 'OWNER_AREA' || rol == 'OWNER'"
                    href="#"
                    @click.prevent="quitList(document.idHash)"
                    class="modal-trigger red-text text-accent-4"
                  >
                    <i class="material-icons">delete</i>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- NOT VERIFY -->
      <div id="tab_nverify" class="col s12">
        <br />
        <div class="row">
          <div class="col s10"></div>
          <div class="col s2">
            <button
              class="btn"
              v-if="
                allHashes.length > 0 && (rol == 'OWNER_AREA' || rol == 'OWNER')
              "
              @click="saveDocuments(false)"
            >
              Guardar Todo
            </button>
          </div>
        </div>
        <table class="highlight centered">
          <thead>
            <tr>
              <th>Hash</th>
              <th>Nombre del Archivo</th>

              <th v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="document in documentsArray.documentsNoExists"
              :key="document.idHash"
              class="row"
            >
              <td>{{ document.idHash }}</td>
              <td>{{ document.fileName }}</td>

              <td v-if="rol == 'OWNER_AREA' || rol == 'OWNER'">
                <a
                  href="#"
                  @click.prevent="quitList(document.idHash)"
                  class="modal-trigger red-text text-accent-4"
                >
                  <i class="material-icons">delete</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="verifyModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <div class="container left-align">
          <div class="row">
            <div class="input-field col s12">
              <p>Hash</p>
              <input
                readonly
                v-model="viewDocument.idHash"
                type="text"
                class="validate"
                placeholder="Placeholder"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <p>Nombre del Archivo</p>
              <input
                readonly
                v-model="viewDocument.fileName"
                type="text"
                class="validate"
              />
            </div>
            <div class="input-field col s2">
              <p>Estado</p>
              <input
                readonly
                v-model="viewDocument.stateCompleted"
                type="text"
                class="validate"
              />
            </div>
            <div class="input-field col s2">
              <p>Vencimiento</p>
              <input
                readonly
                v-model="viewDocument.expiration"
                type="text"
                class="validate"
              />
            </div>
            <div class="input-field col s4">
              <p>Razón del Estado</p>
              <input
                v-model="viewDocument.reasonState"
                type="text"
                class="validate"
              />
            </div>
          </div>
          <div class="input-field row">
            <div class="col s12">
              <p>
                Nueva Versión
                <a
                  v-if="viewDocument.newDocument"
                  href="#"
                  @click.prevent="documentNewVersion(viewDocument.newDocument)"
                  class="modal-trigger green-text text-accent-4"
                >
                  <i class="blue-text text-accent-4 material-icons"
                    >visibility</i
                  ></a
                >
              </p>
              <input
                readonly
                v-model="viewDocument.newDocument"
                type="text"
                class="validate"
              />
            </div>

            <div
              class="col"
              v-if="
                !viewDocument.newDocument &&
                (rol == 'OWNER_AREA' || rol == 'OWNER')
              "
            >
              <HashFile />
            </div>
            <div class="col">
              <a
                v-if="!viewDocument.newDocument && newDocumentHash.length > 0"
                @click.prevent="assignVersion(viewDocument.idHash)"
                href="#"
                class="btn-small blue"
                >Save</a
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <p>Evento</p>
              <input
                readonly
                v-model="viewDocument.eventCompleted"
                type="text"
                class="validate"
              />
            </div>

            <div class="input-field col s4">
              <p>Inicio del Evento</p>
              <input
                readonly
                v-model="viewDocument.event.startEvent"
                type="text"
                class="validate"
              />
            </div>
            <div class="input-field col s4">
              <p>Fin del Evento</p>
              <input
                readonly
                v-model="viewDocument.event.endEvent"
                type="text"
                class="validate"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <p>Área</p>
              <input
                readonly
                v-model="viewDocument.areaCompleted"
                type="text"
                class="validate"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <p>Organización</p>
              <input
                readonly
                v-model="organizacion"
                type="text"
                class="validate"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Ok</a
        >
      </div>
    </div>
    <EditDocument
      :modalName="modalEdit"
      :actionEdit="actionEdit"
      :nameModal="nameModal"
    />
  </div>
</template>

<script>
import { ref, provide, inject, reactive, watchEffect } from "vue";
import * as AppWeb3 from "../../app/app.js";
import DropFile from "./DropFile.vue";
import HashFile from "./HashFile.vue";
import Multiselect from "@vueform/multiselect";
import EditDocument from "./EditDocument.vue";

export default {
  components: {
    Multiselect,
    DropFile,
    HashFile,
    EditDocument,
  },
  //si conoce el evento no muestra el select Area ni el select events
  props: {
    knowEvent: {
      type: Boolean,
      default: false,
    },
    event_id: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    //sirve para saber si mostrar o no el select de evento
    let event_id2 = props.event_id;

    let documentEdit = inject("documentEdit");
    const uploadedFiles = inject("uploadedFiles");
    const rol = inject("rol");
    const allHashes = inject("allHashes");
    const newDocumentHash = ref({});
    provide("newDocumentHash", newDocumentHash);
    const reduceHash = inject("reduceHash");
    const documentsArray = inject("documentsArray");
    let documentChang = ref(true);
    provide("documentChang", documentChang);
    let viewDocument = reactive({
      idHash: "",
      event_id: 0,
      state_id: 0,
      reasonState: "",
      newVersion: "",
      expiration:"",
      state: {},
      event: {},
      area: {},
    });
    const assignVersion = async (idHash) => {
      if (newDocumentHash.value.length == 0) {
        alert("Up a file");
        return;
      }
      if (newDocumentHash.value[0] == idHash) {
        alert("The new Version is equal of document hash");
        return;
      }
      await AppWeb3.newVersionDocument(idHash, newDocumentHash.value[0]);
      documentsArray.value = await AppWeb3.getDocuments(
        allHashes.value,
        uploadedFiles.value
      );
      M.toast({ html: "Added new Version", classes: "green" });
      newDocumentHash.value = [];
      var elem = document.getElementById("verifyModal");
      var modalInstance3 = M.Modal.getInstance(elem);
      if (modalInstance3.isOpen) {
        modalInstance3.close();
      }
    };
    watchEffect(async () => {
      // console.log(allHashes.value);
      console.log(documentChang.value);
      documentsArray.value = await AppWeb3.getDocuments(
        allHashes.value,
        uploadedFiles.value
      );
      // console.log(documentsArray.value);
    });
    

    return {
      uploadedFiles,
      allHashes,
      documentsArray,
      viewDocument,
      reduceHash,
      documentEdit,
      event_id2,
      documentChang,
      newDocumentHash,
      assignVersion,
      rol,
    };
  },
  data() {
    return {
      area_id: 0,
      state_id: 0,
      reasonState: "",
      statesSelect: [],
      eventsSelect: [],
      areasSelect: [],
      organizacion:"",
      startEvent: "",
      expiration: "",
      endEvent: "",
      actionEdit: true,
      nameModal: "Edit Document",
      modalEdit: "editDocument",
    };
  },
  methods: {
    openModalEdit(documentEdit) {
      this.documentEdit.expiration = "";
      this.documentEdit.idHash = documentEdit.idHash;
      this.documentEdit.state_id = documentEdit.state_id;
      this.documentEdit.reasonState = documentEdit.reasonState;
      this.documentEdit.event_id = documentEdit.event_id;
      this.documentEdit.newDocument = documentEdit.newDocument;
      if (documentEdit.expiration) {
        this.documentEdit.expiration = documentEdit.expiration.toISOString().slice(0,19);
        // console.log(documentEdit.expiration.toISOString().slice(0,19),'Exirpatio2');
      }

      var elem = document.getElementById(this.modalEdit);
      // console.log('documentEdit2'+this.documentEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.actionEdit = true;
      this.nameModal = "Edit Document";
      modalInstance.open();
    },
    async search() {
      const self = this;
      let documentsHash = await AppWeb3.search({
        event_id: this.event_id,
        area_id: this.area_id,
        state_id: this.state_id,
        startEvent: this.startEvent,
        endEvent: this.endEvent,
        reasonState: this.reasonState,
      });
      // self.allHashes=[];
      // this.allHashes= [];
      console.log(documentsHash);
    },
    async documentViewModal(doc) {
      // console.log(idhash, filename);
      // let d = await AppWeb3.getDocuments([idhash], [{ fileName: filename }]);
      // console.log(d.documentsExists[0]);
      this.viewDocument.expiration = "";
      this.viewDocument.idHash = doc.idHash;
      this.viewDocument.state = doc.state;
      this.viewDocument.event = doc.event;
      this.viewDocument.event.startEvent = ((new Date(doc.event.startEvent).getDate())+'/'+(new Date(doc.event.startEvent).getMonth()+1)+'/'+(new Date(doc.event.startEvent).getFullYear())+' '+(new Date(doc.event.startEvent).getHours())+":"+(new Date(doc.event.startEvent).getMinutes()) );
      this.viewDocument.event.endEvent = ((new Date(doc.event.endEvent).getDate())+'/'+(new Date(doc.event.endEvent).getMonth()+1)+'/'+(new Date(doc.event.endEvent).getFullYear())+' '+(new Date(doc.event.endEvent).getHours())+":"+(new Date(doc.event.endEvent).getMinutes()) );
      this.viewDocument.area = doc.area;
      this.viewDocument.reasonState = doc.reasonState;
      this.viewDocument.fileName = doc.fileName;

      if (doc.expiration != "") {
        this.viewDocument.expiration = doc.expiration.toLocaleDateString();
      }
      this.viewDocument.newDocument = doc.newDocument;
      this.viewDocument.eventCompleted =
        this.viewDocument.event.name + " (" + this.viewDocument.event.id + ")";
      this.viewDocument.stateCompleted =
        this.viewDocument.state.name + " (" + this.viewDocument.state.id + ")";
      this.viewDocument.areaCompleted =
        this.viewDocument.area.name + " (" + this.viewDocument.area.id + ")";

      var elem = document.getElementById("verifyModal");
      var modalInstance3 = M.Modal.getInstance(elem);
      if (modalInstance3.isOpen) {
        modalInstance3.close();
      }
      modalInstance3.open();

      // console.log(modalInstance);
    },
    async documentNewVersion(idhash) {
      // console.log(idhash, filename);
      let d = await AppWeb3.getDocuments([idhash], [{ fileName: "" }]);
      // console.log(d.documentsExists[0]);
      this.viewDocument.expiration = "";
      this.viewDocument.idHash = d.documentsExists[0].idHash;
      this.viewDocument.state = d.documentsExists[0].state;
      this.viewDocument.event = d.documentsExists[0].event;
      if (d.documentsExists[0].expiration != "") {
        this.viewDocument.expiration = d.documentsExists[0].expiration.toISOString();
      }
      this.viewDocument.reasonState = d.documentsExists[0].reasonState;
      this.viewDocument.fileName = d.documentsExists[0].fileName;
      this.viewDocument.newDocument = d.documentsExists[0].newDocument;
      this.viewDocument.eventCompleted =
        this.viewDocument.event.name + " (" + this.viewDocument.event.id + ")";
      this.viewDocument.stateCompleted =
        this.viewDocument.state.name + " (" + this.viewDocument.state.id + ")";
      this.viewDocument.areaCompleted =
        this.viewDocument.area.name + " (" + this.viewDocument.area.id + ")";
      var elem = document.getElementById("verifyModal");
      var modalInstance3 = M.Modal.getInstance(elem);
      if (modalInstance3.isOpen) {
        modalInstance3.close();
      }
      modalInstance3.open();

      // console.log(modalInstance);
    },

    async saveDocuments(edit) {
      if (this.area_id <= 0) {
        M.toast({ html: "You have not selected the Area", classes: "red" });

        return 0;
      }
      if (this.event_id <= 0) {
        M.toast({ html: "You have not selected the Event", classes: "red" });

        return 0;
      }
      if (this.state_id <= 0) {
        M.toast({ html: "You have not selected the State", classes: "red" });

        return 0;
      }
      if (!edit) {
        await AppWeb3.addDocuments(
          this.allHashes,
          this.event_id,
          this.state_id,
          this.reasonState,
          this.expiration
        );
        this.documentChang = !this.documentChang;
        M.toast({ html: "Added", classes: "green" });
      } else {
        await AppWeb3.editDocuments(
          this.allHashes,
          this.event_id,
          this.state_id,
          this.reasonState,
          this.expiration
        );
        this.documentChang = !this.documentChang;
        M.toast({ html: "Updated", classes: "green" });

        // this.allHashes = [];
        // this.uploadedFiles = [];
      }
    },
    async quitList(item) {
      var i = this.allHashes.indexOf(item);
      // var j = this.documentsArray.documentsExists.indexOf(item);
      // if (j !== -1) {
      //   this.documentsArray.documentsExists.splice(j, 1);
      // } else {
      //   j = this.documentsArray.documentsNoExists.indexOf(item);
      //   if (j !== -1) {
      //     this.documentsArray.documentsNoExists.splice(j, 1);
      //   }
      // }
      if (i !== -1) {
        this.allHashes.splice(i, 1);
        this.uploadedFiles.splice(i, 1);
      }
    },
    async getStatesAll() {
      let states = await AppWeb3.getStatesAll();
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
      this.organizacion = await AppWeb3.getOrganitation();
    },
    async getEventOfArea() {
      let me = this;
      let events = await AppWeb3.getAllEvents(area_id);
      for (let index = 0; index < events.length; index++) {
        me.eventsSelect.push(events[index]);
      }
      me.eventsSelect = events;
    },
    async getAllAreasOfOwner() {
      let areas = await AppWeb3.getAllAreaOfOwner(0, -1);
      if (this.area_id == 0 && areas.length > 0) {
        this.area_id = areas[0].id;
      }
      for (let index = 0; index < areas.length; index++) {
        this.areasSelect.push(areas[index]);
      }
      if (this.area_id > 0) {
        await this.getEventOfArea();
      }
    },
  },
  async mounted() {
    await this.getStatesAll();
    await this.getAllAreasOfOwner();

    var tabs = document.querySelectorAll(".tabs");
    var options = {};
    var tabsInstance = M.Tabs.init(tabs, options);
    var modals = document.querySelectorAll(".modal");
    var modalnstance = M.Modal.init(modals, options);
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
