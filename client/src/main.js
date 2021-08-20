import Vue from 'vue';
import GSignInButton from 'vue-google-signin-button';
import { LoaderPlugin } from 'vue-google-login';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(GSignInButton);

Vue.use(LoaderPlugin, {
  client_id: '736701279849-82f1tfij11uq4gclk896sgtcmm82qdag.apps.googleusercontent.com',
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
