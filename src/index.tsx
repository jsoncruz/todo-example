import React, { StrictMode } from 'react';

import {
  ColorModeScript,
  ChakraProvider,
} from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import theme from './assets/theme';
import Routes from './routes';
import store from './store';

ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root'),
);
