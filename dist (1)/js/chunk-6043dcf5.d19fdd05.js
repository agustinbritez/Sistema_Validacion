(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6043dcf5"],{"5f20":function(e,t,n){"use strict";n.r(t);n("b0c0"),n("a4d3"),n("e01a");var a=n("7a23"),i={class:"container"},c={class:"card  "},s={class:"card-title   "},l={class:"tile"},r=Object(a["i"])("div",null,null,-1),d={class:"card-content"},o={class:"container"},u={class:"row"},v={class:"col s12"},b={class:"row"},m=Object(a["i"])("div",{class:"col s10"},null,-1),O={class:"col"},j=Object(a["i"])("i",{class:"material-icons"},"border_color",-1),p={class:"row"},h={class:"input-field col s12"},f=Object(a["i"])("label",{for:"name",class:"active"},"Nombre",-1),w={class:"row"},E={class:"input-field col s12"},x=Object(a["i"])("label",{for:"description",class:"active"}," Descripción",-1),g={class:"row"},A={class:"input-field col s6"},_=Object(a["i"])("label",{for:"startEvent",class:"active"},"Inicio del Evento",-1),V={class:"input-field col s6"},D=Object(a["i"])("label",{for:"endEvent",class:"active"},"Final del Evento",-1),k={class:"row"},I={class:"input-field col s6"},y=Object(a["i"])("label",{for:"state",class:"active"}," Estado ",-1),R={class:"input-field col s6"},N=Object(a["i"])("label",{for:"area_id",class:"active"}," Área",-1),S={class:"card-action   "},B={class:"row"},C={class:"col s6"},H={class:"col s6"},L=Object(a["i"])("br",null,null,-1);function z(e,t,n,M,z,J){var U=Object(a["z"])("Multiselect"),P=Object(a["z"])("ListDocuments");return Object(a["r"])(),Object(a["e"])("div",null,[Object(a["i"])("div",i,[Object(a["i"])("div",c,[Object(a["i"])("div",s,[Object(a["i"])("h1",l,"Evento "+Object(a["B"])(" ID: "+z.eventView.id),1),r]),Object(a["i"])("div",d,[Object(a["i"])("div",o,[Object(a["i"])("div",u,[Object(a["i"])("form",v,[Object(a["i"])("div",b,[m,Object(a["i"])("div",O,[Object(a["i"])("a",{href:"#",onClick:t[1]||(t[1]=Object(a["L"])((function(e){return J.cambiarInput()}),["prevent"]))},[j])])]),Object(a["i"])("div",p,[Object(a["i"])("div",h,[Object(a["J"])(Object(a["i"])("input",{id:"name",class:"inputCounter",disabled:z.disabledInput,type:"text","data-length":"50","onUpdate:modelValue":t[2]||(t[2]=function(e){return z.eventAux.name=e})},null,8,["disabled"]),[[a["E"],z.eventAux.name]]),f])]),Object(a["i"])("div",w,[Object(a["i"])("div",E,[Object(a["J"])(Object(a["i"])("textarea",{id:"description",class:"materialize-textarea","data-length":"250","onUpdate:modelValue":t[3]||(t[3]=function(e){return z.eventAux.description=e}),disabled:z.disabledInput},null,8,["disabled"]),[[a["E"],z.eventAux.description]]),x])]),Object(a["i"])("div",g,[Object(a["i"])("div",A,[Object(a["J"])(Object(a["i"])("input",{id:"startEvent",type:"datetime-local",class:"form-control",disabled:z.disabledInput,"onUpdate:modelValue":t[4]||(t[4]=function(e){return z.eventAux.startEvent=e})},null,8,["disabled"]),[[a["E"],z.eventAux.startEvent]]),_]),Object(a["i"])("div",V,[Object(a["J"])(Object(a["i"])("input",{id:"endEvent",type:"datetime-local",class:"form-control",disabled:z.disabledInput,"onUpdate:modelValue":t[5]||(t[5]=function(e){return z.eventAux.endEvent=e})},null,8,["disabled"]),[[a["E"],z.eventAux.endEvent]]),D])]),Object(a["i"])("div",k,[Object(a["i"])("div",I,[Object(a["i"])(U,{id:"state",modelValue:z.eventAux.state_id,"onUpdate:modelValue":t[6]||(t[6]=function(e){return z.eventAux.state_id=e}),options:z.statesSelect,label:"name",placeholder:"Select state",trackBy:"name",disabled:z.disabledInput,searchable:!0},null,8,["modelValue","options","disabled"]),y]),Object(a["i"])("div",R,[Object(a["i"])(U,{id:"area_id",modelValue:z.eventAux.area_id,"onUpdate:modelValue":t[7]||(t[7]=function(e){return z.eventAux.area_id=e}),options:z.areasSelect,label:"name",placeholder:"Select Area",trackBy:"name",disabled:z.disabledInput,searchable:!0},null,8,["modelValue","options","disabled"]),N])])])])])]),Object(a["i"])("div",S,[Object(a["i"])("div",B,[Object(a["i"])("div",C,[Object(a["i"])("button",{class:"btn indigo lighten-1",onClick:t[8]||(t[8]=Object(a["L"])((function(e){return J.saveEdit()}),["prevent"])),disabled:z.disabledInput}," Guardar ",8,["disabled"])]),Object(a["i"])("div",H,[Object(a["i"])("button",{class:"btn",onClick:t[9]||(t[9]=Object(a["L"])((function(e){return J.cancelEdit()}),["prevent"])),disabled:z.disabledInput}," Cancelar ",8,["disabled"])])])])]),L]),Object(a["i"])(P,{event_id:z.eventView.id},null,8,["event_id"])])}var J=n("1da1"),U=(n("96cf"),n("7f13")),P=n("6c02"),q=n("a306"),F={class:"container"},G={class:"card"},K=Object(a["i"])("div",{class:"card-title"},[Object(a["i"])("h1",{class:"tile"},"Documentos"),Object(a["i"])("div")],-1),Q={class:"card-content"},T={class:"row"},W={id:"table_id",class:"highlight centered"},X=Object(a["i"])("thead",null,[Object(a["i"])("tr",null,[Object(a["i"])("th",null,"Hash"),Object(a["i"])("th",null,"Estado"),Object(a["i"])("th",{class:"hide-on-med-and-down"},"Razón del Estado"),Object(a["i"])("th",null,"Evento ID"),Object(a["i"])("th",{class:"hide-on-med-and-down"},"Nueva Versión"),Object(a["i"])("th",null,"Acciones")])],-1),Y={class:"hide-on-med-and-down"},Z={class:"hide-on-med-and-down"},$={class:"row"},ee=Object(a["h"])("   "),te=Object(a["i"])("i",{class:"material-icons"},"edit",-1),ne=Object(a["h"])("  "),ae=Object(a["i"])("i",{class:"material-icons"},"delete_forever",-1),ie={id:"newDocument",class:"modal"},ce={class:"modal-content"},se=Object(a["i"])("div",{class:"modal-footer"},null,-1),le={class:"card-action"},re=Object(a["i"])("br",null,null,-1);function de(e,t,n,i,c,s){var l=Object(a["z"])("EditDocument"),r=Object(a["z"])("NewDocument"),d=Object(a["z"])("Pagination"),o=Object(a["z"])("DeleteModal");return Object(a["r"])(),Object(a["e"])("div",F,[Object(a["i"])("div",G,[K,Object(a["i"])("div",Q,[Object(a["i"])("div",T,[Object(a["i"])("button",{class:"btn left waves-effect waves-light",onClick:t[1]||(t[1]=function(e){return s.openModalNew()})}," Nuevo (+) ")]),Object(a["i"])("table",W,[X,Object(a["i"])("tbody",null,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(i.documentsArray,(function(e){return Object(a["r"])(),Object(a["e"])("tr",{key:e.idHash,class:"row"},[Object(a["i"])("td",null,Object(a["B"])(i.reduceHash(e.idHash)),1),Object(a["i"])("td",null,Object(a["B"])(e.state.name),1),Object(a["i"])("td",Y,Object(a["B"])(e.reasonState),1),Object(a["i"])("td",null,Object(a["B"])(e.event_id),1),Object(a["i"])("td",Z,Object(a["B"])(i.reduceHash(e.newDocument)),1),Object(a["i"])("td",null,[Object(a["i"])("div",$,[ee,Object(a["i"])("a",{href:"#",onClick:Object(a["L"])((function(t){return s.openModalEdit(e)}),["prevent"]),class:"modal-trigger green-text text-accent-4"},[te],8,["onClick"]),ne,Object(a["i"])("a",{href:"#",onClick:Object(a["L"])((function(t){return s.openDeleteElement(e.idHash)}),["prevent"]),class:"modal-trigger red-text text-accent-4"},[ae],8,["onClick"])])])])})),128))])]),Object(a["i"])(l,{modalName:c.modalEdit,actionEdit:c.actionEdit,nameModal:c.nameModal},null,8,["modalName","actionEdit","nameModal"]),Object(a["i"])("div",ie,[Object(a["i"])("div",ce,[Object(a["i"])(r,{event_id:n.event_id,knowEvent:!0},null,8,["event_id"])]),se])]),Object(a["i"])("div",le,[Object(a["i"])(d)])]),re,Object(a["i"])(o,{modalName:c.modalDelete,menssage:c.menssage,nameModal:"Document",element_id:c.element_id},null,8,["modalName","menssage","element_id"])])}n("a9e3");var oe=n("0f8e"),ue=n("868b"),ve=n("e6660"),be=n("ab71"),me={name:"ListDocument",components:{Pagination:oe["a"],EditDocument:ue["a"],DeleteModal:be["a"],NewDocument:ve["a"]},props:{event_id:{type:Number,default:0}},data:function(){return{modalDelete:"modalDelete",modalEdit:"editDocument2",actionEdit:!0,nameModal:"",menssage:"¿Do you want to delete it?",element_id:0}},setup:function(e){var t=Object(a["m"])("documentEdit"),n=Object(a["m"])("reduceHash"),i=Object(a["w"])([]),c=Object(a["w"])({total:0,current_page:1,per_page:1,from:0,to:10});Object(a["t"])("pagination",c);var s=Object(a["w"])(!1);Object(a["t"])("loadList",s);var l=Object(a["w"])("");Object(a["t"])("deleteElement",l);var r=function(){var t=Object(J["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e.event_id),t.next=3,U["n"](e.event_id,c.value.from,c.value.to);case 3:return n=t.sent,console.log(n),i.value=n,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(a["H"])((function(){console.log("watch "+c.value.current_page),console.log("loadList "+s.value),r()}));var d=function(){var e=Object(J["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,U["h"](l.value);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a["H"])(Object(J["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("deleteElement "+l.value),""==l.value){e.next=6;break}return e.next=4,d();case 4:return e.next=6,r();case 6:case"end":return e.stop()}}),e)})))),{deleteElement:l,loadList:s,reduceHash:n,documentEdit:t,listDocuments:r,documentsArray:i,pagination:c}},methods:{getDocumentsPages:function(){var e=this;return Object(J["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,U["q"](e.event_id);case 2:return n=t.sent,t.next=5,parseInt(n/e.pagination.to);case 5:e.pagination.total=t.sent,console.log("pagination "+e.pagination.total);case 7:case"end":return t.stop()}}),t)})))()},openModalEdit:function(e){this.documentEdit.idHash=e.idHash,this.documentEdit.state_id=e.state_id,this.documentEdit.reasonState=e.reasonState,this.documentEdit.event_id=e.event_id,this.documentEdit.newDocument=e.newDocument;var t=document.getElementById(this.modalEdit),n=M.Modal.getInstance(t);this.actionEdit=!0,this.nameModal="Edit Document",n.open()},openModalNew:function(){var e=document.getElementById("newDocument"),t=M.Modal.getInstance(e);this.nameModal="New Document",t.open()},openDeleteElement:function(e){var t=document.getElementById(this.modalDelete),n=M.Modal.getInstance(t);this.element_id=e,n.open()}},mounted:function(){this.listDocuments(),this.getDocumentsPages();var e=document.querySelectorAll(".modal");M.Modal.init(e)},updated:function(){}};me.render=de;var Oe=me,je=n("caf1"),pe={name:"Event",components:{Multiselect:q["a"],ListDocuments:Oe},setup:function(e){var t=Object(P["c"])(),n=t.params.id;return{area_id:n}},data:function(){return{eventView:{},eventAux:{},statesSelect:[],areasSelect:[],disabledInput:!0}},mounted:function(){var e=this;return Object(J["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=Object(P["c"])(),t.next=3,e.getStatesAll();case 3:return t.next=5,e.getAllAreasOfOwner();case 5:return t.next=7,U["s"](n.params.id);case 7:e.eventView=t.sent,e.eventAux.id=e.eventView.id,e.eventAux.name=e.eventView.name,e.eventAux.description=e.eventView.description,e.eventAux.startEvent=e.eventView.startEvent,e.eventAux.endEvent=e.eventView.endEvent,e.eventAux.state_id=e.eventView.state_id,e.eventAux.area_id=e.eventView.area_id;case 15:case"end":return t.stop()}}),t)})))()},methods:{getStatesAll:function(){var e=this;return Object(J["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,U["z"]();case 2:for(n=t.sent,a=0;a<n.length;a++)e.statesSelect.push(n[a]);case 4:case"end":return t.stop()}}),t)})))()},getAllAreasOfOwner:function(){var e=this;return Object(J["a"])(regeneratorRuntime.mark((function t(){var n,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,U["t"]();case 2:return n=t.sent,t.next=5,U["m"](0,n);case 5:for(a=t.sent,i=0;i<a.length;i++)a[i].value=a[i].id,e.areasSelect.push(a[i]);case 7:case"end":return t.stop()}}),t)})))()},cambiarInput:function(){this.disabledInput=!this.disabledInput,this.eventAux.id=this.eventView.id,this.eventAux.name=this.eventView.name,this.eventAux.description=this.eventView.description,this.eventAux.startEvent=this.eventView.startEvent,this.eventAux.endEvent=this.eventView.endEvent,this.eventAux.state_id=this.eventView.state_id,this.eventAux.area_id=this.eventView.area_id},cancelEdit:function(){this.cambiarInput()},saveEdit:function(){var e=this;return Object(J["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,U["k"](e.eventAux.id,e.eventAux.name,e.eventAux.description,e.eventAux.startEvent,e.eventAux.endEvent,e.eventAux.area_id,e.eventAux.state_id);case 2:n=t.sent,n?(e.eventView.id=e.eventAux.id,e.eventView.name=e.eventAux.name,e.eventView.description=e.eventAux.description,e.eventView.startEvent=e.eventAux.startEvent,e.eventView.endEvent=e.eventAux.endEvent,e.eventView.state_id=e.eventAux.state_id,e.eventView.area_id=e.eventAux.area_id,e.cambiarInput(),M.toast({html:je["d"](),classes:je["e"]()})):M.toast({html:je["b"](),classes:je["c"]()});case 4:case"end":return t.stop()}}),t)})))()}}};pe.render=z;t["default"]=pe},ab71:function(e,t,n){"use strict";var a=n("7a23"),i={class:"modal-content"},c=Object(a["i"])("hr",null,null,-1),s={class:"row"},l={class:"modal-footer"},r={class:"row"},d={class:"col s2"},o=Object(a["i"])("div",{class:"col s2 offset-s6"},[Object(a["i"])("a",{href:"#!",class:"modal-close waves-effect waves-red btn-flat"},"Cancelar")],-1);function u(e,t,n,u,v,b){return Object(a["r"])(),Object(a["e"])("div",null,[Object(a["i"])("div",{id:n.modalName,class:"modal"},[Object(a["i"])("div",i,[Object(a["i"])("h5",null,Object(a["B"])("Eliminar "+n.nameModal),1),c,Object(a["i"])("div",s,Object(a["B"])(n.menssage),1)]),Object(a["i"])("div",l,[Object(a["i"])("div",r,[Object(a["i"])("div",d,[Object(a["i"])("a",{id:"button-ok",onClick:t[1]||(t[1]=function(e){return b.ok()}),href:"#!",class:"modal-close waves-effect waves-green darken-1 btn-flat"},"Ok")]),o])])],8,["id"])])}var v=n("a306"),b=(n("7f13"),{name:"EditEvent",props:["modalName","nameModal","menssage","element_id"],components:{Multiselect:v["a"]},setup:function(){var e=Object(a["m"])("deleteElement");return{deleteElement:e}},data:function(){return{localValue:this.value}},methods:{ok:function(){this.deleteElement=this.element_id}},mounted:function(){var e=document.querySelectorAll("#"+this.modalName);M.Modal.init(e)}});n("d742");b.render=u;t["a"]=b}}]);
//# sourceMappingURL=chunk-6043dcf5.d19fdd05.js.map