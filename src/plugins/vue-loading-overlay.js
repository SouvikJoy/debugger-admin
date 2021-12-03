import VueLoading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  install: (app) => {
    app.use(VueLoading);
  }
};
