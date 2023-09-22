import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import router from './router'
import { createPinia } from 'pinia';
import '@/assets/iconfont/iconfont.css'; // icon-font 字体
import '@/assets/iconfont/iconfont.js';
import SvgIcon from '@/components/SvgIcon.vue';
import Janus from "janus-gateway";
import adapter from "webrtc-adapter";
import { useMitt } from '@/hooks/utils';

const app =createApp(App);
const emitter = useMitt();

app.use(createPinia());
app.use(router);

let room=1234;

app.component('SvgIcon', SvgIcon);



const initJanus =()=>{
   return new Promise((resolve)=>{
    let setJanus: Janus
    if (!Janus.isWebrtcSupported()) {
      console.error("::: No webrtc support :::");
      return;
    }
    Janus.init({
      debug: true,
      dependencies: Janus.useDefaultDependencies({
        adapter,
      }),
      callback:()=>{
        setJanus=new Janus({
          server: 'wss://192.168.0.220:8989',
          success: () => {
            setJanus.attach({
              plugin: "janus.plugin.videoroom",
              success:(pluginHandle)=>{
                resolve(pluginHandle)
                // setJanus.destroy()
              },
              onmessage: function (msg, jsep) {
                window.console.log(" ::: message :::", JSON.stringify(msg));
                window.console.log(" ::: jsep :::", jsep);
                emitter.emit('onmessage',{
                  msg: msg,
                  jsep: jsep
                })
              },
              onlocaltrack: (track: unknown,on) => {
                emitter.emit('onlocaltrack',{track,on})
             },
             // 接收到远程的流时的处理
             onremotetrack: function (stream) {
                window.console.log(" ::: remote stream :::", stream);
                emitter.emit('onremotestream',stream)
              },
              oncleanup: function () {
                window.console.log(" ::: cleanup notification :::");
              },
              error: function (error) {
                console.log("::: Error attaching plugin :::" + error);
              },
            })
          },
          error: function (error) {
            window.console.log("::: error :::", error);
          },
          destroyed: function () {
            window.console.log("::: destroyed :::");
          },
        })
      }
    }) 

   })
}



initJanus().then((pluginHandle: any)=>{
  window.console.log("==pluginHandle>22",pluginHandle)
  app.config.globalProperties.$janusHandle = pluginHandle
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
})





