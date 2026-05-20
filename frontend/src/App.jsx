import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import RecoveryPassword from "./pages/RecoveryPassword.jsx"
import NewPassword from "./pages/NewPassword.jsx"
import Dashboard from "./pages/Dashboard.jsx"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<RecoveryPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App