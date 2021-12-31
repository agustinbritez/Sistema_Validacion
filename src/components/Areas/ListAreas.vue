<template>
  <div class="container">
    <div class="card">
      <div class="card-title">
        <h1 class="tile">Áreas</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <div class="row">
          <button
            class="btn left waves-effect waves-light"
            @click="openModalNew()"
          >
            Nuevo (+)
          </button>
        </div>
        <table class="highlight centered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th class="hide-on-med-and-down">Descripción</th>
              <th>Cant Eventos</th>
              <th class="hide-on-med-and-down">Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="area in areasArray" :key="area.id" class="row">
              <td>{{ area.id }}</td>
              <td>{{ area.name }}</td>
              <td class="hide-on-med-and-down">{{ area.description }}</td>
              <td>{{ area.cantEvents }}</td>
              <td class="hide-on-med-and-down">{{ area.state.name }}</td>
              <td>
                <div class="row">
                  <!-- <router-link
                    :to="{ name: 'AreaView', params: { id: area.id } }"
                    ><i class="blue-text text-accent-4 material-icons"
                      >visibility</i
                    ></router-link> -->
                   <a
                    href="#"
                    @click.prevent=""
                  >
                    <i class="blue-text text-accent-4 material-icons" @click="switchView({view:'ViewArea',id:area.id})">visibility</i> </a
                  >
                  
                  &nbsp;

                  <a
                    href="#"
                    @click.prevent="openModalEdit(area)"
                    class="modal-trigger green-text text-accent-4"
                  >
                    <i class="material-icons">edit</i> </a
                  >&nbsp;

                  <a
                    href="#"
                    @click.prevent="openDeleteElement(area.id)"
                    class="modal-trigger red-text text-accent-4"
                    ><i class="material-icons">delete_forever</i></a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <EditArea
          :modalName="modalEdit"
          :actionEdit="actionEdit"
          :nameModal="nameModal"
        />
      </div>
      <div class="card-action">
        <Pagination />
      </div>
    </div>
    <br />
    <DeleteModal
      :modalName="modalDelete"
      :menssage="menssage"
      nameModal="Area"
      :element_id="element_id"
    />
  </div>
</template>

<script>
import { provide, ref, watchEffect } from "vue";
import { mapMutations, mapState } from "vuex";
import Pagination from "../elements/Pagination.vue";
import * as AppWeb3 from "../../app/app.js";
import EditArea from "./EditArea.vue";
import DeleteModal from "../elements/DeleteModal.vue";

export default {
  name: "listAreas",
  components: {
    Pagination,
    EditArea,
    DeleteModal,
  },
  computed:{
    ...mapState(["account", "isLoading","current"]),
  }
  ,
  data() {
    return {
      modalDelete: "modalDelete",
      //ID of modal
      modalEdit: "modalEditArea",
      // areaEdit: {},
      actionEdit: true,
      nameModal: "",
      menssage: "¿Desea Eliminarlo?",
      element_id: 0,
    };
  },
  setup() {
    const areaEdit = ref({});
    provide("areaEdit", areaEdit);

    const areasArray = ref([]);
    provide("areasArray", areasArray);
    const pagination = ref({
      total: 0,
      current_page: 1,
      per_page: 1,
      //id elments
      from: 0,
      to: 10,
    });

    provide("pagination", pagination);
    let loadList = ref(false);

    provide("loadList", loadList);

    let deleteElement = ref(0);
    provide("deleteElement", deleteElement);

    const listAreas = async function () {
      let array = await AppWeb3.getAllAreaOfOwner(
        pagination.value.from,
        pagination.value.to
      );
      areasArray.value = array;

      return array;
    };

    // const c= this.listAreas();
    watchEffect(() => {
      console.log("watch " + pagination.value.current_page);
      console.log("loadList " + loadList.value);
      listAreas();
    });

    const deleteElementSelect = async () => {
      await AppWeb3.deleteArea(deleteElement.value);
    };

    watchEffect(async () => {
      console.log("deleteElement " + deleteElement.value);
      if (deleteElement.value > 0) {
        await deleteElementSelect();
        await listAreas();
      }
    });

    return {
      deleteElement,
      loadList,
      areaEdit,
      listAreas,
      areasArray,
      pagination,
    };
  },
  methods: {
    ...mapMutations(["switchComponent","switchView"]),

    // switchView: function (view,id) {  
    //   switchId(id);
    //   switchComponent(view);
    // },
    async getLengthAreaOfOwner() {
      let result = await AppWeb3.getLengthAreaOfOwner();
      return result;
    },
    async getAreasPages() {
      let cant = await this.getLengthAreaOfOwner();
      this.pagination.total = await parseInt(cant / this.pagination.to);
      console.log("pagination " + this.pagination.total);
    },
    openModalEdit(areaEdit) {
      this.areaEdit.name = areaEdit.name;
      this.areaEdit.id = areaEdit.id;
      this.areaEdit.description = areaEdit.description;
      this.areaEdit.state_id = areaEdit.state_id;

      var elem = document.getElementById(this.modalEdit);
      // console.log('areaEdit2'+this.areaEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.actionEdit = true;
      this.nameModal = "Editar Área";
      modalInstance.open();
    },
    openModalNew() {
      this.areaEdit.name = "";
      this.areaEdit.id = 0;
      this.areaEdit.description = "";
      this.areaEdit.owner = "";
      this.areaEdit.state_id = 0;
      var elem = document.getElementById(this.modalEdit);
      // console.log('areaEdit2'+this.areaEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.nameModal = "Nueva Área";
      this.actionEdit = false;
      modalInstance.open();
    },
    openDeleteElement(_id) {
      var elem = document.getElementById(this.modalDelete);
      var modalInstance = M.Modal.getInstance(elem);
      this.element_id = _id;
      modalInstance.open();
    },
  },
  mounted() {
    this.areasArray = this.listAreas();
    this.getAreasPages();
  },
  updated() {
    // this.listAreas();
  },
};
</script>