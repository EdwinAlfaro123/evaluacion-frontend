export const mockUsers = [
    {
        _id: "1",
        name: "Edwin",
        lastname: "Alfaro",
        email: "edwin@gmail.com",
        password: "1234",
        phone: "4444-4444"
    }
]

export const getUsers = () => {
    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : mockUsers
}

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users))
}