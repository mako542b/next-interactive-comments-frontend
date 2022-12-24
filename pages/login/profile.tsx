



const Profile = () => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:3000/profile',{
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOiI2M2E3MWUxY2JjYzVlMTBjZTkyZmI3NjAiLCJpYXQiOjE2NzE5MTk4NDAsImV4cCI6MTY3MTkxOTk2MH0.oqX-4iJY5v13vcZ6aee2hapA6ExkfSsg1CeQC5qHlWU"
            }
        })
        const data = await response.json()
        console.log(data)
    }



    return (
        <div>
            <button onClick={handleClick}>Get User</button>
        </div>
    )
}

export default Profile