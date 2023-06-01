const { relativeRoot } = require('./utils');

module.exports = {
  '@model': relativeRoot('src/model'),
  '@constants': relativeRoot('src/constants'),
  '@hooks': relativeRoot('src/hooks'),
  '@components': relativeRoot('src/components'),
  '@api': relativeRoot('src/api'),
  '@assets': relativeRoot('src/assets'),
  '@utils': relativeRoot('src/utils'),
};
