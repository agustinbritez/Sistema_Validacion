<template>
  <div class="inline">
    <!-- <DropUpload v-model="files" /> -->
    <!-- <input type="file" multiple name="" @change="changeFiles" id="" />
    <ul>
      <li class="" v-for="(file) in uploadedFiles" :key="file.hash"  >
        {{file.fileName + ' '+file.hash}}
      </li>
    </ul> -->
    <button class="btn-small" @click="activeUp()">Up Version</button>
    <input  hidden type="file" multiple name="" @change="changeFiles" id="fileHash" />
    <p>{{ allHashes.length > 0 ? "Exist" : "No Exist" }}</p>
  </div>
</template>
<script>
import { inject, watchEffect } from "vue";
import * as SHA256 from "../../../node_modules/js-sha256";
import * as AppWeb3 from "../../app/app.js";

export default {
  name: "DropFile",
  components: {},
  setup() {
    const allHashes = inject("newDocumentHash");
    watchEffect(async () => {
      let res = await AppWeb3.checkADocument(allHashes.value[0]);
      if (!res) {
        allHashes.value = [];
      }
    });
    return { allHashes };
  },
  data() {
    return {
      loading: false,
      limit: 1, // CAMBIAR ESTO SI SE PUEDE MAS DE 10 ARCHIVOS
      verifyCounter: 0,
      dragActive: false,
      cantFile: 0,
      loadingFile: 0,
    };
  },
  props: {
    value: [],
  },
  mounted() {
    this.loading = true;
  },
  methods: {
    activeUp(){
      document.getElementById('fileHash').click();
    },
    changeFiles(event) {
      this.loadingFile = 0;
      this.cantFile = event.target.files.length;
      // console.log(event);
      this.uploadFiles(event.target.files);
    },
    cargarFile() {},
    uploadFiles: async function (f) {
      this.allHashes = [];
      this.uploadedFiles = [];
      this.loading = true;

      for (var i = 0; i < f.length; i++) {
        await this.loadFile(f[i]);
        // console.log(f[i]);
      }
    },
    loadFile(file) {
      var self = this;
      let name = file.name;
      let reader = new FileReader();

      reader.onload = function (e) {
        if (self.uploadedFiles.length < self.limit) {
          let contents = e.target.result;
          let hash = SHA256.create();
          hash.update(contents);
          let hex = hash.hex();
          //Checks if already exists
          if (self.allHashes.indexOf(hex) === -1) {
            self.loadingFile++;
            self.uploadedFiles.push({
              fileName: name,
              hash: hex,
              exist: false,
            });
            self.allHashes.push(hex);
          } else {
            //file already uploaded
          }
          //self.uploadedFiles = self.getUnique(self.uploadedFiles, 'hash')
          self.limitSurpased(0);
        } else {
          self.limitSurpased(self.limit);
        }
        self.loading = false;
      };
      reader.readAsArrayBuffer(file, "UTF-8");
    },
    limitSurpased(value) {
      var self = this;
      // console.log(self.lb_19+self.limit+self.lb_20);
      self.$emit("limit-surpassed", value);
    },
  },
};
</script>