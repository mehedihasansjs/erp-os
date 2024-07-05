// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-min-length': [2, 'always', 20], // Enforce minimum body length of 20 characters
    'footer-min-length': [2, 'always', 20], // Enforce minimum footer length of 20 characters
    'references-empty': [2, 'never'], // Enforce that commits must have a reference in the footer
  },
};
