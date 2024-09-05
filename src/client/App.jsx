import "./Assets/index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./Components/Layout";
import Home from './Pages/Home';
import Login from "./Components/Login.jsx";
import Failure from "./Pages/Failure.jsx";
import SignUp from "./Pages/SignUp.jsx";
import { AuthProvider } from "./Hooks/AuthContext.jsx";
import Plans from "./Pages/Plans.jsx";
import Create from "./Pages/Create.jsx";


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="failure" element={<Failure />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="plans" element={<Plans/>}/>
              <Route path="create" element={<Create/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
