import Vue from 'vue';

import axios from 'axios'
import App from './App.vue';
import StarRating from 'vue-star-rating'

Vue.prototype.$axios = axios
Vue.component('star-rating', StarRating);

new Vue({
  el: '#app',
  render: h => h(App)
});
