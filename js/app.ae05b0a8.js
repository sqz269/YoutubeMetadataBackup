(function(t){function e(e){for(var s,o,r=e[0],l=e[1],c=e[2],d=0,h=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&h.push(n[o][0]),n[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(h.length)h.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(s=!1)}s&&(i.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},n={app:0},i=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/YoutubeMetadataBackup/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"5aea":function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"},[a("Navbar",{attrs:{"current-route":this.currentView}}),a("Home",{class:{"d-none":"Home"!==t.currentView}}),a("Backup",{class:{"d-none":"Backup"!==t.currentView}}),a("Search",{class:{"d-none":"Search"!==t.currentView}}),a("Footer")],1)},i=[],o=a("d4ec"),r=a("bee2"),l=a("262e"),c=a("2caf"),u=(a("ac1f"),a("1276"),a("caad"),a("9ab4")),d=a("1b40"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",{staticClass:"mb-auto"},[a("div",[a("h3",{staticClass:"float-md-start mb-0"},[t._v("Playlist Backup")]),a("nav",{staticClass:"nav nav-masthead justify-content-center float-md-end"},[a("a",{staticClass:"nav-link",class:{active:!t.currentRoute||"Home"===t.currentRoute},attrs:{id:"nav-location-home",href:"#Home"}},[t._v("Home")]),a("a",{staticClass:"nav-link",class:{active:"Backup"===t.currentRoute},attrs:{id:"nav-location-backup",href:"#Backup"}},[t._v("Backup")]),a("a",{staticClass:"nav-link",class:{active:"Search"===t.currentRoute},attrs:{id:"nav-location-search",href:"#Search"}},[t._v("Search")]),a("a",{staticClass:"nav-link",class:{active:"Settings"===t.currentRoute},attrs:{id:"nav-location-settings",href:"#Settings"}},[t._v("Settings")])])])])},p=[],v=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(d["c"]);Object(u["a"])([Object(d["b"])()],v.prototype,"currentRoute",void 0),v=Object(u["a"])([d["a"]],v);var f=v,b=f,y=a("2877"),m=Object(y["a"])(b,h,p,!1,null,null,null),g=m.exports,k=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},w=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"mt-auto text-white-50"},[a("p",[t._v(" Bug Report / Feature Request @ "),a("a",{staticClass:"text-white",attrs:{href:"https://github.com/sqz269/YoutubeMetadataBackup"}},[t._v("Github")])])])}],C=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(d["c"]);C=Object(u["a"])([Object(d["a"])({name:"Footer"})],C);var O=C,I=O,P=Object(y["a"])(I,k,w,!1,null,null,null),j=P.exports,_=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},R=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"px-3",attrs:{id:"view-home"}},[a("h1",[t._v("Backup Your Youtube Playlist")]),a("p",{staticClass:"lead"},[t._v("Tried of seeing Youtube video wiped without a trace? Spending too much time searching for that Unavailable Video? Now you can backup all the videos's metadata just in case if the video disappears.")]),a("p",{staticClass:"lead"},[a("a",{staticClass:"btn btn-lg btn-secondary fw-bold border-white bg-white",attrs:{href:"#Backup"}},[t._v("Backup Playlist")])]),a("p",{staticClass:"lead"},[a("a",{staticClass:"btn btn-lg btn-secondary fw-bold border-white bg-white",attrs:{href:"#Search"}},[t._v("Retrieve Data")])])])}],x=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(d["c"]);x=Object(u["a"])([Object(d["a"])({name:"Home"})],x);var E=x,S=E,D=Object(y["a"])(S,_,R,!1,null,null,null),A=D.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("main",{staticClass:"px-3 mb-a-lot",attrs:{id:"view-search"}},[a("h3",[t._v("Search Youtube Video")]),a("hr",{staticClass:"my-4"}),a("p",{staticClass:"lead"},[t._v("Enter Playlist/Video's URL or ID")]),a("div",{staticClass:"input-group input-group-lg sharp-corners mb-1"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputData,expression:"inputData"}],staticClass:"form-control text-input",attrs:{id:"search-input",type:"text",placeholder:"ID or URL"},domProps:{value:t.inputData},on:{input:function(e){e.target.composing||(t.inputData=e.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-lg btn-outline-secondary",attrs:{type:"button"},on:{click:this.search}},[t._v("Search")])])]),a("StatusMessage",{ref:"status"})],1),a("SearchResultModal",{ref:"searchResult"})],1)},V=[],$=(a("159b"),a("a4d3"),a("e01a"),a("99af"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-items-center mt-4",class:{"d-none":!t.show}},[a("p",{staticClass:"lead status-message",class:{"text-danger":t.isError}},[t._v(" "+t._s(t.statusMessage)+" "),this.showDetails?a("a",{staticClass:"text-link-simple",on:{click:t.showDetails}},[t._v("Details")]):t._e()]),a("div",{staticClass:"ms-auto"},[a("div",{staticClass:"spinner-border ms-auto",class:{"d-none":!t.isProcessing},attrs:{role:"status","aria-hidden":"true"}})])])}),L=[],M=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.show=!1,t.isError=!1,t.isProcessing=!1,t.statusMessage="",t.showDetails=null,t}return Object(r["a"])(a,[{key:"ResetStatus",value:function(){this.show=!1,this.isError=!1,this.isProcessing=!1,this.statusMessage="",this.showDetails=null}},{key:"Error",value:function(t){this.ResetStatus(),this.show=!0,this.statusMessage=t,this.isError=!0}},{key:"Loading",value:function(t){this.ResetStatus(),this.show=!0,this.statusMessage=t,this.isProcessing=!0}},{key:"Info",value:function(t){this.ResetStatus(),this.show=!0,this.statusMessage=t}},{key:"Details",value:function(t,e){this.Info(t),this.showDetails=e}}]),a}(d["c"]);M=Object(u["a"])([d["a"]],M);var T,F,B=M,N=B,G=Object(y["a"])(N,$,L,!1,null,null,null),Y=G.exports,H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{attrs:{"modal-class":"modal-fullscreen",title:"Search Result","hide-footer":"","header-bg-variant":"dark","body-bg-variant":"dark","footer-bg-variant":"dark","header-close-content":""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[this.response?a("b-row",[a("div",{staticClass:"col-md-6"},[a("button",{staticClass:"btn btn-outline-secondary w-100",on:{click:this.exportAsCsv}},[t._v("Export as CSV")])]),a("div",{staticClass:"col-md-6 mt-2 mt-md-0 mb-3"},[a("button",{staticClass:"btn btn-outline-secondary w-100",on:{click:this.exportAsJson}},[t._v("Export as JSON")])]),a("div",{staticClass:"col-12 pt-2 border-top border-white"},[a("p",{staticClass:"lead mb-1"},[t._v("Recorded: "+t._s(this.response.videos.length))])]),a("div",{staticClass:"col-12 mb-2"},[a("div",{staticClass:"table-responsive w-100 scrollable-table",staticStyle:{"max-height":"40vh"}},[a("table",{staticClass:"table table-dark"},[a("thead",[a("tr",[a("th",[t._v("ID")]),a("th",[t._v("Title")]),a("th",[t._v("Uploader")]),a("th",[t._v("Uploaded Date")])])]),a("tbody",t._l(this.response.videos,(function(e){return a("tr",{key:e.id},[a("th",[t._v(t._s(e.id))]),a("td",[t._v(t._s(e.title))]),a("td",[a("a",{staticClass:"text-link-simple",attrs:{href:"https://www.youtube.com/channel/"+e.uploaderId,target:"_blank"}},[t._v(" "+t._s(e.uploader)+" ")])]),a("td",[t._v(t._s(t.UnixTimestampToDateString(e.published)))])])})),0)])])]),this.response.noRecord?a("div",{staticClass:"col-12 pt-2 border-top border-white"},[a("p",{staticClass:"lead mb-1"},[t._v("Unrecorded: "+t._s(this.response.noRecord.length))])]):t._e(),this.response.noRecord?a("div",{staticClass:"col-12"},[a("div",{staticClass:"table-responsive w-100 scrollable-table",staticStyle:{"max-height":"30vh"}},[a("table",{staticClass:"table table-dark"},[a("thead",[a("tr",[a("th",[t._v("ID")])])]),a("tbody",t._l(this.response.noRecord,(function(e){return a("tr",{key:e},[a("th",[t._v(t._s(e))])])})),0)])])]):t._e()]):t._e()],1)},q=[],J=a("2909");a("a15b"),a("b64b"),a("5319"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("fb6a"),a("4de4");(function(t){t[t["Video"]=0]="Video",t[t["VideoList"]=1]="VideoList",t[t["Playlist"]=2]="Playlist",t[t["Channel"]=3]="Channel",t[t["Username"]=4]="Username",t[t["CustomUrl"]=5]="CustomUrl",t[t["Empty"]=6]="Empty",t[t["Unknown"]=7]="Unknown"})(T||(T={})),function(t){function e(t,e){try{var a=new URL(t);return a.searchParams.get(e)}catch(s){return null}}function a(t){var e,a="; ".concat(document.cookie),s=a.split("; ".concat(t,"="));if(2===s.length)return null===(e=s.pop())||void 0===e?void 0:e.split(";").shift()}function s(t,e){document.cookie="".concat(t,"=").concat(e,"; expires=Fri, 31 Dec 2037 23:59:59 GMT")}function n(t,e,a){var s=new Blob(t,a),n=URL.createObjectURL(s),i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("download",e),i.setAttribute("class","d-none"),document.body.appendChild(i),i.click(),document.body.removeChild(i)}function i(t){return new Date(1e3*t).toLocaleDateString()}function o(e){if(!e)return{type:T.Empty,id:null};var a="youtube.com/c/",s="youtube.com/user/",n="youtube.com/channel/";if(-1!=e.indexOf(n)){var i=e.indexOf(n),o=e.slice(i+n.length);return o=o.split("/")[0],{type:T.Channel,id:o}}if(-1!=e.indexOf(s)){var r=e.indexOf(s),l=e.slice(r+s.length);return l=l.split("/")[0],{type:T.Username,id:l}}if(-1!=e.indexOf(a)){var c=e.indexOf(a),u=e.slice(c+a.length);return u=u.split("/")[0],{type:T.CustomUrl,id:u}}var d=t.GetQueryParams(e,"list");if(d)return{type:T.Playlist,id:d};var h=t.GetQueryParams(e,"v");if(h)return{type:T.Video,id:h};if(11===e.length)return{type:T.Video,id:e};if(11===e.split(",")[0].length){var p=e.split(",");return p=p.filter((function(t){return!!t})),p?{type:T.VideoList,id:p}:{type:T.Empty,id:null}}var v=e.substr(0,2);return"PL"===v||"UU"===v||"RD"===v?{type:T.Playlist,id:e}:"UC"===v?{type:T.Channel,id:e}:{type:T.Unknown,id:null}}t.GetQueryParams=e,t.GetCookie=a,t.SetCookie=s,t.ExportFile=n,t.UnixTimestampToDateString=i,t.DetermineIdType=o}(F||(F={}));var K=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.show=!1,t.response=null,t.UnixTimestampToDateString=F.UnixTimestampToDateString,t}return Object(r["a"])(a,[{key:"showModal",value:function(){this.show=!0}},{key:"hideModal",value:function(){this.show=!1}},{key:"toggleModal",value:function(){this.show=!this.show}},{key:"Response",set:function(t){this.response=t.response}},{key:"exportAsCsv",value:function(){this.exportCsvNoRecord(),this.exportCsvRetrieved()}},{key:"exportCsvRetrieved",value:function(){var t,e,a,s=[];if(null!==(t=this.response)&&void 0!==t&&t.videos[0]){s.push(Object.keys(null===(e=this.response)||void 0===e?void 0:e.videos[0]).join(",")),null===(a=this.response)||void 0===a||a.videos.forEach((function(t){for(var e=[],a=0,n=Object.keys(t);a<n.length;a++){var i=n[a],o=t[i],r="".concat(o).replace(/"/g,'""').replace(/'/g,"''");e.push('"'.concat(r,'"'))}s.push(e.join(",").replace(/(\r\n|\r|\n)/g,"\\n"))}));var n=s.join("\n");F.ExportFile([n],"export_data.csv",{type:"text/csv"})}}},{key:"exportCsvNoRecord",value:function(){var t,e,a=["videoId"];if(null!==(t=this.response)&&void 0!==t&&t.noRecord){a.push.apply(a,Object(J["a"])(null===(e=this.response)||void 0===e?void 0:e.noRecord));var s=a.join("\r\n");F.ExportFile([s],"export_no_record.csv",{type:"text/csv"})}}},{key:"exportAsJson",value:function(){F.ExportFile([JSON.stringify(this.response)],"export.json",{type:"application/json"})}}]),a}(d["c"]);K=Object(u["a"])([d["a"]],K);var z,X=K,Q=X,W=Object(y["a"])(Q,H,q,!1,null,null,null),Z=W.exports,tt=function(){function t(){Object(o["a"])(this,t)}return Object(r["a"])(t,null,[{key:"BackupVideos",value:function(t,e){var a="".concat(this.EndPointDomain).concat(this.EndPointUrl.add),s=new XMLHttpRequest;s.open("POST",a),s.setRequestHeader("Content-Type","application/json"),s.onreadystatechange=function(){if(s.readyState===XMLHttpRequest.DONE){var t=JSON.parse(s.responseText);e(t)}},s.send(JSON.stringify(t))}},{key:"RetrieveListOfVideos",value:function(t,e){var a="".concat(this.EndPointDomain).concat(this.EndPointUrl.fetch),s=new XMLHttpRequest;s.open("POST",a),s.setRequestHeader("Content-Type","application/json"),s.onreadystatechange=function(){if(s.readyState===XMLHttpRequest.DONE){var t=JSON.parse(s.responseText);e(t)}},s.send(JSON.stringify(t))}}]),t}();tt.EndPointDomain="",tt.EndPointUrl={add:"/api/youtube/videos/add",fetch:"/api/youtube/videos/get",search:"/api/youtube/videos/get/all"},function(t){function e(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["snippet"];return gapi.client.youtube.playlistItems.list({part:a,maxResults:50,pageToken:e,playlistId:t})}function a(t,s,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0;e(t,o).then((function(e){var r,l;o=e.result.nextPageToken,e.result.items?i.push.apply(i,Object(J["a"])(e.result.items)):console.log("No Items in the result set??"),null!==(r=e.result.pageInfo)&&void 0!==r&&r.totalResults&&n&&n(i.length,null===(l=e.result.pageInfo)||void 0===l?void 0:l.totalResults),o?a(t,s,n,i,o):s(!1,"Success",i)}),(function(t){s(!0,t.result.error.message,i)}))}function s(t,e){gapi.client.youtube.channels.list({part:["snippet,contentDetails,statistics"],forUsername:t}).then((function(t){t.result.items?e(!1,"Success",t.result.items):e(!1,"Success",[])}),(function(t){e(!0,t.result.error.message,[])}))}function n(t,e){gapi.client.youtube.videos.list({part:["snippet,contentDetails,statistics"],id:t}).then((function(t){var a;t.result.items?e(!1,"Success",null===(a=t.result.items[0].snippet)||void 0===a?void 0:a.channelId):e(!1,"Success",void 0)}),(function(t){e(!0,t,void 0)}))}function i(t,e){gapi.client.youtube.channels.list({part:["snippet,contentDetails,statistics"],id:[t]}).then((function(t){var a,s;if(console.log("Response",t),t.result.items){var n=null===(a=t.result.items[0].contentDetails)||void 0===a||null===(s=a.relatedPlaylists)||void 0===s?void 0:s.uploads;e(!1,"Success",n)}else e(!0,"Youtube Data API did not respond with a Upload playlist.",void 0)}),(function(t){console.error("Error",t),e(!0,t.result.error.message,void 0)}))}t.GetPlaylistDetails=e,t.FetchPlaylistItems=a,t.GetChannelDetailsFromUsername=s,t.GetChannelIdFromVideo=n,t.GetChannelUploadPlaylist=i}(z||(z={}));var et=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.inputData="",t}return Object(r["a"])(a,[{key:"search",value:function(){var t=F.DetermineIdType(this.inputData);switch(console.log(t),t.type){case T.Video:this.searchVideo([t.id]);break;case T.VideoList:this.searchVideo(t.id);break;case T.Playlist:this.searchPlaylist(t.id);break;case T.Channel:case T.Username:case T.CustomUrl:this.$refs.status.Error("Search by Channel is currently not supported. Please provide a Video/Playlist ID");break;case T.Empty:case T.Unknown:this.$refs.status.Error("Invalid Input. Please Enter a Video or Playlist ID");break}}},{key:"searchVideo",value:function(t){var e=this;this.$refs.status.Loading("Please wait warmly while the server is processing our request"),tt.RetrieveListOfVideos(t,(function(t){t.error?e.$refs.status.Error("Error while retrieving data: ".concat(t.errorMessage)):(e.$refs.status.Details("Data Retrieved.",(function(){e.$refs.searchResult.showModal()})),e.$refs.searchResult.Response=t,e.$refs.searchResult.showModal())}))}},{key:"searchPlaylist",value:function(t){var e=this;this.$refs.status.Loading("Retrieving Playlist Data"),z.FetchPlaylistItems(t,(function(t,a,s){if(t)e.$refs.status.Error("Error while Fetching Playlist: ".concat(a));else{var n=[];s.forEach((function(t){var e;if("This video is unavailable."===(null===(e=t.snippet)||void 0===e?void 0:e.description)){var a,s,i=null===(a=t.snippet)||void 0===a||null===(s=a.resourceId)||void 0===s?void 0:s.videoId;i&&n.push(i)}})),e.searchVideo(n)}}),(function(t,a){e.$refs.status.Loading("Fetching Playlist Items: ".concat(t,"/").concat(a))}))}}]),a}(d["c"]);et=Object(u["a"])([Object(d["a"])({components:{SearchResultModal:Z,StatusMessage:Y}})],et);var at=et,st=at,nt=Object(y["a"])(st,U,V,!1,null,null,null),it=nt.exports,ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("main",{staticClass:"px-3 mb-a-lot",attrs:{id:"view-backup"}},[a("h3",[t._v("Backup Playlist")]),a("hr",{staticClass:"my-4"}),a("p",{staticClass:"lead"},[t._v("Enter Playlist/Channel ID")]),a("div",{staticClass:"input-group input-group-lg sharp-corners mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputId,expression:"inputId"}],staticClass:"form-control text-input",attrs:{id:"backup-input",type:"text",placeholder:"Playlist/Channel ID"},domProps:{value:t.inputId},on:{input:function(e){e.target.composing||(t.inputId=e.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-lg btn-outline-secondary",attrs:{type:"button"},on:{click:t.backup}},[t._v("Backup")])])]),a("StatusMessage",{ref:"status"})],1),a("ChannelSelectModal",{ref:"channelSelect"}),a("BackupResultModel",{ref:"backupResult"})],1)},rt=[],lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{attrs:{title:"Select Channel","hide-footer":"","header-bg-variant":"dark","body-bg-variant":"dark","footer-bg-variant":"dark","header-close-content":""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("table",{staticClass:"table table-dark"},[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Channel")]),a("th",{attrs:{scope:"col"}},[t._v("Select")])])]),t.channels?a("tbody",t._l(t.channels,(function(e){return a("tr",{key:e.id},[a("td",[a("img",{attrs:{src:e.snippet.thumbnails.default.url,alt:e.snippet.title}})]),a("td",[t._v("Place Holder")])])})),0):t._e()])])},ct=[],ut=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.channels=[],t.show=!1,t}return Object(r["a"])(a,[{key:"setChannelsToSelect",value:function(t,e){console.log(t),this.channels=t,this.callback=e,this.show=!0}}]),a}(d["c"]);ut=Object(u["a"])([d["a"]],ut);var dt=ut,ht=dt,pt=Object(y["a"])(ht,lt,ct,!1,null,null,null),vt=pt.exports,ft=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{attrs:{size:"lg",title:"Backup Result","hide-footer":"","header-bg-variant":"dark","body-bg-variant":"dark","footer-bg-variant":"dark","header-close-content":""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[this.response?a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("p",{staticClass:"lead"},[t._v("Total Items Processed: "+t._s(this.response.response.totalItemProcessed))])]),a("b-col",{staticClass:"scrollable-table",staticStyle:{"max-height":"400px"},attrs:{sm:"6"}},[a("VideoIdTable",{attrs:{"table-title":"Added ("+this.response.response.totalNewItemsAdded+")","video-ids":this.response.response.addedVideoIds}})],1),a("b-col",{staticClass:"scrollable-table",staticStyle:{"max-height":"400px"},attrs:{sm:"6"}},[a("VideoIdTable",{attrs:{"table-title":"Failed ("+this.response.response.totalItemsFailedToAdd+")","video-ids":this.response.response.failedVideoIds}})],1)],1):t._e()],1)},bt=[],yt=a("2fe1"),mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",{staticClass:"table table-dark",staticStyle:{"max-height":"400px"}},[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v(t._s(this.tableTitle))])])]),a("tbody",t._l(t.videoIds,(function(e){return a("tr",{key:e},[a("td",[t._v(t._s(e))])])})),0)])},gt=[],kt=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return a}(d["c"]);Object(u["a"])([Object(d["b"])()],kt.prototype,"videoIds",void 0),Object(u["a"])([Object(d["b"])()],kt.prototype,"tableTitle",void 0),kt=Object(u["a"])([d["a"]],kt);var wt=kt,Ct=wt,Ot=Object(y["a"])(Ct,mt,gt,!1,null,"5a2bf956",null),It=Ot.exports,Pt=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.show=!1,t.response=null,t}return Object(r["a"])(a,[{key:"showModal",value:function(){this.show=!0}},{key:"hideModal",value:function(){this.show=!1}},{key:"toggleModal",value:function(){this.show=!this.show}},{key:"SetBackupResult",value:function(t){this.response=t,this.showModal()}}]),a}(d["c"]);Pt=Object(u["a"])([Object(yt["b"])({components:{VideoIdTable:It}})],Pt);var jt=Pt,_t=jt,Rt=Object(y["a"])(_t,ft,bt,!1,null,null,null),xt=Rt.exports,Et=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.inputId="",t}return Object(r["a"])(a,[{key:"backup",value:function(){var t=F.DetermineIdType(this.inputId);switch(t.type){case T.Playlist:this.backupPlaylist(t.id);break;case T.Channel:this.backupChannelForId(t.id);break;case T.Username:this.backupChannelForUsername(t.id);break;case T.Video:this.backupChannelFromVideo(t.id);break;case T.VideoList:this.$refs.status.Error("Video List is currently not supported by Backup. Please Enter a Channel or Playlist ID");break;case T.CustomUrl:this.$refs.status.Error("Channel Custom URL is currently not supported. Please provide a video ID from the channel.");break;case T.Empty:case T.Unknown:this.$refs.status.Error("Invalid Input. Please Enter a Channel or Playlist ID");break}}},{key:"backupVideoArray",value:function(t){var e=this;this.$refs.status.Loading("Please wait warmly while the server is processing our request"),tt.BackupVideos(t,(function(t){t.error?e.$refs.status.Error("Error backing up videos: ".concat(t.errorMessage)):(e.$refs.status.Details("Backup Complete",(function(){e.$refs.backupResult.showModal()})),e.$refs.backupResult.SetBackupResult(t))}))}},{key:"backupPlaylist",value:function(t){var e=this;z.FetchPlaylistItems(t,(function(t,a,s){if(t)e.$refs.status.Error("Error while Fetching Playlist: ".concat(a));else{var n=[];s.forEach((function(t){var e,a,s=null===(e=t.snippet)||void 0===e||null===(a=e.resourceId)||void 0===a?void 0:a.videoId;s&&n.push(s)})),e.backupVideoArray(n)}}),(function(t,a){e.$refs.status.Loading("Fetching Playlist Items: ".concat(t,"/").concat(a))}))}},{key:"backupChannelForId",value:function(t){var e=this;this.$refs.status.Loading("Getting Channel's Uploaded List"),z.GetChannelUploadPlaylist(t,(function(t,a,s){t?e.$refs.status.Error("Error getting channel's upload playlist: ".concat(a)):s?e.backupPlaylist(s):e.$refs.status.Error("No Upload playlist returned for Channel")}))}},{key:"backupChannelForUsername",value:function(t){var e=this;this.$refs.status.Loading("Getting list of channels from Username"),z.GetChannelDetailsFromUsername(t,(function(a,s,n){if(a)e.$refs.status.Error("Error fetching channels from Username: ".concat(s));else if(n){if(1===n.length){var i,o,r;console.log("Only one channel with username: ".concat(t,". Auto selecting it"));var l=null===(i=n[0])||void 0===i||null===(o=i.contentDetails)||void 0===o||null===(r=o.relatedPlaylists)||void 0===r?void 0:r.uploads;if(!l)return void e.$refs.status.Error("Error: Unable to find Uploads Playlist for Channel: ".concat(n[0].id));e.backupPlaylist(l)}}else e.$refs.status.Error("No channel with name: ".concat(t," found"))}))}},{key:"backupChannelFromVideo",value:function(t){var e=this;this.$refs.status.Loading("Retrieving Channel ID from Video"),z.GetChannelIdFromVideo(t,(function(a,s,n){a?e.$refs.status.Error("Failed to retrieve video details: ".concat(s)):n?e.backupChannelForId(n):e.$refs.status.Error("No details retrieved for Video ID: ".concat(t,". Is the Video ID Correct?"))}))}}]),a}(d["c"]);Et=Object(u["a"])([Object(d["a"])({components:{BackupResultModel:xt,ChannelSelectModal:vt,StatusMessage:Y}})],Et);var St=Et,Dt=St,At=Object(y["a"])(Dt,ot,rt,!1,null,null,null),Ut=At.exports,Vt=function(){function t(){Object(o["a"])(this,t),this.isAuthAPIReady=!1,this.isYoutubeDataAPIReady=!1,this.apiKey=F.GetCookie("apiKey")||"",this.clientId=F.GetCookie("clientId")||""}return Object(r["a"])(t,[{key:"APIKey",get:function(){return this.apiKey},set:function(t){this.apiKey=t}},{key:"ClientId",get:function(){return this.clientId},set:function(t){this.clientId=t}},{key:"IsAuthAPIReady",get:function(){return this.isAuthAPIReady}},{key:"IsYoutubeDataAPIReady",get:function(){return this.isYoutubeDataAPIReady}},{key:"LoadAPI",value:function(){var t=this;gapi.load("client:auth2",(function(){t.LoadYoutubeAPI((function(){console.log("Youtube Data API Ready;")}))}))}},{key:"LoadAuthAPI",value:function(t){var e=this;gapi.auth2.init({client_id:this.clientId}).then((function(a){e.isAuthAPIReady=!0,e.auth=a,t(!1,{error:"Success",details:"Operation Completed Successfully"})}),(function(a){e.isAuthAPIReady=!1,console.error("Failed to load Auth API: ".concat(a.details)),t(!0,a)}))}},{key:"Authorize",value:function(t){var e=this;if(!this.isAuthAPIReady||!this.auth)return console.error("Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize"),void t(!0,{error:"API Not Loaded",details:"Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize"});this.auth.signIn({scope:"https://www.googleapis.com/auth/youtube.readonly"}).then((function(){e.isAuthAPIReady=!0,t(!1,{error:"Success",details:"Operation Completed Successfully"})}),(function(a){e.isAuthAPIReady=!1,console.error("Error when Signing In, Reason: ".concat(a.error)),t(!0,a)}))}},{key:"LoadYoutubeAPI",value:function(t){var e=this;this.apiKey||(console.log("No API Key Specified"),t(!0,"ERROR: No API Key Specified")),gapi.client.setApiKey(this.apiKey),gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest","v3").then((function(){e.isYoutubeDataAPIReady=!0,console.log("Youtube Data API Ready"),t(!1,"Youtube API Loaded")}),(function(a){e.isYoutubeDataAPIReady=!1,console.error("Failed to load API, Reason: ".concat(a.error.message)),t(!0,a.error.message)}))}}],[{key:"GetInstance",value:function(){return this._instance||(this._instance=new this)}}]),t}(),$t=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.currentView="Home",t}return Object(r["a"])(a,[{key:"mounted",value:function(){var t=window.location.hash.split("#")[1];["Home","Search","Backup","Settings"].includes(t)||(t="Home"),this.currentView=t,gapi.load("client:auth2",(function(){var t=Vt.GetInstance();t.LoadYoutubeAPI((function(t,e){t&&alert("Failed to load Youtube Data API: ".concat(e))}))}))}},{key:"created",value:function(){var t=this;window.addEventListener("hashchange",(function(){t.currentView=window.location.hash.split("#")[1]}))}}]),a}(d["c"]);$t=Object(u["a"])([Object(d["a"])({components:{Backup:Ut,Search:it,Home:A,Footer:j,Navbar:g}})],$t);var Lt=$t,Mt=Lt,Tt=Object(y["a"])(Mt,n,i,!1,null,null,null),Ft=Tt.exports,Bt=a("5f5b"),Nt=a("b1e0");a("f9e3"),a("2dd8"),a("5aea");s["default"].use(Bt["a"]),s["default"].use(Nt["a"]),s["default"].config.productionTip=!1,tt.EndPointDomain="http://localhost:44371/",new s["default"]({render:function(t){return t(Ft)}}).$mount("#app")}});
//# sourceMappingURL=app.ae05b0a8.js.map