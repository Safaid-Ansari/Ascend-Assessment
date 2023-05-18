import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Task from "./components/Task";
import List from "./components/List";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <h1> E-Commerce </h1> */}
        <Header></Header>
        <Routes>
          <Route path="/register" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          {/* 
          <Route path="/add-order" element={<AddOrder></AddOrder>}></Route>
          <Route path="/order-list" element={<Home></Home>}></Route> */}

          <Route path="/add-task" element={<Task></Task>}></Route>
          <Route path="/add-list" element={<List></List>}></Route>

          <Route path="/" element={<Main></Main>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
