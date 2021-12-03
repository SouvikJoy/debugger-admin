import './vee-validate';
import VueSvgInlinePlugin from './vue-svg-inline';

export default {
  install: (app) => {
    app.use(VueSvgInlinePlugin);
  }
};
