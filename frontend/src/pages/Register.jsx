import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUsers, saveUsers} from "../data/mockUsers"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

function Register () {
    const navigate = useNavigate()
    const [form, setFrom] = useState({
        name: "", lastname: "", email: "", password: "", phone: ""
    })

    const handleChange = (e) => {
        setFrom({...form, [e.target.name]:e.target.value})
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const users = getUsers()
        const emailExists = users.some((users) => users.email === form.email)
        
        if(!emailExists){
            alert("Registrado previamente")
            return
        }

        const newUser = {
            _id: Date.now().toString,
            ...form,
            isActive: true,
            role: "users"
        }

        const updatedUsers = [...users, newUser]
        saveUsers(updatedUsers)
        alert("Registrado")
        navigate("/")
    }

    return (
        <div className="container">
            <Card>
                <form onSubmit={handleRegister}>
                    <h2>Registro</h2>
                    <Input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
                    <Input type="text" name="lastname" placeholder="Apellido" onChange={handleChange} />
                    <Input type="email" name="email" placeholder="Correo" onChange={handleChange} />
                    <Input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                    <Input type="phone" name="phone" placeholder="Telefono" onChange={handleChange} />  
                
                    <Button type="submit" text="Register" />
                </form>
            </Card>
        </div>
    )
}

export default Register