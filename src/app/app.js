import * as Parameters from "./parameters.js";
import * as Organitation from "./Organitation.js";
import * as Event from "./Event.js";
import * as Area from "./Area.js";
import * as State from "./State.js";
import * as Document from "./Document.js";

import {
    CONST_ABI
} from "./abi.js";

// aplicacion para la conexión con la blockchain 
const Web3 = require("web3");
let web3 = new Web3( Web3.givenProvider || new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/448d24f73f314a188b6e8bf7cdcd0f7b'
));
// let web3 = new Web3(Web3.givenProvider || Parameters.provider);

const miContrato = new web3.eth.Contract(CONST_ABI, Parameters.addressContract_Test);
///************************Organitation***************************** */

export async function setOrganitation(_name, _from = 0) {
    return await Organitation.setOrganitation(_name, _from, miContrato);
}
export  function getOrganitation() {
    return  Organitation.getOrganitation( miContrato);
}
export  function getOwnerOrg() {
    return  Organitation.getOwnerOrg( miContrato);
}
export  function setOwner(new_owner) {
    return  Organitation.setOwner(new_owner,miContrato);
}

//**************************Event************************************* */

export async function getAllEvents(_area_id = 0, _from = 0, _to = -1) {
    if (typeof window.ethereum !== "undefined") {
        if (_area_id > 0) {

            return await Event.getAllEventsOneArea(_area_id, _from, _to, miContrato);
        } else {
    
            return await Event.getAllEvents(miContrato);
        }
    }
    return [];
    
}
export async function addEvent(_area_id, _name, _description, startDate, endDate) {
    return await Event.addEvent(_area_id, _name, _description, startDate, endDate, miContrato);
}
export async function getEvent(_event_id) {
    return await Event.getEvent(_event_id, miContrato);
}
export async function editEvent(_event_id, _name, _description, startDate, endDate, area_id, sate_id) {
    return await Event.editEvent(_event_id, _name, _description, startDate, endDate, area_id, sate_id, miContrato);
}
export async function getEventOfArea(_from, _to) {
    return await Event.getEventOfArea(_from, _to, miContrato);
}
export async function getLengthEventsOfArea(_area_id) {
    return await Event.getLengthEventsOfArea(_area_id, miContrato);
}


//****************************Areas********************************** */
export async function getAllAreaOfOwner(_from, _to) {
    if (typeof window.ethereum !== "undefined") {
    
        return await Area.getAllAreaOfOwner(_from, _to, miContrato);
    }
    return [];
}

export async function getLengthAreaOfOwner() {
    return await Area.getLengthAreaOfOwner(miContrato);
}
export async function getArea(_id) {
    return await Area.getArea(_id, miContrato);
}
export async function addArea(_owner, _name, _description) {
    return await Area.addArea(_owner, _name, _description, miContrato);
}
export async function editArea(_id_area, _name, _description, state_id) {
    return await Area.editArea(_id_area, _name, _description, state_id, miContrato);
}
export async function changeOwnerArea(_id_area, _owner) {
    return await Area.changeOwnerArea(_id_area, _owner, miContrato);
}
export async function deleteArea(_id_area) {
    return await Area.deleteArea(_id_area, miContrato);
}
//**************************** States ********************************** */
export async function getStatesAll() {
    if (typeof window.ethereum !== "undefined") {
    
        return await State.getStatesAll(miContrato);
    }
    return [];
}
export async function getState(_id) {
    return await State.getState(_id,miContrato);
}
export async function addState(name,mean) {
    return await State.addState(name,mean,miContrato);
}
export async function editState(_id,name,mean) {
    return await State.editState(_id,name,mean,miContrato);
}


//**************************** Document ********************************** */
export async function addDocuments(arrayDocuments, _event_id, _state_id, __reasonState,_expiration = 0) {
    return await Document.addDocuments(arrayDocuments, _event_id, _state_id, __reasonState,_expiration, miContrato);
}
export async function editDocuments(arrayDocuments, _event_id, _state_id, __reasonState,_expiration = 0) {
    return await Document.editDocuments(arrayDocuments, _event_id, _state_id, __reasonState,_expiration , miContrato);
}

export async function checkDocuments(arrayHashes, arrayDocuments) {
    return await Document.checkDocuments(arrayHashes, arrayDocuments, miContrato);
}
export async function checkADocument(hash) {
    return await Document.checkADocument(hash, miContrato);
}
export async function newVersionDocument(hash_old, hash_new) {
    return await Document.newVersionDocument(hash_old, hash_new, miContrato);
}

export async function getAllDocuments(_event_id = 1, _state_id = -1, _newVersion = -1, _from = 0, _to = 10) {
    return await Document.getAllDocumentsEvent(_event_id, _from, _to, miContrato);
}


export async function getCantDocumentEvent(_event_id = 1) {
    return await Document.getCantDocumentEvent(_event_id, miContrato);
}
export async function deleteDocument(_idHash) {
    return await Document.deleteDocument(_idHash, miContrato);
}
export async function getDocuments(hashes, uploadedFiles) {
    return await Document.getDocuments(hashes, uploadedFiles, miContrato);
}
export async function search(filter) {
    return await Document.search(filter, miContrato);
}
//OWNER , OWNER_AREA
// export async function getRol() {
//     const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//     });
//     const account = accounts[0];
//     //array de boolean en la misma posicion devuelve si existe o no
//     let res = await miContrato.methods.getOwnerOrg()
//         .call((err, result) => {
//             (account == result) ? result: '';
//         });
//     if (res != '') {
//         return "OWNER";
//     }
//     return await miContrato.methods.getLengthAreaOfOwner(account)
//         .call((err, result) => {
//             (result > 0) ? "OWNER_AREA" : '';
//         });

// }
export function getRol() {

    return ethereum.request({
        method: "eth_requestAccounts",
    }).then((accounts) => {
        console.log('accounts' + accounts[0]);
        let account = accounts[0];

        return miContrato.methods.getOwnerOrg()
            // .call((err,res)=>res).then((ownerOrg) => {
            .call().then((ownerOrg) => {

                console.log('ownerOrg' + ownerOrg);
                console.log(ownerOrg.toUpperCase() == (account.toUpperCase()));

                if (ownerOrg.toUpperCase() == (account.toUpperCase())) {
                    return "OWNER";
                }

                return miContrato.methods.getLengthAreaOfOwner(account)
                    .call().then((ownerArea) => {

                        console.log('3' + ownerArea);
                        if (ownerArea > 0) {
                            return "OWNER_AREA";
                        }
                        return "";


                    });
            });


    });

    //array de boolean en la misma posicion devuelve si existe o no
}