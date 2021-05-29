<template>
  <div class="container">
    <listEvents/>
  </div>
</template>
<script>
import listEvents from "../components/Event/listEvents.vue";
export default {
  name: "Events",
  components: {
    listEvents,
  },
};
</script>

