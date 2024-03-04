module.exports = {
	root: true,
	extends: [
		"@nuxt/eslint-config",

	],
	"rules": {
		"@typescript-eslint/no-unused-vars": [
			"off"
		],
		"vue/max-attributes-per-line": "off",
		"vue/attributes-order": "off",
		"vue/mustache-interpolation-spacing": "off",
		"vue/singleline-html-element-content-newline": "off",
		"vue/html-indent": "off",
		"vue/html-self-closing": "off",
		"vue/html-quotes": "off",
		"vue/html-closing-bracket-spacing": "off",
		"vue/no-multi-spaces": "off",
		"vue/attribute-hyphenation": "off",
		"vue/html-closing-bracket-newline": "off",
		"vue/first-attribute-linebreak": "off",
		"vue/v-slot-style": "off",
		"vue/no-multiple-template-root": "off",
		"no-useless-catch": "off",
	}
};