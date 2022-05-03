import React, { Component } from "react";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import { store } from "./Store";
import RouterProvider from './routerProvider';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    );
  }
}

export default App;
