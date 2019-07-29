module.exports = {
	root: true,
	extends: '@react-native-community',
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 4,
				singleQuote: true,
				'object-curly-spacing': ['error', 'always'],
				'array-bracket-spacing': ['error', 'always'],
				'computed-property-spacing': ['error', 'always']
			}
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'never',
				imports: 'never',
				exports: 'never',
				functions: 'ignore'
			}
		]
	}
};
