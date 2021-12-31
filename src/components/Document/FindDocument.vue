<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-title ">
          <h1 class="tile">Validación</h1>
          <!-- filter -->
          <div></div>
        </div>
        <div class="card-content">
          <ViewDocument />
        </div>
        <div class="card-action "></div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, provide, ref, watchEffect } from "vue";
import Pagination from "../elements/Pagination.vue";
import ViewDocument from "./viewDocument.vue";
import { getDocuments } from "../../app/app.js";

export default {
  name: "FindDocument",
  components: {
    Pagination,
    ViewDocument,
    // EditDocument,
    // DeleteModal,
    // NewDocument,
  },
  data() {
    return {};
  },
  setup(props) {
    const allHashes = inject("allHashes");
    const documentsArray = inject("documentsArray");

    return { allHashes, documentsArray };
  },
  mounted() {
    // var tabs = document.querySelectorAll(".tabs");
    // var options = {};
    // var tabsInstance = M.Tabs.init(tabs, options);
    // var modals = document.querySelectorAll(".modal");
    // var options = {};
    // var modalnstance = M.Modal.init(modals, options);
    // var tabs = document.querySelectorAll(".tabs");
    // var options = {};
    // var tabsInstance = M.Tabs.init(tabs, options);
  },
  methods: {
    async saveDocuments(hash, event_id) {
      if (event_id > 0) {
        await AppWeb3.addDocuments([hash], event_id, 1, "");
        this.allHashes = [];
        this.uploadedFiles = [];
      }
    },
  },
};
</script>