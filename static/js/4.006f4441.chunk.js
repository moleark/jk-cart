(this["webpackJsonpjk-cart"]=this["webpackJsonpjk-cart"]||[]).push([[4],{124:function(e,t,r){"use strict";r.r(t),r.d(t,"ChangePasswordPage",(function(){return h}));var n=r(1),a=r.n(n),s=r(2),o=r(3),c=r(9),i=r(5),u=r(4),d=r(0),w=r(15),m=r(17),l=function(e,t,r,n){return new(r||(r=Promise))((function(a,s){function o(e){try{i(n.next(e))}catch(t){s(t)}}function c(e){try{i(n.throw(e))}catch(t){s(t)}}function i(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,c)}i((n=n.apply(e,t||[])).next())}))},h=function(e){Object(i.a)(r,e);var t=Object(u.a)(r);function r(){var e;return Object(s.a)(this,r),(e=t.apply(this,arguments)).schema=[{name:"orgPassword",type:"string",maxLength:60,required:!0},{name:"newPassword",type:"string",maxLength:60,required:!0},{name:"newPassword1",type:"string",maxLength:60,required:!0},{name:"submit",type:"submit"}],e.uiSchema={items:{orgPassword:{widget:"password",label:"\u539f\u5bc6\u7801",placeholder:"\u8f93\u5165\u539f\u6765\u7684\u5bc6\u7801"},newPassword:{widget:"password",label:"\u65b0\u5bc6\u7801",placeholder:"\u8f93\u5165\u65b0\u8bbe\u7684\u5bc6\u7801"},newPassword1:{widget:"password",label:"\u786e\u8ba4\u5bc6\u7801",placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u8bbe\u5bc6\u7801"},submit:{widget:"button",label:"\u63d0\u4ea4",className:"btn btn-primary"}}},e.onSubmit=function(t,r){return l(Object(c.a)(e),void 0,void 0,a.a.mark((function e(){var t,n,s,o,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.data,n=t.orgPassword,s=t.newPassword,o=t.newPassword1,s===o){e.next=4;break}return r.setError("newPassword1","\u65b0\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"),e.abrupt("return");case 4:return c=new m.c("tv/",void 0),e.next=7,c.changePassword({orgPassword:n,newPassword:s});case 7:if(!1!==e.sent){e.next=11;break}return r.setError("orgPassword","\u539f\u5bc6\u7801\u9519\u8bef"),e.abrupt("return");case 11:return w.v.replace(d.createElement(w.n,{header:"\u4fee\u6539\u5bc6\u7801",back:"close"},d.createElement("div",{className:"m-3  text-success"},"\u5bc6\u7801\u4fee\u6539\u6210\u529f\uff01"))),e.abrupt("return");case 13:case"end":return e.stop()}}),e)})))},e}return Object(o.a)(r,[{key:"render",value:function(){return d.createElement(w.n,{header:"\u4fee\u6539\u5bc6\u7801"},d.createElement(w.e,{className:"m-3",schema:this.schema,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,fieldLabelSize:2}))}}]),r}(d.Component)}}]);
//# sourceMappingURL=4.006f4441.chunk.js.map