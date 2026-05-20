function Button ({
    text, type="button", onClick
}) {
    return (
        <Button type={type} onClick={onClick}>
            {text}
        </Button>
    )
}

export default Button