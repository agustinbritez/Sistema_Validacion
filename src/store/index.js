import {
  createStore
} from 'vuex'
import * as AppWeb3 from "../app/app.js";


export default createStore({
  state: {
    account: '',
    isLoading:false,
  },
  mutations: {
    async connectAccount(state) {
      try {
        if (typeof window.ethereum === "undefined") {
          alert("you need install MetaMask");
        } else {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          state.account = accounts[0];
        }
      } catch (Ex) {
        state.account = "";
        console.log(Ex);
      }
      return state.account;

    },
    async verificationAccount(state) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        state.account = accounts[0];
      } catch (Ex) {
        state.account = "";
        console.log(Ex);

      }
      return state.account;

    },
    async getOrganitation() {
      let result = await AppWeb3.getOrganitation();
      return result;
    },
    async setOrganitation(name) {
      let result = await AppWeb3.setOrganitation(name, this.account);
      return result;
    }

  },
  actions: {},
  modules: {}
})