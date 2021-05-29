<template>
  <div>
    <!-- Modal Structure -->
    <!-- <a class="waves-effect waves-light btn modal-trigger" :href="'#'+modalName"
      >Modal</a
    > -->

    <!-- Modal Structure -->
    <div :id="modalName" class="modal">
      <div class="modal-content">
        <h5>{{ "Eliminar " + nameModal }}</h5>
        <hr />
        <div class="row">
          {{ menssage }}
        </div>
      </div>
      <div class="modal-footer">
        <div class="row">
          <div class="col s2">
            <a
              id="button-ok"
              @click="ok()"
              href="#!"
              class="modal-close waves-effect waves-green darken-1 btn-flat"
              >Ok</a
            >
          </div>
          <div class="col s2 offset-s6">
            <a
              href="#!"
              class="modal-close waves-effect waves-red btn-flat"
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
import { inject } from "vue";

export default {
  name: "EditEvent",
  props: ["modalName", "nameModal", "menssage","element_id"],
  components: { Multiselect },
  setup() {
    let deleteElement = inject("deleteElement");
    return { deleteElement };
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    ok() {
      this.deleteElement=this.element_id;
    }
  },
  mounted() {
    var elems = document.querySelectorAll("#" + this.modalName);
    var instances = M.Modal.init(elems);
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>