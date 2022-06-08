import React from 'react';
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <Router>
       <Routes>
         <Route element={"here"} path="/" ></Route>
         <Route element={"here"} path="/khobaocao"></Route>
       </Routes>
     </Router>
    </div>
  );
}

export default App;
