module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'vue',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'airbnb-base',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  // add your custom rules here
  rules: {
    'arrow-body-style': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        'js': 'never',
        'mjs': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': ['**/*.spec.js', 'stories/*.js'],
    }],
    'no-alert': 'off',
    'no-console': 'off',
    'no-shadow': ['error', {
      'allow': ['state'],
    }],
    'no-param-reassign': ['error', {
      'props': false,
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'max-len': ['error', { 'code': 120 }],
    'lines-between-class-members': 'off',
    'camelcase': ['off'],
    'no-shadow': ["error", {
      "allow": [ "LIST", "CONTENT", "EDIT" ]
    }],
    'no-underscore-dangle': ["error", {
      "allowAfterThis": true,
    }],
  },
  globals: {
    'FB': 'readonly',
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.ts','.tsx','.js','.jsx'],
      },
      "babel-module": {
        "~": "./src",
      },
      'alias': [
        ['~', __dirname + '/src'],
        ['@', __dirname + '/src'],
      ],
    },
  }
}
