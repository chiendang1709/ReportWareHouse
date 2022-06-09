import React from 'react';
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from './pages/Home/Home';
import Report from './pages/Report/Report';


function App() {
  return (
    <div className="App">
     <Router>
       <Routes>
         <Route element={<Home/>} path="/" ></Route>
         <Route element={<Report/>} path="/report" ></Route>
       </Routes>
     </Router>
    </div>
  );
}

export default App;
