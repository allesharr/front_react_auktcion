import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store";
import interceptors from './api/interceptors';
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core'
import { lightTheme, darkTheme } from './theme/theme'

interceptors(store as any)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider maxSnack={5}>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
      </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
