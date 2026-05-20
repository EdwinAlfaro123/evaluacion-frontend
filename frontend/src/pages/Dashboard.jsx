import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import {getPosts, savePosts} from "../data/mockPosts"
import Input from "../components/Input"
import Button from "../components/Button"
import Card from "../components/Card"

function Dashboard (){
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [editingPost, setEditingPost] = useState(null)
    const [addingPost, setAddingPosts] = useState(false)

    const [formData, setFormData] = useState({userId:"", title:"", body: ""})

    const loadPosts = () => {
        userlogged = localStorage.getItem("userLogged")
        if(!userlogged){
            navigate("/")
            return
        }

        const usersData = getUsers()
        setPosts(getPosts)
    }

    useEffect(() => {loadPosts()}, [])
    const logout = () => {
        localStorage.removeItem("userLogged")
        navigate("/")
    }

    const deletePost = (id) => {
        const confirmDelete = window.confim("¿Seguro?")
        if(!confirmDelete) return
        const updatedPosts = posts.filter((post) => post._id !== id)
        savePosts(updatedPosts)
        setPosts(updatedPosts)
    }

    const openEdit = (post) => {
        setEditingPost(post._id)
        setFormData({
            userId: post.userId,
            title: post.title,
            body: post.body
        })
    }

    const handleChange = (e)  => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const addPost = () => {
        if(!formData.userId || formData.title){
            alert("Ingrese los datos necesarios")
            return
        }
    }

    const newPost = {
        userId: Number(formData.userId),
        ID: Date.now(),
        title: formData.title,
        body: formData.body
    }

    const updatedPosts = [...posts, newPost]
    savePosts(updatedPosts)
    setPosts(updatedPosts)

    const updatedPost = () => {
        const updatedPosts = posts.map((post) => post.id === editingPost ? {
            ...post,
            userId: Number(formData.userId),
            title: formData.title,
            body: formData.body
        }: post
    )
    savePosts(updatedPosts)
    savePosts(updatedPosts)
    alert("Actualizado")
    setEditingPost(null)
    }

    return(
        <div className="container">
            <Card>
                <div className="dashboard-header">
                    <h1 className="title">Dashboard</h1>
                    <div className="actions">
                        <Button className="edit-btn" onClick={addPost}>
                            Agregar
                        </Button>
                        <Button className="logout-btn" onClick={logout}>
                            Salir
                        </Button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>Id</th>
                                <th>Titulo</th>
                                <th>Contenido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.userId}</td>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                        <div className="actions">
                                            <Button className="edit-btn" onClick={() => openEdit(post)}>
                                                Editar
                                            </Button>

                                            <Button className="delete-btn" onClick={() => deletePost(post.id)}>
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {addingPost && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Agregar</h2>
                        <Input type="number" name="userId" placeholder="UserID" value={formData.userId} onChange={handleChange} />
                        <Input type="text" name="title" placeholder="Titulo" value={formData.title} onChange={handleChange} />
                        <Input type="text" name="body" placeholder="Contenido" value={formData.userId} onChange={handleChange} />
                        
                        <div className="modal-buttons">
                            <Button text="Guardar" onClick={addPost} />
                            <Button className="cancel-btn" onClick={() => setAddingPosts(false)}>Cancelar</Button>
                        </div>
                    </div>
                </div>
            )}
            {
                editingPost && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Actualizar</h2>
                            <Input type="number" name="userId" placeholder="UserID" value={formData.userId} onChange={handleChange} />
                            <Input type="text" name="title" placeholder="Titulo" value={formData.title} onChange={handleChange} />
                            <Input type="text" name="body" placeholder="Contenido" value={formData.userId} onChange={handleChange} />

                            <div className="modal-buttons">
                                <Button text="Actualizar" onClick={updatedPost}/>
                                <Button className="cancel-btn" onClick={() => setEditingPost(null)}>Cancelar</Button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Dashboard