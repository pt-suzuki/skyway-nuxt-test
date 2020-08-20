module.exports = {
  'plugins': [
    'stylelint-scss',
  ],
  'extends': 'stylelint-config-prettier',
  'rules': {
    'declaration-block-trailing-semicolon': 'always',
    'scss/dollar-variable-colon-space-after': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'max-nesting-depth': 5,
  }
};
