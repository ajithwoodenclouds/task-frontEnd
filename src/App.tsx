import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRouter from "./router/AppRouter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <AppRouter />
      </div>
    </Provider>
  );
};

export default App;
