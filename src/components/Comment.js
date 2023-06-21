import { useState } from "react";
import { newComment } from "../Api";
import { ConfirmCommentDeletion, newContentValidator } from "./Forms";

export const NewComment = (props) => {
    const initialState = { user_name: "", comment_text: "" };
    const [formData, setFormData] = useState(initialState);
    const [validData, setValidData] = useState();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidData(newContentValidator(e));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validData) {
            newComment(props.postID, formData);
            props.setWasUpdated(!props.wasUpdated);
        }
    };
    return (
        <form method="post" className="new-comment-form">
            {/* <label htmlFor="user_name">Name:</label> */}
            <input
                placeholder="Name (min characters: 4)"
                type="text"
                name="user_name"
                id="user_name"
                onChange={handleInputChange}
                required
                // minLength={4}
            />
            <input
                placeholder="Write a comment (min characters: 4)"
                type="text"
                name="comment_text"
                id="comment_text"
                required
                // minLength={4}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit} type="submit">
                Comment
            </button>
        </form>
    );
};
export const PostComment = (props) => {
    const { userName, text, timestamp, postID, commentID } = props;
    const [isDeleteMode, setDeleteMode] = useState(false);
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const format_date = date.toLocaleString("en-US", options);
    return (
        <div className="comment">
            <p className="comment-username">{userName}</p>
            <p className="comment-timestamp">{format_date}</p>
            <p className="comment-text">{text}</p>

            {!isDeleteMode ? (
                <button
                    onClick={() => setDeleteMode(!isDeleteMode)}
                    type="button"
                >
                    Delete
                </button>
            ) : (
                <ConfirmCommentDeletion
                    setDeleteMode={setDeleteMode}
                    isDeleteMode={isDeleteMode}
                    postID={postID}
                    commentID={commentID}
                    wasUpdated={props.wasUpdated}
                    setWasUpdated={props.setWasUpdated}
                />
            )}
        </div>
    );
};
