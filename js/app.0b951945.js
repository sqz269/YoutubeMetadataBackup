(function(t){function e(e){for(var a,n,r=e[0],l=e[1],c=e[2],d=0,p=[];d<r.length;d++)n=r[d],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&p.push(i[n][0]),i[n]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],a=!0,r=1;r<s.length;r++){var l=s[r];0!==i[l]&&(a=!1)}a&&(o.splice(e--,1),t=n(n.s=s[0]))}return t}var a={},i={app:0},o=[];function n(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=a,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(s,a,function(e){return t[e]}.bind(null,a));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;o.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("cd49")},"122a":function(t,e,s){},"5aea":function(t,e,s){},cd49:function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a,i,o,n=s("2b0e"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"},[s("Header",{attrs:{"current-route":t.route}}),s("Home",{class:{"d-none":t.route&&"Home"!==t.route}}),s("Backup",{class:{"d-none":"Backup"!==t.route}}),s("Search",{class:{"d-none":"Search"!==t.route}}),s("Settings",{class:{"d-none":"Settings"!==t.route},attrs:{initialApiKey:this.currentApiKey},on:{settingsChanged:t.onSettingsChanged}}),s("Footer")],1)},l=[],c=(s("ac1f"),s("1276"),s("5aea"),s("122a"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"mb-auto"},[s("div",[s("h3",{staticClass:"float-md-start mb-0"},[t._v("Playlist Backup")]),s("nav",{staticClass:"nav nav-masthead justify-content-center float-md-end"},[s("a",{staticClass:"nav-link",class:{active:!t.currentRoute||"Home"===t.currentRoute},attrs:{id:"nav-location-home",href:"#Home"}},[t._v("Home")]),s("a",{staticClass:"nav-link",class:{active:"Backup"===t.currentRoute},attrs:{id:"nav-location-backup",href:"#Backup"}},[t._v("Backup")]),s("a",{staticClass:"nav-link",class:{active:"Search"===t.currentRoute},attrs:{id:"nav-location-search",href:"#Search"}},[t._v("Search")]),s("a",{staticClass:"nav-link",class:{active:"Settings"===t.currentRoute},attrs:{id:"nav-location-settings",href:"#Settings"}},[t._v("Settings")])])])])}),u=[],d={name:"Header.vue",props:{currentRoute:String}},p=d,h=s("2877"),v=Object(h["a"])(p,c,u,!1,null,null,null),f=v.exports,m=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"mt-auto text-white-50"})},b=[],g={name:"Footer"},y=g,w=Object(h["a"])(y,m,b,!1,null,null,null),C=w.exports,_=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},R=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{staticClass:"px-3",attrs:{id:"view-home"}},[s("h1",[t._v("Backup Your Youtube Playlist")]),s("p",{staticClass:"lead"},[t._v("Tried of seeing Youtube video wiped without a trace? Spending too much time searching for that Unavailable Video? Now you can backup all the videos's metadata just in case if the video disappears.")]),s("p",{staticClass:"lead"},[s("a",{staticClass:"btn btn-lg btn-secondary fw-bold border-white bg-white",attrs:{href:"#Backup"}},[t._v("Backup Playlist")])]),s("p",{staticClass:"lead"},[s("a",{staticClass:"btn btn-lg btn-secondary fw-bold border-white bg-white",attrs:{href:"#Search"}},[t._v("Retrieve Data")])])])}],I={name:"Home"},A=I,P=Object(h["a"])(A,_,R,!1,null,null,null),S=P.exports,M=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("main",{staticClass:"px-3 mb-a-lot",attrs:{id:"view-backup"}},[s("h3",[t._v("Backup Playlist")]),s("hr",{staticClass:"my-4"}),s("p",{staticClass:"lead"},[t._v("Enter Playlist's URL or ID")]),s("div",{staticClass:"input-group input-group-lg sharp-corners mb-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.playlistUrl,expression:"playlistUrl"}],staticClass:"form-control text-input",attrs:{id:"backup-input",type:"text",placeholder:"Playlist ID or URL"},domProps:{value:t.playlistUrl},on:{input:function(e){e.target.composing||(t.playlistUrl=e.target.value)}}}),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-lg btn-outline-secondary",attrs:{type:"button"},on:{click:t.backupPlaylist}},[t._v("Backup")])])]),s("div",{staticClass:"d-flex align-items-center mt-4",class:{"d-none":!t.showStatus},attrs:{id:"backup-status"}},[s("p",{staticClass:"lead status-message",class:{"text-danger":this.statusIsError}},[t._v(" "+t._s(t.statusMessage)+" "),s("a",{staticClass:"text-link-simple",class:{"d-none":!this.showDetailsBtn},on:{click:t.showModal}},[t._v("Details")])]),s("div",{staticClass:"spinner-border ms-auto",class:{"d-none":!t.processing},attrs:{role:"status","aria-hidden":"true"}})])]),s("BackupResultModal",{attrs:{"show-modal":this.showDetailsModal,"api-response":this.lastApiResp},on:{close:t.closeModal}})],1)},x=[];s("159b"),s("99af"),s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d");(function(t){function e(t,e){try{var s=new URL(t);return s.searchParams.get(e)}catch(a){return null}}function s(t){var e,s="; "+document.cookie,a=s.split("; "+t+"=");if(2===a.length)return null===(e=a.pop())||void 0===e?void 0:e.split(";").shift()}function a(t,e){document.cookie=t+"="+e+"; expires=Fri, 31 Dec 2037 23:59:59 GMT"}function i(e){if(!e)return{type:null,id:null};var s=t.GetQueryParams(e,"list");if(s)return{type:"playlist",id:s};var a=t.GetQueryParams(e,"v");return a?{type:"video",id:a}:11===e.length||11===e.split(",")[0].length?{type:"video",id:e}:{type:"playlist",id:e}}t.GetQueryParams=e,t.GetCookie=s,t.SetCookie=a,t.DetermineIdType=i})(a||(a={})),function(t){function e(t,e,s){return void 0===e&&(e=""),void 0===s&&(s=["snippet"]),gapi.client.youtube.playlistItems.list({part:s,maxResults:50,pageToken:e,playlistId:t})}function s(t,a,i,o,n){void 0===o&&(o=[]),void 0===n&&(n=void 0),e(t,n).then((function(e){var r,l;n=e.result.nextPageToken,e.result.items?o.push.apply(o,e.result.items):console.log("No Items in the result set??"),(null===(r=e.result.pageInfo)||void 0===r?void 0:r.totalResults)&&i&&i(o.length,null===(l=e.result.pageInfo)||void 0===l?void 0:l.totalResults),n?s(t,a,i,o,n):a(o)}),(function(t){console.error("Error fetching playlist: "+t.result.error.message)}))}t.GetPlaylistDetails=e,t.FetchPlaylistItems=s}(i||(i={})),function(t){function e(t,e,s){var a=new XMLHttpRequest;a.open("POST",t),a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE){var t=JSON.parse(a.responseText);s(t)}},a.send(JSON.stringify(e))}function s(t,e,s){var a=new XMLHttpRequest;a.open("POST",t),a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE){var t=JSON.parse(a.responseText);s(t)}},a.send(JSON.stringify(e))}t.BackupVideos=e,t.RetrieveListOfVideos=s}(o||(o={}));var k=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal fade",attrs:{id:"backupResultModal","aria-hidden":"true","aria-labelledby":"backupResultModalLabel",tabindex:"-1"},on:t._d({},["hide.bs.modal",t.propagateClose])},[s("div",{staticClass:"modal-dialog modal-lg"},[s("div",{staticClass:"modal-content modal-dark"},[t._m(0),s("div",{staticClass:"modal-body"},[this.apiResponse.response?s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("p",{staticClass:"lead"},[t._v("Total Items Processed: "+t._s(this.apiResponse.response.totalItemProcessed))])]),s("div",{staticClass:"col-6"},[s("div",{staticClass:"scrollable-table"},[s("table",{staticClass:"table table-dark",staticStyle:{"max-height":"400px"}},[s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("Added "+t._s(this.apiResponse.response.addedVideoIds.length))])])]),s("tbody",t._l(this.apiResponse.response.addedVideoIds,(function(e){return s("tr",[s("td",[t._v(t._s(e))])])})),0)])])]),s("div",{staticClass:"col-6"},[s("div",{staticClass:"scrollable-table",staticStyle:{"max-height":"400px"}},[s("table",{staticClass:"table table-dark"},[s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("Failed ("+t._s(this.apiResponse.response.failedVideoIds.length)+")")])])]),s("tbody",t._l(this.apiResponse.response.failedVideoIds,(function(e){return s("tr",[s("td",[t._v(t._s(e))])])})),0)])])])]):t._e()])])])])},D=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title",attrs:{id:"backupResultModalLabel"}},[t._v("Backup Result")]),s("button",{staticClass:"btn-close",attrs:{"aria-label":"Close","data-bs-dismiss":"modal",type:"button"}})])}],E={name:"BackupResultModal",props:{showModal:Boolean,apiResponse:{}},methods:{propagateClose:function(){this.$emit("close")}},watch:{showModal:function(){var t=new bootstrap.Modal(document.getElementById("backupResultModal"),{});this.showModal?t.show():t.hide()},apiResponse:function(){}}},O=E,B=Object(h["a"])(O,k,D,!1,null,null,null),j=B.exports,L={name:"Backup",components:{BackupResultModal:j},data:function(){return{playlistUrl:"",showStatus:!1,processing:!1,statusMessage:"",statusIsError:!1,showDetailsBtn:!1,showDetailsModal:!1,lastApiResp:!1}},methods:{closeModal:function(){this.showDetailsModal=!1},showModal:function(){this.showDetailsModal=!0},backupPlaylist:function(){var t={endpoint:"".concat(window.apiEndpointDomain,"/api/youtube/videos/add"),method:"POST"};this.showStatus=!0,this.processing=!0,this.statusIsError=!1,this.statusMessage="Please Wait ...",this.showDetailsBtn=!1;var e=a.GetQueryParams(this.playlistUrl,"list")||this.playlistUrl;if(!e)return this.statusMessage="ERROR: Please Enter a playlist URL or ID",this.statusIsError=!0,void(this.processing=!1);var s=this;i.FetchPlaylistItems(e,(function(e){var a=[];e.forEach((function(t){a.push(t.snippet.resourceId.videoId)})),s.statusMessage="Please wait warmly while the server is processing our request",s.processing=!0,o.BackupVideos(t.endpoint,a,(function(t){t.error?(s.statusMessage=t.errorMessage,s.statusIsError=!0,s.processing=!1):(s.lastApiResp=t,s.statusMessage="Completed.",s.processing=!1,s.showDetailsBtn=!0,s.showDetailsModal=!0)}))}),(function(t,e){s.statusMessage="Fetching Playlist Items. (".concat(t,"/").concat(e,")")}))}}},K=L,U=Object(h["a"])(K,M,x,!1,null,null,null),V=U.exports,T=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("main",{staticClass:"px-3 mb-a-lot",attrs:{id:"view-search"}},[s("h3",[t._v("Search Youtube Video")]),s("hr",{staticClass:"my-4"}),s("p",{staticClass:"lead"},[t._v("Enter Playlist/Video's URL or ID")]),s("div",{staticClass:"input-group input-group-lg sharp-corners mb-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.targetData,expression:"targetData"}],staticClass:"form-control text-input",attrs:{id:"search-input",type:"text",placeholder:"ID or URL"},domProps:{value:t.targetData},on:{input:function(e){e.target.composing||(t.targetData=e.target.value)}}}),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-lg btn-outline-secondary",attrs:{type:"button"},on:{click:t.searchVideo}},[t._v("Search")])])]),s("div",{staticClass:"d-flex align-items-center mt-4",class:{"d-none":!t.showStatus},attrs:{id:"backup-status"}},[s("p",{staticClass:"lead status-message",class:{"text-danger":this.statusIsError}},[t._v(" "+t._s(t.statusMessage)+" "),s("a",{staticClass:"text-link-simple",class:{"d-none":!this.showDetailsBtn},on:{click:t.showModal}},[t._v("View")])]),s("div",{staticClass:"spinner-border ms-auto",class:{"d-none":!t.processing},attrs:{role:"status","aria-hidden":"true"}})])]),s("SearchResultModal",{attrs:{"show-modal":this.showDetailsModal,"api-response":this.lastApiResp},on:{close:t.closeModal}})],1)},N=[],$=(s("a4d3"),s("e01a"),s("5319"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal fade",attrs:{id:"searchResultModal","aria-hidden":"true","aria-labelledby":"searchResultModalLabel",tabindex:"-1"},on:t._d({},["hide.bs.modal",t.propagateClose])},[s("div",{staticClass:"modal-dialog modal-fullscreen"},[s("div",{staticClass:"modal-content modal-dark"},[t._m(0),s("div",{staticClass:"modal-body"},[this.apiResponse.response?s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("button",{staticClass:"btn btn-outline-secondary w-100",on:{click:this.exportAsCSV}},[t._v("Export as CSV")])]),s("div",{staticClass:"col-md-6"},[s("button",{staticClass:"btn btn-outline-secondary w-100",on:{click:this.exportAsJSON}},[t._v("Export as JSON")])]),s("hr",{staticClass:"my-4"}),s("div",{staticClass:"col-12"},[s("p",{staticClass:"lead"},[t._v("Recorded: "+t._s(this.apiResponse.response.videos.length))])]),s("div",{staticClass:"col-12"},[s("div",{staticClass:"table-responsive w-100 scrollable-table",staticStyle:{"max-height":"50vh"}},[s("table",{staticClass:"table table-dark"},[t._m(1),s("tbody",t._l(this.apiResponse.response.videos,(function(e){return s("tr",[s("th",[t._v(t._s(e.id))]),s("td",[t._v(t._s(e.title))]),s("td",[s("a",{staticClass:"text-link-simple",attrs:{href:"https://www.youtube.com/channel/"+e.uploaderId,target:"_blank"}},[t._v(" "+t._s(e.uploader)+" ")])]),s("td",[t._v(t._s(t.convertTimestamp(e.published)))])])})),0)])])]),s("hr",{staticClass:"my-3"}),this.apiResponse.response.noRecord?s("div",{staticClass:"col-12"},[s("p",{staticClass:"lead"},[t._v("Unrecorded: "+t._s(this.apiResponse.response.noRecord.length))])]):t._e(),this.apiResponse.response.noRecord?s("div",{staticClass:"col-12"},[s("div",{staticClass:"table-responsive w-100 scrollable-table",staticStyle:{"max-height":"20vh"}},[s("table",{staticClass:"table table-dark"},[t._m(2),s("tbody",t._l(this.apiResponse.response.noRecord,(function(e){return s("tr",[s("th",[t._v(t._s(e))])])})),0)])])]):t._e()]):t._e()])])])])}),F=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal-header border-0"},[s("h5",{staticClass:"modal-title",attrs:{id:"searchResultModalLabel"}},[t._v("Search Result")]),s("button",{staticClass:"btn-close",attrs:{"aria-label":"Close","data-bs-dismiss":"modal",type:"button"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("ID")]),s("th",[t._v("Title")]),s("th",[t._v("Uploader")]),s("th",[t._v("Uploaded Date")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("ID")])])])}],H=s("2909"),Y=(s("fb6a"),s("a15b"),s("b64b"),{name:"SearchResultModal",props:{showModal:Boolean,apiResponse:{}},methods:{propagateClose:function(){this.$emit("close")},convertTimestamp:function(t){var e,s=new Date(1e3*t),a=s.getFullYear(),i=("0"+(s.getMonth()+1)).slice(-2),o=("0"+s.getDate()).slice(-2),n=s.getHours();("0"+s.getMinutes()).slice(-2);return n>12?(n-12,"PM"):12===n?(12,"PM"):0==n&&12,e=a+"-"+i+"-"+o,e},exportAsFile:function(t,e){var s=document.createElement("a");s.setAttribute("href",t),s.setAttribute("download",e),s.setAttribute("class","d-none"),document.body.appendChild(s),s.click(),document.body.removeChild(s)},exportAsCSVNoRecord:function(){var t=["videoId"];t.push.apply(t,Object(H["a"])(this.apiResponse.response.noRecord));var e=t.join("\r\n"),s=new Blob([e],{type:"text/csv"});this.exportAsFile(URL.createObjectURL(s),"export_no_records.csv")},exportAsCSVRetrieved:function(){var t=[];this.apiResponse.response.videos&&t.push(Object.keys(this.apiResponse.response.videos[0]).join(",")),this.apiResponse.response.videos.forEach((function(e){for(var s=[],a=0,i=Object.keys(e);a<i.length;a++){var o=i[a],n=e[o],r="".concat(n).replace(/"/g,'""').replace(/'/g,"''");s.push('"'.concat(r,'"'))}t.push(s.join(",").replace(/(\r\n|\r|\n)/g,"\\n"))}));var e=t.join("\r\n"),s=new Blob([e],{type:"text/csv"});this.exportAsFile(URL.createObjectURL(s),"export_retrieved.csv")},exportAsCSV:function(){this.exportAsCSVRetrieved(),this.exportAsCSVNoRecord()},exportAsJSON:function(){var t=new Blob([JSON.stringify(this.apiResponse)],{type:"application/json"});this.exportAsFile(URL.createObjectURL(t),"export")}},watch:{showModal:function(){var t=new bootstrap.Modal(document.getElementById("searchResultModal"),{});this.showModal?t.show():t.hide()},apiResponse:function(){}}}),G=Y,J=Object(h["a"])(G,$,F,!1,null,null,null),q=J.exports,Q={name:"Search",components:{SearchResultModal:q},data:function(){return{targetData:"",showStatus:!1,processing:!1,statusMessage:"",statusIsError:!1,showDetailsBtn:!1,showDetailsModal:!1,lastApiResp:!1}},methods:{_searchVideo:function(t){var e={endpoint:"".concat(window.apiEndpointDomain,"/api/youtube/videos/get"),method:"POST"};this.statusMessage="Please wait warmly while the server is processing our request",this.processing=!0;var s=this;o.RetrieveListOfVideos(e.endpoint,t,(function(t){t.error?(s.statusMessage=t.errorMessage,s.statusIsError=!0,s.processing=!1):(s.lastApiResp=t,s.statusMessage="Retrieved ".concat(t.response.videos.length," Items."),s.processing=!1,s.showDetailsBtn=!0,s.showDetailsModal=!0)}))},searchVideo:function(){this.showStatus=!0,this.processing=!0,this.statusIsError=!1,this.statusMessage="Please Wait ...",this.showDetailsBtn=!1;var t=a.DetermineIdType(this.targetData);if(null===t.type)return this.statusMessage="ERROR: Please Enter a Playlist/Video URL or ID",this.statusIsError=!0,void(this.processing=!1);if("playlist"===t.type){var e=this;i.FetchPlaylistItems(t.id,(function(t){var s=[];t.forEach((function(t){"This video is unavailable."===t.snippet.description&&s.push(t.snippet.resourceId.videoId)})),e._searchVideo(s)}),(function(t,s){e.statusMessage="Fetching Playlist Items. (".concat(t,"/").concat(s,")")}))}else{var s=t.id.replace(/(^,)|(,$)|( )/g,"").replace(" ","").split(",");this._searchVideo(s)}},showModal:function(){this.showDetailsModal=!0},closeModal:function(){this.showDetailsModal=!1}}},X=Q,z=Object(h["a"])(X,T,N,!1,null,null,null),W=z.exports,Z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{staticClass:"px-3 mb-somewhat",attrs:{id:"view-settings"}},[s("h3",[t._v("Settings")]),s("hr",{staticClass:"my-4"}),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 mb-4"},[s("label",{staticClass:"form-label lead",attrs:{for:"apiKey"}},[t._v("Youtube Data API Key")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.apiKey,expression:"apiKey"}],staticClass:"form-control",attrs:{id:"apiKey",type:"text",placeholder:"API Key"},domProps:{value:t.apiKey},on:{input:function(e){e.target.composing||(t.apiKey=e.target.value)}}})]),s("hr",{staticClass:"my-4"}),s("div",{staticClass:"col-12"},[s("button",{staticClass:"btn btn-outline-secondary w-100",attrs:{type:"button"},on:{click:this.onSettingsUpdated}},[t._v("Apply")])])])])},tt=[],et={name:"Settings",props:{initialApiKey:String},data:function(){return{apiKey:this.initialApiKey}},methods:{onSettingsUpdated:function(){var t={youtubeApiKey:this.apiKey};this.$emit("settingsChanged",t)}}},st=et,at=Object(h["a"])(st,Z,tt,!1,null,null,null),it=at.exports,ot=function(){function t(){this.isAuthAPIReady=!1,this.isYoutubeDataAPIReady=!1,this.apiKey=a.GetCookie("apiKey")||"",this.clientId=a.GetCookie("clientId")||""}return t.prototype.setAPIKey=function(t){this.isYoutubeDataAPIReady=!1,this.apiKey=t},t.prototype.getAPIKey=function(){return this.apiKey},t.prototype.setClientId=function(t){this.isAuthAPIReady=!1,this.clientId=t},t.prototype.LoadAuthAPI=function(t){var e=this;gapi.auth2.init({client_id:this.clientId}).then((function(s){e.isAuthAPIReady=!0,e.auth=s,t(!1,{error:"Success",details:"Operation Completed Successfully"})}),(function(s){e.isAuthAPIReady=!1,console.error("Failed to load Auth API: "+s.details),t(!0,s)}))},t.prototype.Authorize=function(t){this.isAuthAPIReady&&this.auth||(console.error("Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize"),t(!0,{error:"API Not Loaded",details:"Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize"}));var e=this;this.auth.signIn({scope:"https://www.googleapis.com/auth/youtube.readonly"}).then((function(){e.isAuthAPIReady=!0,t(!1,{error:"Success",details:"Operation Completed Successfully"})}),(function(s){e.isAuthAPIReady=!1,console.error("Error when Signing In, Reason: "+s.error),t(!0,s)}))},t.prototype.LoadYoutubeAPI=function(t){this.apiKey||(console.log("No API Key Specificed"),t(!0,"ERROR: No API Key Specified"));var e=this;gapi.client.setApiKey(this.apiKey),gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest","v3").then((function(){e.isYoutubeDataAPIReady=!0,console.log("Youtube Data API Ready"),t(!1,"Youtube API Loaded")}),(function(s){e.isYoutubeDataAPIReady=!1,console.error("Failed to load API, Reason: "+s.error.message),t(!0,s.error.message)}))},t.GetInstance=function(){return this._instance||(this._instance=new this)},t}();gapi.load("client:auth2",(function(){console.log("GAPI Loaded");var t=ot.GetInstance();t.LoadYoutubeAPI((function(t,e){console.log(t+e)}))}));var nt={name:"App",components:{Header:f,Footer:C,Home:S,Backup:V,BackupResultModal:j,Search:W,Settings:it},data:function(){return{route:window.location.hash.split("#")[1],currentApiKey:ot.GetInstance().getAPIKey()}},methods:{onSettingsChanged:function(t){var e=ot.GetInstance();e.setAPIKey(t.youtubeApiKey),e.LoadYoutubeAPI((function(t,e){t&&confirm(e)}))}},created:function(){var t=this;window.addEventListener("hashchange",(function(){t.route=window.location.hash.split("#")[1]}))}},rt=nt,lt=Object(h["a"])(rt,r,l,!1,null,null,null),ct=lt.exports;n["a"].config.productionTip=!1,window.apiEndpointDomain="http://api.backup.goodbeststudy.tech",new n["a"]({render:function(t){return t(ct)}}).$mount("#app")}});
//# sourceMappingURL=app.0b951945.js.map