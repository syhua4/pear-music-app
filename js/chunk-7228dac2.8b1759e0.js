(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7228dac2"],{"17b0":function(t,s,e){"use strict";var o=e("bc44"),i=e.n(o);i.a},"1b83":function(t,s,e){"use strict";var o=e("f6dc"),i=e.n(o);i.a},"498a":function(t,s,e){"use strict";var o=e("23e7"),i=e("58a8").trim,a=e("c8d2");o({target:"String",proto:!0,forced:a("trim")},{trim:function(){return i(this)}})},"4df0":function(t,s,e){"use strict";var o=e("7097"),i=e.n(o);i.a},7097:function(t,s,e){},"95c7":function(t,s,e){"use strict";var o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"scroll-view",style:{"--height":t.height}},[e("div",{ref:"cover",staticClass:"cover"},[t._t("cover")],2),e("div",{staticClass:"tools"},[t._t("tab"),e("div",{staticClass:"left-tool"},[t._t("left")],2),e("div",{staticClass:"right-tool"},[t._t("right")],2)],2),e("scroll",[t._t("component")],2)],1)},i=[],a=e("8d33"),n={name:"ScrollView",components:{Scroll:a["a"]},props:{height:{type:String,default:"35%"}}},c=n,r=(e("17b0"),e("2877")),l=Object(r["a"])(c,o,i,!1,null,"970440dc",null);s["a"]=l.exports},a3f2:function(t,s,e){"use strict";e.r(s);var o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"account"},[e("nav-bar",{class:t.isLogin?"account-nav":"nav"},[t.isLogin?t._e():e("i",{staticClass:"iconfont icon-back",attrs:{slot:"left"},slot:"left"}),e("div",{staticClass:"nav-title",attrs:{slot:"center"},slot:"center"},[t._v("网易邮箱账号登入")])]),t.isLogin?e("div",{staticClass:"account-info"},[e("scroll-view",{ref:"scrollView",attrs:{height:"20%"}},[e("div",{staticClass:"cover",attrs:{slot:"cover"},slot:"cover"}),e("div",{staticClass:"profile",attrs:{slot:"left"},slot:"left"},[e("img",{attrs:{src:t.profile.avatar}}),e("span",[t._v(t._s(t.profile.nickname))])]),e("div",{staticClass:"content",attrs:{slot:"component"},slot:"component"},[e("div",[t._v("Demo版没有登录信息哦")]),e("button",{staticClass:"logout",on:{click:t.logout}},[t._v("退出登录")])])])],1):e("login")],1)},i=[],a=(e("4795"),e("5530")),n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"login"},[e("form",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:"登录邮箱"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),e("input",{attrs:{type:"button",value:"登录",disabled:t.isDisable},on:{click:t.checkForm}}),e("input",{staticClass:"trial-btn",attrs:{type:"button",value:"一键体验"},on:{click:t.testLogin}})])])},c=[],r=(e("498a"),e("90b9")),l="syhua4@163.com",u="St12345",d={test_acc:l,test_pwd:u},p=e("2f62"),f={name:"Login",data:function(){return{email:"",password:""}},computed:{isDisable:function(){return!this.email.trim()||!this.password.trim()}},methods:Object(a["a"])(Object(a["a"])({},Object(p["b"])(["setLogin"])),{},{checkForm:function(){Object(r["d"])(this.email)?this.login():this.$toast.show("请输入正确的网易邮箱",1e3)},login:function(){var t=this;this.setLogin({email:this.email,password:this.password}).then((function(s){t.$toast.show(s,1e3),t.$router.push("/user")}))},testLogin:function(){this.email=d.test_acc,this.password=d.test_pwd,this.login()}})},v=f,m=(e("4df0"),e("2877")),h=Object(m["a"])(v,n,c,!1,null,"71cda968",null),g=h.exports,b=e("e47a"),w=e("95c7"),_={name:"Account",components:{Login:g,NavBar:b["a"],ScrollView:w["a"]},computed:Object(a["a"])({},Object(p["c"])(["isLogin","profile"])),methods:Object(a["a"])(Object(a["a"])({},Object(p["b"])(["setLogout"])),{},{logout:function(){var t=this;this.setLogout().then((function(s){s?(t.$toast.show("登出成功",1e3),setTimeout((function(){t.$router.push("/recommend")}),500)):t.$toast.show("登出失败, 请重试",1e3)}))}})},C=_,j=(e("1b83"),Object(m["a"])(C,o,i,!1,null,"7f53b687",null));s["default"]=j.exports},bc44:function(t,s,e){},c8d2:function(t,s,e){var o=e("d039"),i=e("5899"),a="​᠎";t.exports=function(t){return o((function(){return!!i[t]()||a[t]()!=a||i[t].name!==t}))}},f6dc:function(t,s,e){}}]);