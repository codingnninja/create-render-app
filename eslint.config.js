import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  ...compat.extends("standard"),
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      semi: ["error", "always"],
      "no-multi-spaces": ["error"],
      "no-console": "error",
      quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true, multiline: true }],
      "prefer-template": "error",
      "strict": ["error", "global"],
      "no-param-reassign": "error",
      "no-alert": "error",
      "prefer-const": "error",
      "no-multi-str": "error",
      "no-template-curly-in-string": "error"
    }
  }
];

/*
Todo:
1. eslint should force users to use backticks for block strings
2. eslint should force users to add semi-colon at the end of all lines
3. eslint should ensure users type correct html attritubes
4. ignore $render, $trigger, $state, stringify, $purify, $select, any props passed with {} and $utils if not defined.
5. Make it possible to install a component like (npx create-render-app gallery --component).
6. eslint should force users to users to wrap destructured param with an object.
7. Make the download works in the player.
8. Make .vscode/setting.json for eslint to work directly.
9. Make vscode show html element properties while typing
*/
