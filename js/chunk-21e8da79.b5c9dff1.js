(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21e8da79"],{"10a8":function(t,s,i){},"17b0":function(t,s,i){"use strict";var e=i("bc44"),a=i.n(e);a.a},"1e7c":function(t,s,i){"use strict";var e=i("10a8"),a=i.n(e);a.a},"1fa1":function(t,s,i){"use strict";var e=i("2ed8"),a=i.n(e);a.a},"2ed8":function(t,s,i){},"39a1":function(t,s,i){},"95c7":function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"scroll-view",style:{"--height":t.height}},[i("div",{ref:"cover",staticClass:"cover"},[t._t("cover")],2),i("div",{staticClass:"tools"},[t._t("tab"),i("div",{staticClass:"left-tool"},[t._t("left")],2),i("div",{staticClass:"right-tool"},[t._t("right")],2)],2),i("scroll",[t._t("component")],2)],1)},a=[],n=i("8d33"),c={name:"ScrollView",components:{Scroll:n["a"]},props:{height:{type:String,default:"35%"}}},o=c,l=(i("17b0"),i("2877")),r=Object(l["a"])(o,e,a,!1,null,"970440dc",null);s["a"]=r.exports},99721:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"playlist-view"}},[i("nav-bar",{staticClass:"playlist-nav"},[i("i",{staticClass:"iconfont icon-back",attrs:{slot:"left"},on:{click:t.goBack},slot:"left"}),i("div",{staticClass:"header",attrs:{slot:"center"},slot:"center"},[t._v("歌单")])]),i("scroll-view",{ref:"scrollView"},[i("playlist-display",{attrs:{slot:"cover",item:t.playlistInfo,myList:t.myPlaylist},on:{multiSelect:t.multiSelect,moreOption:t.moreOption},slot:"cover"}),t.selectMode?t._e():i("div",{staticClass:"play-all",attrs:{slot:"left"},on:{click:function(s){return s.stopPropagation(),t.play(s)}},slot:"left"},[i("i",{staticClass:"iconfont icon-play"}),i("span",{staticClass:"tool-header"},[t._v("播放全部")])]),t.selectMode?i("div",{staticClass:"select-all",attrs:{slot:"left"},on:{click:function(s){return s.stopPropagation(),t.selectAll(s)}},slot:"left"},[i("i",{staticClass:"iconfont",class:t.checkAll?"icon-select-fill":"icon-select-unfill"}),i("span",{staticClass:"tool-header"},[t._v("全部")])]):t._e(),t.selectMode?i("span",{staticClass:"select-all-text",attrs:{slot:"right"},on:{click:t.multiSelect},slot:"right"},[t._v("完成")]):t.selectMode||t.myPlaylist?t._e():i("div",{class:t.subscribed?"subed":"add-col",attrs:{slot:"right"},on:{click:t.subPlaylist},slot:"right"},[i("i",{staticClass:"iconfont",class:t.subscribed?"icon-folder":"icon-plus"}),i("span",[t._v(t._s(t.subscribed?"已收藏":"收藏"))]),t.playlistInfo.subscribedCount&&!t.subscribed?i("span",[t._v("("+t._s(t._f("round")(t.playlistInfo.subscribedCount,1))+")")]):t._e()]),i("playlist-list",{ref:"list",attrs:{slot:"component",newList:t.newList,item:t.tracks,multiSelect:t.selectMode},on:{addSong:t.addSong,trackClick:t.play,trackMoreClick:t.trackMoreClick,isChecked:t.checked},slot:"component"})],1),i("add-song",{directives:[{name:"show",rawName:"v-show",value:t.toggleAddMenu,expression:"toggleAddMenu"}]}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.selectMode,expression:"selectMode"}],staticClass:"select-toolbar",class:{active:t.isChecked}},[i("div",{staticClass:"play-next",on:{click:t.addToPlayer}},[i("i",{staticClass:"iconfont icon-add-next"}),i("p",[t._v("下一首播放")])]),i("div",{staticClass:"add-to-playlist",on:{click:t.selectPlaylist}},[i("i",{staticClass:"iconfont icon-add"}),i("p",[t._v("收藏到歌单")])]),t.isLogin&&t.myPlaylist?i("div",{staticClass:"remove-from-playlist",on:{click:t.removeSong}},[i("i",{staticClass:"iconfont icon-trash"}),i("p",[t._v("删除")])]):t._e()]),i("transition",{attrs:{name:"slide"}},[i("popup",{directives:[{name:"show",rawName:"v-show",value:t.showMoreOption,expression:"showMoreOption"}],attrs:{popUpHeight:-1},on:{togglePopUp:t.moreOption}},[i("div",{staticClass:"option-header"},[t._v(t._s(t.playlistInfo.name))]),i("div",{staticClass:"option-wrapper"},[i("div",{staticClass:"add-more",on:{click:function(s){return s.stopPropagation(),t.addSong(s)}}},[i("i",{staticClass:"iconfont icon-add"}),i("span",[t._v("添加歌曲")])]),i("div",{staticClass:"edit-playlist",on:{click:function(s){return s.stopPropagation(),t.noFunc(s)}}},[i("i",{staticClass:"iconfont icon-edit"}),i("span",[t._v("编辑歌单信息")])])])])],1),i("more-song-options",{directives:[{name:"show",rawName:"v-show",value:(t.song&&Object.keys(t.song).length)|t.isChecked,expression:"(song && Object.keys(song).length) | isChecked"}],ref:"trackPopUp",attrs:{song:t.song}})],1)},a=[],n=(i("99af"),i("4de4"),i("caad"),i("a15b"),i("fb6a"),i("b0c0"),i("a9e3"),i("2532"),i("4795"),i("96cf"),i("1da1")),c=i("5530"),o=function(){var t=this,s=t.$createElement,i=t._self._c||s;return t.item&&Object.keys(t.item).length>0?i("div",{staticClass:"playlist-display",style:{backgroundImage:t.backgroundImage}},[i("div",{staticClass:"display-wrapper",style:{"--height":t.coverHeight+"px"}},[i("div",{staticClass:"main-display"},[i("div",{staticClass:"display-img-wrapper"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.fmtUrl(t.item.coverImgUrl),expression:"fmtUrl(item.coverImgUrl)"}]}),i("span",[i("i",{staticClass:"iconfont icon-play-s"}),t._v(" "+t._s(t._f("round")(t.item.playCount))+" ")])]),i("div",{staticClass:"display-content-wrapper"},[i("div",{staticClass:"title"},[t._v(t._s(t.item.name))]),i("div",{staticClass:"creator"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.fmtUrl(t.item.creator.avatarUrl),expression:"fmtUrl(item.creator.avatarUrl)"}],staticClass:"creator-avatar"}),i("span",{staticClass:"creator-name"},[t._v(t._s(t.item.creator.nickname))])]),i("div",{staticClass:"desc"},[i("div",{staticClass:"desc-content"},[t._v(t._s(t.item.description))]),i("i",{staticClass:"iconfont icon-next"})])])]),i("div",{staticClass:"sub-display"},[i("div",{staticClass:"btn-wrapper",on:{click:function(s){return s.stopPropagation(),t.noFunc(s)}}},[i("i",{staticClass:"iconfont icon-comment"}),i("span",{staticClass:"btn-text"},[t._v(t._s(t._f("round")(t.item.commentCount)))])]),i("div",{staticClass:"btn-wrapper",on:{click:t.share}},[i("i",{staticClass:"iconfont icon-share"}),i("span",{staticClass:"btn-text"},[t._v(t._s(t._f("round")(t.item.shareCount)))])]),i("div",{staticClass:"btn-wrapper",on:{click:t.noFunc}},[i("i",{staticClass:"iconfont icon-download"}),i("span",{staticClass:"btn-text"},[t._v("下载")])]),i("div",{staticClass:"btn-wrapper",on:{click:t.multiSelect}},[i("i",{staticClass:"iconfont icon-select"}),i("span",{staticClass:"btn-text"},[t._v("多选")])]),t.myList?i("div",{staticClass:"btn-wrapper",on:{click:t.moreOption}},[i("i",{staticClass:"iconfont icon-more--line"}),i("span",{staticClass:"btn-text"},[t._v("编辑")])]):t._e()])])]):t._e()},l=[],r=(i("b64b"),i("eecb")),d=i("2f62"),u={name:"PlaylistDisplay",mixins:[r["g"],r["d"]],props:{item:{type:Object,default:function(){},required:!0},myList:{type:Boolean,default:!1}},data:function(){return{backgroundImage:"",coverHeight:0}},mounted:function(){this.coverHeight=this.$parent.$refs.cover.clientHeight},methods:{moreOption:function(){this.$emit("moreOption")},multiSelect:function(){this.$emit("multiSelect")},noFunc:function(){this.$toast.show("暂时还不支持哦",1e3)},share:function(){var t=this,s="分享".concat(this.item.creator.nickname,"的歌单 ").concat("«"+this.item.name+"»"," https://syhua4.github.io/pear-music-app/#/playlists/").concat(this.item.id);this.$copyText(s).then((function(){t.$toast.show("复制链接成功",1e3)}),(function(){t.$toast.show("复制链接失败, 请重试",1e3)}))}},computed:Object(c["a"])({},Object(d["c"])(["cookie"])),watch:{item:{handler:function(t){Object.keys(t).length>0&&(this.backgroundImage="url(".concat(this.fmtUrl(t.coverImgUrl),")"))}}}},h=u,p=(i("1fa1"),i("2877")),f=Object(p["a"])(h,o,l,!1,null,"020e5cbc",null),m=f.exports,v=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"playlist-list"},[t.newList?t._e():i("loading",{attrs:{isShow:t.loading}}),t.newList?i("span",{staticClass:"add-btn",on:{click:t.addSong}},[t._v("添加歌曲")]):t._e(),t._l(t.item,(function(s,e){return i("div",{key:s.id,staticClass:"track-wrapper"},[i("song-view",[t.multiSelect?i("i",{staticClass:"iconfont ",class:t.checkedList.includes(s.id)?"icon-select-fill":"icon-select-unfill",attrs:{slot:"left"},on:{click:function(i){return t.check(s.id)}},slot:"left"}):i("span",{staticClass:"index",attrs:{slot:"left"},slot:"left"},[t._v(t._s(e+1))]),i("div",{staticClass:"track-info",attrs:{slot:"center"},on:{click:function(s){return t.trackClick(e)}},slot:"center"},[i("div",{staticClass:"track-title"},[t._v(t._s(s.name))]),i("span",{staticClass:"track-artist"},[t._v(t._s(t.artists(s.ar)))]),i("span",{staticClass:"track-album"},[t._v(t._s(s.al.name))])]),i("i",{staticClass:"iconfont icon-more--line",attrs:{slot:"right"},on:{click:function(i){return i.stopPropagation(),t.showMore(s)}},slot:"right"})])],1)}))],2)},g=[],k=i("c6fb"),b={name:"PlaylistList",components:{SongView:k["a"]},mixins:[r["b"],r["e"],r["h"]],props:{item:{type:Array,default:function(){return[]},required:!0},multiSelect:{type:Boolean,default:!1},newList:{type:Boolean,default:!1}},methods:{addSong:function(){this.$emit("addSong")},showMore:function(t){this.$emit("trackMoreClick",t)},trackClick:function(t){this.$emit("trackClick",t)}},watch:{item:function(){this.$nextTick((function(){this.loading=!1,this.$emit("dataLoaded")}))}}},y=b,C=(i("b8f6"),Object(p["a"])(y,v,g,!1,null,"5083b5b4",null)),w=C.exports,_=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"add-song"},[i("nav-bar",{staticClass:"nav",attrs:{isDisabled:!0}},[i("span",{attrs:{slot:"center"},slot:"center"},[t._v("添加音乐到歌单")]),i("span",{attrs:{slot:"right"},on:{click:t.goBack},slot:"right"},[t._v("完成")])]),i("div",{staticClass:"header"},[t._v("最近播放")]),i("scroll",t._l(t.songs,(function(s){return i("div",{key:s.id,staticClass:"song-wrapper",attrs:{padding:10},on:{click:function(i){return t.addSong(s.id)}}},[i("song-view",[i("img",{attrs:{slot:"left",src:t.fmtUrl(s.al.picUrl)},slot:"left"}),i("div",{staticClass:"song",attrs:{slot:"center"},slot:"center"},[i("div",{staticClass:"title"},[t._v(t._s(s.name))]),i("span",{staticClass:"artist"},[t._v(t._s(t.artists(s.ar)))]),i("span",{staticClass:"album"},[t._v(t._s(s.al.name))])])])],1)})),0)],1)},$=[],P=(i("c740"),i("d81d"),i("2909")),O=i("8d33"),x=i("e47a"),j=i("d324"),S=i("5d86"),I={name:"PlaylistAdd",components:{NavBar:x["a"],Scroll:O["a"],SongView:k["a"]},mixins:[r["b"],r["d"]],data:function(){return{songs:[]}},created:function(){this.songs=Object(P["a"])(this.historyList).reverse()},methods:{goBack:function(){this.$router.go(-1)},addSong:function(t){var s=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var e,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e=s.$route.params.id,a=[],i.next=4,Object(S["d"])(e).then((function(t){t.playlist.trackIds.map((function(t){a.push(t.id)}))}));case 4:return i.next=6,Object(j["a"])("add",e,t,s.cookie).then((function(i){if(200===i.code){var e=a.findIndex((function(s){return s===t}));e<0?s.$toast.show("添加成功",1e3):s.$toast.show("歌单内歌曲重复",1e3)}else i.code,s.$toast.show(i.message,1e3)}));case 6:case"end":return i.stop()}}),i)})))()}},computed:Object(c["a"])({},Object(d["c"])(["historyList","cookie"]))},M=I,L=(i("1e7c"),Object(p["a"])(M,_,$,!1,null,"b357a1d2",null)),A=L.exports,U=i("95c7"),N=i("d441"),B=i("6ae1"),T={name:"Playlist",components:{PlaylistDisplay:m,PlaylistList:w,NavBar:x["a"],ScrollView:U["a"],AddSong:A,Popup:N["a"],MoreSongOptions:B["a"]},mixins:[r["c"],r["g"],r["d"],r["b"],r["f"]],created:function(){var t=this;Object(S["d"])(this.$route.params.id).then((function(s){var i;t.playlistInfo=s.playlist,t.playlistName=s.playlist.name,t.playlistInfo.creator.userId===t.profile.uid?t.myPlaylist=!0:t.myPlaylist=!1,s.playlist.trackIds.length?(i=s.playlist.trackIds.length>700?t.getTrackIds(s.playlist.trackIds.slice(0,700)):t.getTrackIds(s.playlist.trackIds),Object(S["j"])(i).then((function(s){console.log(s),t.tracks=s.songs}))):t.newList=!0})),this.isLogin&&this.getUserPlaylist()},data:function(){return{playlistInfo:{},tracks:[],userPlaylists:[],subscribePlaylists:[],newList:!1,toggleAddMenu:!1,myPlaylist:!1,selectMode:!1,checkAll:!1,isChecked:!1,showMoreOption:!1,song:{}}},methods:Object(c["a"])(Object(c["a"])({},Object(d["b"])(["setPlayList"])),{},{addSong:function(){this.toggleAddMenu=!0,this.togglePopUp()},addToPlayer:function(){if(this.isChecked){var t,s=this.$refs.list.checkedList;this.isChecked&&(t=this.tracks.filter((function(t){return s.includes(t.id)}))),console.log(t),this.$refs.trackPopUp.addToPlayer("",t),this.$refs.list.unCheckAll(),this.checkAll=!1}},moreOption:function(){this.showMoreOption=!this.showMoreOption},noFunc:function(){this.$toast.show("暂时还没完成哦",500)},selectPlaylist:function(){var t=this.$refs.list.checkedList.join(",");this.$refs.trackPopUp.selectPlaylist("",t)},share:function(){var t=this,s="分享".concat(this.artists(this.trackInfo.ar),"的单曲 ").concat("«"+this.trackInfo.name+"»"," https://syhua4.github.io/pear-music-app/#/song/").concat(this.trackInfo.id);this.$copyText(s).then((function(){t.$toast.show("复制链接成功",1e3)}),(function(){t.$toast.show("复制链接失败, 请重试",1e3)}))},subPlaylist:function(){var t=this;this.isLogin?this.subscribed?Object(j["k"])(2,this.$route.params.id,this.cookie).then((function(s){200===s.code&&(t.subscribePlaylists=t.subscribePlaylists.filter((function(s){return s.id!==Number(t.$route.params.id)})))})):Object(j["k"])(1,this.$route.params.id,this.cookie).then((function(s){200===s.code&&t.subscribePlaylists.push(t.playlistInfo)})):this.$toast.show("请先登录",500)},goBack:function(){this.$router.go(-1)},getUserPlaylist:function(){var t=this;Object(j["f"])(this.profile.uid,this.cookie).then((function(s){t.userPlaylists=s.playlist.filter((function(s){return s.creator.userId===t.profile.uid})),t.subscribePlaylists=s.playlist.filter((function(s){return s.creator.userId!==t.profile.uid}))}))},checked:function(t){this.isChecked=t,this.$refs.list.checkedList.length===this.tracks.length?this.checkAll=!0:this.checkAll=!1},multiSelect:function(){this.selectMode=!this.selectMode},removeSong:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function s(){var i,e,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=t.playlistInfo.id,e=t.$refs.list.checkedList,a=e.join(","),s.next=5,Object(j["a"])("del",i,a,t.cookie).then((function(s){if(200===s.code){t.$toast.show("删除成功",500);var i=t.tracks.filter((function(t){return!e.includes(t.id)}));t.tracks=i}t.$refs.list.unCheckAll(),t.checkAll=!1}));case 5:case"end":return s.stop()}}),s)})))()},selectAll:function(){this.checkAll?this.$refs.list.unCheckAll():this.$refs.list.checkAll(),this.checkAll=!this.checkAll},play:function(t){this.playSong(this.tracks,t)},trackMoreClick:function(t){this.song=t,this.$refs.trackPopUp.showMore=!0}}),computed:Object(c["a"])(Object(c["a"])({},Object(d["c"])(["profile","songlist","currentIndex","isLogin","cookie"])),{},{subscribed:function(){var t=this,s=this.subscribePlaylists.filter((function(s){return s.id===Number(t.$route.params.id)}));return s.length>0}}),watch:{showUserPlaylist:{handler:function(t){var s=this;t&&setTimeout((function(){s.$refs.scroll.refresh()}),1e3)}}}},E=T,F=(i("bf63"),Object(p["a"])(E,e,a,!1,null,"f2fc07e8",null));s["default"]=F.exports},b8f6:function(t,s,i){"use strict";var e=i("e6b2"),a=i.n(e);a.a},bc44:function(t,s,i){},bf63:function(t,s,i){"use strict";var e=i("39a1"),a=i.n(e);a.a},e6b2:function(t,s,i){}}]);