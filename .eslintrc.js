module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true, // Defines things like process.env when generating through node
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "airbnb"
    ],
    parser: "@babel/eslint-parser", // Uses babel-eslint transforms.
    parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        babelOptions: {
            presets: ["@babel/preset-react"]
        }
    },
    plugins: ["prettier", "react", "react-hooks", "import"],
    root: true, // For configuration cascading.
    rules: {
        eqeqeq: "error",
        "no-console": "off",
        "no-shadow": "off",
        "prefer-const": "off",
        "prettier/prettier": "warn",
        "react/display-name": "off",
        "react/no-children-prop": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "off",
        "react/function-component-definition": "off",
        "object-curly-newline": "off",
        "linebreak-style": ["error", "windows"],
        indent: ["error", 4],
        quotes: ["warn", "double"],
        semi: [2, "never"],
        "comma-dangle": ["error", "never"],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "arrow-body-style": ["error", "always"],
        "operator-linebreak": ["error", "after"],
        "react/jsx-no-constructed-context-values": "off"
    },
    settings: {
        react: {
            version: "detect" // Detect react version
        }
    },
    ignorePatterns: ["node_modules", "build", "dist", "public"]
}
