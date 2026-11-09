import { useState } from "react"

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const apiUrl = "http://localhost:8000"

    const handleSubmit = () => {
        setError("");
        //check inputs
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl+"/todos", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if(res.ok) {
                    //add item to list
                    setTodos([...todos, { title, description }]);
                    setMessage("Item added successfully!");
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                } else {
                    //set error
                    setError("Unable to create Todo item");
                }
            }).catch(() => {
                setError("Unable to create Todo item");
            })
        }
    }

    return <>
        <div className="row p-3 bg-success text-light">
            <h1>TODO Project with MERN stack</h1>
        </div>
        <div className="row">
            <h3>Add Item</h3>
            { message && <p className="text-success">{message}</p> }
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" />
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" />
                <button className="btn btn-dark" onClick={handleSubmit} >Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    </>
}