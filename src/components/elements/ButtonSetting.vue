<template>
  <div>
    <a href="#" class="dropdown-trigger" data-target="dropdown-setting"
      ><i class="material-icons">more_vert</i></a
    >

    <ul id="dropdown-setting" class="dropdown-content">
      <li><a href="#!">one</a></li>
      <li><a href="#!">two</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">three</a></li>
      <li>
        <a href="#!"><i class="material-icons">view_module</i>four</a>
      </li>
      <li>
        <a href="#!"><i class="material-icons">cloud</i>five</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ButtonSetting.vue",
  mounted() {
      
  },
};
</script>