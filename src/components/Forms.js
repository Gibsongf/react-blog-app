import { useState } from "react";
import { newPost, updatePost } from "../Api";
// import "../styles/UniquePost.css";

export const PostEditForm = (props) => {
    const { title, text, published, setHomeUpdate, homeUpdate } = props;
    const initialState = { title, text, published };
    const [formData, setFormData] = useState(initialState);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const changeBooleanName = (e) => {
        if(e === false){
            return 'No'
        } else {
            return 'Yes'
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePost(props._id, formData);
        props.setEditMode(false);
        setHomeUpdate(!homeUpdate);
    };
    // const publishedValue = () => {
    //     const reverse = !published;
    //     return reverse.toString();
    // };
    return (
        <form method="POST" action="" className="edit-post-form">
            <div className="title">
                {/* <label htmlFor="title">Title:</label> */}
                <input
                    type="text"
                    id="post-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="post-text">
                {/* <label htmlFor="post-text">Text:</label> */}
                <textarea
                    type="text"
                    name="text"
                    id="post-text"
                    minLength="10"
                    value={formData.text}
                    onChange={handleInputChange}
                    required={true}
                ></textarea>
            </div>
            {/* need to pass the published value as default */}
            <div className="published">
                <label htmlFor="published">Published:</label>
                <select
                    name="published"
                    id="published"
                    onChange={handleInputChange}
                >
                    <option value={published}>{changeBooleanName(published)}</option>
                    <option value={!published}>{changeBooleanName(!published)}</option>
                </select>
            </div>
            <button className="confirm-edit" onClick={handleSubmit} type="submit">
                Confirm Edit
            </button>
            <button className="cancel-edit" onClick={() => props.setEditMode(false)} type="button">
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
    // some func to check if the input has the min len and change border color if not  to inform user
    const handleSubmit = (e) => {
        e.preventDefault();
        newPost(formData);
        props.setWasUpdated(!props.wasUpdated);
    };
    return (
        <form method="post" className="new-post">
            {/* <label htmlFor="title">Title:</label> */}
            <input
                placeholder="Title"
                type="text"
                name="title"
                id="title"
                onChange={handleInputChange}
                required={true}
            />
            <textarea
                placeholder="Write your new post"
                type="text"
                name="text"
                id="text"
                minLength="10"
                onChange={handleInputChange}
                required={true}
            ></textarea>
            {/* /> */}
            <div className="published">
                <label htmlFor="published">Published: </label>
                <select
                    name="published"
                    id="published"
                    onChange={handleInputChange}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </div>
            <button className="submit-new-post" onClick={handleSubmit} type="submit">
                Save Post
            </button>
        </form>
    );
};
