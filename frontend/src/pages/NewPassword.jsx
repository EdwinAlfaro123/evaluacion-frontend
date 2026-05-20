import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUsers, saveUsers} from "../data/mockUsers"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

function NewPassword (){
    const navigate = useNavigate()
    const [form, setForm] = useState({password:"", confirmPassword:""})
    const handleChange = (e) => {setForm({...form, [e.target.value]:e.target.value})}

    const handleNewPassword = (e) => {
        e.preventDefault()
        const recoveryEmail = localStorage.getItem("recoveryEmail")
        if(!recoveryEmail){
            alert("Ingresa tu correo")
            navigate("/recovery-password")
            return
        }

        if(!form.password !== form.confirmPassword){
            alert ("No coincide")
            return
        }

        const users = getUsers()
        const updatedUsers = users.map((user) => user.email === recoveryEmail ? {...user, password:form.password}:user)

        saveUsers(updatedUsers)
        localStorage.removeItem("recoveryEamil")
        alert("Actualiazdo")
        navigate("/")
    }

    return (
        <div className="container">
            <Card>
                <form onSubmit={handleNewPassword}>
                    <h2>Nueva Contraseña</h2>
                    <Input type="password" name="password" placeholder="Nueva Contraseña" onChange={handleChange}/>
                    <Input type="password" name="confirmpassword" placeholder="Confirmar Contraseña" onChange={handleChange}/>
                    <Button type="sumbit" text="Actualizar"/>
                </form>
            </Card>
        </div>
    )
}

export default NewPassword