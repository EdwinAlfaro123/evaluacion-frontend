import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUsers} from "../data/mockUsers"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

function RecoveryPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const handlerRecovery = (e) => {
        e.preventDefault()
        const users = getUsers()
        const userExists = user.some((user) => user.email === email)
        
        if(!userExists){
            alert("No existe el correo")
            return
        }

        localStorage.setItem("recoveryEmail", email)
        alert("encontrado")
        navigate("/new-password")
    }

    return (
        <div className="container">
            <Card>
                <form onSubmit={handlerRecovery}>
                    <h2>Recuperar Contraseña</h2>
                    <Input text="email" name="email" placeholder="correo" onChange={(e) => setEmail(e.target.value)} />
                    <Button type="submit" text="Continuar" />
                </form>
            </Card>
        </div>
    )
}

export default RecoveryPassword