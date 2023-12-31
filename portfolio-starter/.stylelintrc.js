module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": ["stylelint-scss"],
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "no-descending-specificity": null,
    "color-function-notation": "legacy", // Allow legacy RGB notation
    "alpha-value-notation": "number" // Use number for alpha values
  },
}
