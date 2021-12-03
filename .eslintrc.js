module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'import/first': 'off',
    'keyword-spacing': ['error', { before: true, after: true }],
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-function-paren': ['error', 'never'],
    semi: ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-prop-type-constructor': 'off',
    'vue/require-prop-types': 'off',
    'vue/html-indent': ['error', 'tab'],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/no-v-html': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-template-shadow': 'off',
    'vue/singleline-html-element-content-newline': ['off'],
    camelcase: 'off'
  }
};
