import { Provider } from "react-redux";
import { store } from "./redux-saga/store";
import "./App.css";
import { Dashboard } from "./components/dashboard";
import { UserDetails } from "./components/userDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:userId" element={<UserDetails />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
