export default [
  {
    ignores: ["dist/", "node_modules/"],
  },
  {
    files: ["**/*.js"], // adjust based on your project
    languageOptions: {
      ecmaVersion: "latest", // or 2021 if you prefer
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["warn"],
      "no-console": "off",
    },
  },
];
