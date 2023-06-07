import {useState } from "react";
import {newPost, updatePost } from "../Api";
// import "../styles/UniquePost.css";

export const PostEditForm = (props) => {
    const { title, text, published } = props;
    const initialState = { title, text, published };
    const [formData, setFormData] = useState(initialState);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePost(props._id, formData);
        props.setEditMode(false);
    };
    return (
        <form method="POST" action="" className="edit-form">
            <div className="title">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="post-text">
                <label htmlFor="post-text">Text:</label>
                <input
                    type="text"
                    id="post-text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                />
            </div>
            {/* need to pass the published value as default */}
            <div className="published">
                <label htmlFor="published">Published:</label>
                <select
                    name="published"
                    id="published"
                    onChange={handleInputChange}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>
            <button onClick={handleSubmit} type="submit">
                Confirm Edit
            </button>
            <button onClick={() => props.setEditMode(false)} type="button">
                Cancel
            </button>
        </form>
    );
};

export const FormNewPost = (props) => {
	const initialState = { text: "", title: "" };
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        newPost(formData);
        props.setWasUpdated(!props.wasUpdated);
        
    };
	return(
		<form method="post">
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                name="title"
                id="title"
                onChange={handleInputChange}
            />
            <input
                placeholder="Write your new post"
                type="text"
                name="text"
                id="text"
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit} type="submit">
                Post
            </button>
        </form>
	)
}