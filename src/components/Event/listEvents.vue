<template>
  <div class="">
    <div class="card  ">
      <div class="card-title   ">
        <h1 class="tile">Eventos</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <div class="row">
          <button
            class="btn left waves-effect waves-light"
            @click="openModalNew()"
          >
            nuevo (+)
          </button>
        </div>
        <table class="highlight centered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th class="hide-on-med-and-down">Descripción</th>
              <th>ID Área</th>
              <th>Inicio de Evento</th>
              <th class="hide-on-med-and-down">Fin del Evento</th>
              <th class="hide-on-med-and-down">Cantidad Docs. </th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="event in eventsArray" :key="event.id">
              <td>{{ event.id }}</td>
              <td>{{ event.name }}</td>
              <td class="hide-on-med-and-down">{{ event.description }}</td>
              <td>{{ event.area_id }}</td>
              <td>{{ ((new Date(event.startEvent).getDate())+'/'+(new Date(event.startEvent).getMonth()+1)+'/'+(new Date(event.startEvent).getFullYear())+' '+(new Date(event.startEvent).getHours())+":"+(new Date(event.startEvent).getMinutes()) )|| "undate" }}</td>
              <td class="hide-on-med-and-down">
                {{  ((new Date(event.endEvent).getDate())+'/'+(new Date(event.endEvent).getMonth()+1)+'/'+(new Date(event.endEvent).getFullYear())+' '+(new Date(event.endEvent).getHours())+":"+(new Date(event.endEvent).getMinutes()) ) || "undate" }}
              </td>
              <td class="hide-on-med-and-down">{{ event.cantDocument }}</td>

              <td>
                <div class="row right">
                  <div class="col">
                    <router-link
                      :to="{ name: 'EventView', params: { id: event.id } }"
                      ><i class="blue-text text-accent-4 material-icons"
                        >visibility</i
                      ></router-link
                    >
                    &nbsp;
                  </div>
                  <div class="col">
                    <a
                      href="#"
                      @click.prevent="openModalEdit(event)"
                      class="modal-trigger green-text text-accent-4"
                    >
                      <i class="material-icons">edit</i> </a
                    >&nbsp;
                  </div>
                  <div class="col">
                    <a href="#" class="red-text text-accent-4"
                      ><i class="material-icons">delete_forever</i></a
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <EditEvent
          :modalName="modalEdit"
          :activeInput="activeInput"
          :nameModal="nameModal"
          :showSelectArea="showSelectArea"
        />
      </div>
      <div class="card-action   ">
        <Pagination />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { inject, provide, ref, watchEffect } from "vue";
import { mapState } from "vuex";
import Pagination from "../elements/Pagination.vue";
import * as AppWeb3 from "../../app/app.js";
import EditEvent from "./EditEvent.vue";

export default {
  name: "listEvents",
  components: {
    Pagination,
    EditEvent,
  },
  data() {
    return {
      modalEdit: "modalEdit",
      // eventEdit: {},
      activeInput: true,
      nameModal: "",
      showSelectArea: true,
    };
  },
  props: {
    area_id: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // const area_id = inject('area_id');

    const eventEdit = ref({});
    provide("eventEdit", eventEdit);

    const eventsArray = ref([]);
    provide("eventsArray", eventsArray);
    const pagination = ref({
      total: 0,
      current_page: 1,
      per_page: 1,
      //id elments
      from: 0,
      to: 10,
    });

    provide("pagination", pagination);
    let load = ref(false);
    provide("load", load);

    const listEvents = async function () {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      let events = await AppWeb3.getAllEvents(
        props.area_id,
        pagination.value.from,
        pagination.value.to
      );
      // console.log(this.account);
      eventsArray.value = events;
      // events.forEach(element => {
      //   console.log(element.name);

      // });
      return events;
    };

    // const c= this.listEvents();
    watchEffect(() => {
      console.log("watch " + pagination.value.current_page);
      console.log("load " + load.value);
      listEvents();
    });

    return { load, eventEdit, listEvents, eventsArray, pagination };
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {
    async getLengthEvents(_area_id) {
      let result = await AppWeb3.getLengthEventsOfArea(_area_id);
      return result;
    },
    async getEventsPages(_area_id) {
      let cantEvent = await this.getLengthEvents(_area_id);
      this.pagination.total = await parseInt(cantEvent / this.pagination.to);
      console.log("pagination " + this.pagination.total);
    },
    openModalEdit(_eventEdit) {
      this.showSelectArea = this.area_id == 0;
      this.eventEdit.name = _eventEdit.name;
      this.eventEdit.id = _eventEdit.id;
      this.eventEdit.area_id = _eventEdit.area_id;
      if (this.area_id > 0) {
        this.eventEdit.area_id = this.area_id;
      }

      this.eventEdit.description = _eventEdit.description;
      this.eventEdit.startEvent = _eventEdit.startEvent;
      this.eventEdit.endEvent = _eventEdit.endEvent;
      this.eventEdit.state_id = _eventEdit.state_id;

      var elem = document.getElementById(this.modalEdit);
      // console.log('eventEdit2'+this.eventEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.activeInput = true;
      this.nameModal = "Event Edit";
      modalInstance.open();
    },
    openModalNew() {
      this.showSelectArea = this.area_id == 0;
      this.eventEdit.name = "";
      this.eventEdit.id = 0;
      this.eventEdit.area_id = 0;
      this.eventEdit.state_id = 0;

      if (this.area_id > 0) {
        this.eventEdit.area_id = this.area_id;
      }

      this.eventEdit.description = "";
      this.eventEdit.startEvent = "";
      this.eventEdit.endEvent = "";
      var elem = document.getElementById(this.modalEdit);
      // console.log('eventEdit2'+this.eventEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.nameModal = "Event New";
      this.activeInput = false;
      modalInstance.open();
    },
    format(fecha){
      
    }
  },
  mounted() {
    this.eventsArray = this.listEvents();
    this.getEventsPages(this.area_id);
  },
  updated() {
    // this.listEvents();
  },
};
</script>