<template>
  <div>
    <div class="loader">
      <div class="preloader-wrapper big" :class="{ active: isLoading }">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "PreLoad",
  props: {
    color: String,
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  mounted() {
    console.log("loanding " + this.isLoading);
  },
};
</script>

<style scoped>
.loader {
  position: absolute;
  bottom: 50%;
  right: 50%;
}
/* .loader {
position: absolute;
top :0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
} */
</style>