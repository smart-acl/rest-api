module.exports = {
    root: true,
    plugins: [
        'eslint-plugin',
        '@typescript-eslint',
        'import'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // Code-style
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        camelcase: 0,
        'class-methods-use-this': 0,
        'consistent-return': 0,
        'comma-dangle': [
            'warn',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline'
            }
        ],
        quotes: ['error', 'single'],
        'import/no-extraneous-dependencies': 0,
        'import/order': [
            'warn',
            {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    ['parent', 'sibling'],
                    'index'
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                'newlines-between': 'always'
            }
        ],
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'max-len': [
            'error',
            {
                code: 150,
                tabWidth: 4,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'max-params': 0,
        'space-in-parens': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'space-before-blocks': ['error', 'always'],
        'keyword-spacing': ['error', { before: true, after: true }],
        semi: ['error', 'always'],
        'eol-last': ['error', 'always'],
        'no-cond-assign': [
            'error',
            'except-parens'
        ],
        'no-implicit-coercion': 0,
        'no-else-return': 0,
        'no-extra-boolean-cast': 0,
        'no-nested-ternary': 0,
        'no-plusplus': 0,
        'no-prototype-builtins': 0,
        'no-return-await': 0,
        'no-underscore-dangle': 0,
        'no-unused-vars': 0,
        'no-use-before-define': 0,
        'no-useless-escape': 0,
        'prefer-rest-params': 0,
        'object-curly-spacing': [
            'error',
            'never'
        ],
        'operator-linebreak': 0,
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'no-console': 'error',
        'no-process-exit': 'error',
        'no-multiple-empty-lines': ["warn", { "max": 1 }],
        'brace-style': ["warn", "1tbs", { "allowSingleLine": false }],

        // TypeScript
        '@typescript-eslint/no-unnecessary-type-assertion': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-angle-bracket-type-assertion': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/await-thenable': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                "vars": "all",
                "args": "all",
                "varsIgnorePattern": "^_",
                "argsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        '@typescript-eslint/semi': 1,

        // ASCII
        'ascii/valid-name': 0
    }
};
