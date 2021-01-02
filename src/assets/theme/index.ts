import {
  theme as chakraTheme,
  extendTheme,
} from '@chakra-ui/react';

const customTheme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    vibrantBlue: {
      50: '#dbf5ff',
      100: '#b3e1fb',
      200: '#88cff3',
      300: '#5dc1ed',
      400: '#33b6e6',
      500: '#1990cc',
      600: '#0866a0',
      700: '#004074',
      800: '#002248',
      900: '#00091d',
    },
  },
};

const theme = extendTheme({ ...customTheme });

export default theme;
