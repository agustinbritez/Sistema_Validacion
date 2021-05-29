<template>
  <div>
    <!-- <DropUpload v-model="files" /> -->
    <!-- <input type="file" multiple name="" @change="changeFiles" id="" />
    <ul>
      <li class="" v-for="(file) in uploadedFiles" :key="file.hash"  >
        {{file.fileName + ' '+file.hash}}
      </li>
    </ul> -->

    <div class="file-field input-field">
      <div class="btn">
        <span >Documentos</span>
        <input type="file" multiple name="" @change="changeFiles" id="" />
      </div>
      <div class="file-path-wrapper">
        <input
          class="file-path validate black-text"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <ul>
      <li>
        {{ loadingFile + "/" + cantFile }}
      </li>
      <!-- <li class="" v-for="file in uploadedFiles" :key="file.hash">
        {{ file.fileName + " " + file.hash }}
      </li> -->
    </ul>
  </div>
</template>
<script>
import { inject } from "vue";
import * as SHA256 from "../../../node_modules/js-sha256";
import * as AppWeb3 from "../../app/app.js";

export default {
  name: "DropFile",
  components: {},
  setup() {
    const uploadedFiles = inject("uploadedFiles");
    const allHashes = inject("allHashes");

    return { uploadedFiles, allHashes };
  },
  data() {
    return {
      loading: false,
      limit: 10, // CAMBIAR ESTO SI SE PUEDE MAS DE 10 ARCHIVOS
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