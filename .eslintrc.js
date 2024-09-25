module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'jsdoc'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:jsdoc/recommended-typescript-error',
    'prettier',
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'never',
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'warn',
    'unused-imports/no-unused-imports': 'error',
    // JSDoc の記述を強制する
    // public なメンバーに対してのみ適用
    'jsdoc/require-jsdoc': [
      'error',
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
        },
        contexts: ['VariableDeclaration', 'TSMethodSignature'],
      },
    ],
    // 分割代入は対象外
    'jsdoc/require-param': [
      'error',
      {
        checkDestructuredRoots: false,
      },
    ],
    // jsdoc/require-jsdoc のみだと、空のコメントブロックが許可されてしまうため以下を追加
    'jsdoc/require-description': [
      'error',
      {
        contexts: [
          'ArrowFunctionExpression',
          'ClassDeclaration',
          'ClassExpression',
          'FunctionDeclaration',
          'FunctionExpression',
          'MethodDefinition',
          'PropertyDefinition',
          'VariableDeclaration',
          'TSMethodSignature',
        ],
      },
    ],
    'jsdoc/require-returns': ['off'],
    // TSDoc 特有のタグを許可する
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['typeParam', 'remarks'],
      },
    ],
    // タグの記述順序の統一
    'jsdoc/sort-tags': [
      'error',
      {
        reportIntraTagGroupSpacing: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      rules: {
        'jsdoc/require-returns': ['error'],
        'jsdoc/require-returns-type': ['error'],
        // TypeScript では型情報が自動的に管理されるため、型情報の記述は不要
        'jsdoc/no-types': ['off'],
      },
    },
    {
      // page.tsxファイルにはJSDoc不要
      files: [
        'src/app/**/page.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/loading.tsx',
        'src/app/**/not-found.tsx',
        'src/app/**/error.tsx',
        'src/app/**/template.tsx',
        'src/app/**/default.tsx',
      ],
      rules: {
        'jsdoc/require-jsdoc': 'off',
        'jsdoc/require-description': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-returns': 'off',
      },
    },
  ],
  ignorePatterns: ['rollup.config.js'],
};
