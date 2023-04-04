module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/parser',
  },
  extends: [
    'prettier',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
}
