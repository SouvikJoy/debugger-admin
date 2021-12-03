import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
import 'vue-svg-inline-plugin/src/polyfills';

export default {
  install: (app) => {
    app.use(VueSvgInlinePlugin, {
      attributes: {
        data: ['src'],
        remove: ['alt']
      }
    });
  }
};
