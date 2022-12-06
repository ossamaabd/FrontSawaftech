import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSimpleAlert from "vue-simple-alert";
import VueSweetalert2  from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css'
  
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false
Vue.use(VueSweetalert2)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
