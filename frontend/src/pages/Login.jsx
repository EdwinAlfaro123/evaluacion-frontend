import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getUsers} from "../data/mockUsers"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        const users = getUsers()
        const userFound = users.find(
            (user) => user.email === email && user.password === password
        )

        if(!userFound){
            alert("Credenciales Incorrectas")
            return
        }

        localStorage.setItem("userLogged", JSON.stringify(userFound))
        alert("Login exitoso")
        navigate("/dashboard")
    }

    return (
        <div className="container">
            <Card>
                <form onSubmit={handleLogin}>
                    <Input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" text="Ingreasar"/>

                    <div className="links">
                        <Link to="/register">Crear</Link>
                        <Link to="/recovery">Recuperar</Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login