<template>
  <div>
    <ul class="pagination ">
      <li class="" v-if="pagination.current_page > 1">
        <a href="#!"
          ><i
            class="material-icons "
            @click.prevent="cambiarPagina(pagination.current_page - 1)"
            >chevron_left</i
          ></a
        >
      </li>
      <li
        class="waves-effect grey  "
        v-for="(from, index) in pagesNumber"
        :key="from"
        :class="[index + 1 == isActived ? 'active' : '']"
      >
        <a
          class="page-link "
          href="#"
          @click.prevent="cambiarPagina(index + 1)"
          v-text="index + 1"
        ></a>
      </li>
      <li
        class="waves-effect "
        v-if="pagination.current_page < pagination.total"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="cambiarPagina(pagination.current_page + 1)"
          ><i class="material-icons">chevron_right</i></a
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "Pagination",
  setup() {
    const pagination = inject("pagination");
    return { pagination };
  },
  data() {
    return {};
  },
  computed: {
    isActived: function () {
      return this.pagination.current_page;
    },

    //Calcula los elementos de la paginación
    pagesNumber: function () {
      let to = this.pagination.to;
      let from = 0;
      let total = this.pagination.total;
      //   console.log("from " + this.pagination.from);
      var pagesArray = [];
      pagesArray.push(from);
      for (let index = 0; index < total; index++) {
        from += to;
        pagesArray.push(from);
      }
      return pagesArray;
    },
  },
  methods: {
    cambiarPagina(page) {
      // console.log('page: '+page)
      let me = this;
      //Actualiza la página actual
      me.pagination.current_page = page;
      me.pagination.from = page * me.pagination.to - me.pagination.to;
      //   console.log(me.pagination.current_page);

      //Envia la petición para visualizar la data de esa página
      // me.listarTabla();
    },
  },
  mounted() {},
};
</script>