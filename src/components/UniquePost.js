import { useEffect, useState } from "react";
import { uniquePost, updatePost } from "../Api";
import { NavLink } from "react-router-dom";
import '../styles/UniquePost.css'
const EditPostForm = (props) => {
    const { title, text, published } = props;
    const initialState = { title, text, published };
    const [formData, setFormData] = useState(initialState);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePost(props.dbId, formData);
        props.setEditMode(false);
    };
    return (
        <form method="POST" action="">
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
                    <option value="true">true</option>
                    <option value="false">false</option>
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
const Comment = ({ userName, text, timestamp }) => {
    return (
        <div className="comments">
            <p>{userName}</p>
            <p>{text}</p>
            <p>{timestamp}</p>
        </div>
    );
};
export const UniquePost = (props) => {
    const { author, postId } = props;
    const [isEditMode, setEditMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [postComments, setPostComments] = useState(null);

    const renderComments = () => {
        return postComments.map((comment) => {
            return (
                <Comment
                    key={comment._id}
                    userName={comment.user_name}
                    text={comment.text}
                    timestamp={comment.timestamp}
                />
            );
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await uniquePost(postId);
                setCurrentPost(result.post);
                setPostComments(result.comment);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [postId]);
    if (isEditMode === true) {
        return (
            <EditPostForm
                {...currentPost}
                editMode={isEditMode}
                setEditMode={setEditMode}
            />
        );
    }
    if (!currentPost) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    // here we need to call the api to get the messages and all the info of this post
    return (
        <div className="content">
            <div className="post">
                <h2 className="title">{currentPost.title}</h2>
                <h2 className="author">
                    {author.first_name + " " + author.last_name}
                </h2>
                <h4>{currentPost.timestamp}</h4>
                <p className="post-content">{currentPost.text}</p>
                <button onClick={() => setEditMode(!isEditMode)}>
                    Edit Post
                </button>
            </div>
            {postComments.length > 0 ? renderComments() : ""}
        </div>
    );
};
