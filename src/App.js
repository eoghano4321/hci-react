import Home from "./Home.js";
import Contact from "./Contact.js";
import Upload from "./Upload.js";
import { Routes, Route} from "react-router-dom";
import Signin from "./Signin.js";
import Admin from "./Admin.js";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store.js';


function App() {
  return (
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="upload" element={<Upload />} />
            <Route path="signin" element={<Signin />} />
            <Route path="admin" element={<Admin />} />
        </Routes>
      </PersistGate>
    </Provider>

  );
}
export default App;