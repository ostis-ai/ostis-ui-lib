const { IS_DEV } = require('./env');

const tsRule = {
  test: /\.tsx?/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: [
          IS_DEV && require.resolve('react-refresh/babel'),
          ['@babel/plugin-transform-runtime', { regenerator: true }],
        ].filter(Boolean),
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
          ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
        ],
      },
    },
  ],
};

const imagesRule = {
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: 'asset/resource',
};

const fontsRule = {
  test: /\.(woff(2)?|eot|ttf|otf|)$/,
  type: 'asset/resource',
};

const svgRule = {
  test: /\.svg$/,
  issuer: /\.tsx?$/,
  use: ['@svgr/webpack'],
};

const cssRule = {
  test: /\.s?css$/i,
  exclude: /\.m\.scss$/,
  use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
};

const cssModuleRule = {
  test: /\.m\.s?css$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: IS_DEV ? '[name]__[local]__[hash:base64:5]' : '[name]__[hash:base64:5]',
        },
      },
    },
    'postcss-loader',
    'sass-loader',
  ],
};

module.exports = [tsRule, imagesRule, fontsRule, svgRule, cssRule, cssModuleRule];
