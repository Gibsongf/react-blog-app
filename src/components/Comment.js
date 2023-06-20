import { useState } from "react";
import { deleteComment, newComment } from "../Api";

const ConfirmDeletion = (props) => {
    const { isDeleteMode, setDeleteMode, postID, commentID } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        deleteComment(postID, commentID);
        setDeleteMode(!isDeleteMode);
        props.setWasUpdated(!props.wasUpdated);
    };
    return (
        <>
            <h5>Do you want to delete this Comment? </h5>
            <form action="DELETE">
                <button onClick={handleSubmit} type="submit">
                    Yes
                </button>
                <button
                    onClick={() => setDeleteMode(!isDeleteMode)}
                    type="button"
                >
                    No
                </button>
            </form>
        </>
    );
};
export const NewComment = (props) => {
    const initialState = { user_name: "", comment_text: "" };
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        newComment(props.postID, formData);
        // .reset()
        props.setWasUpdated(!props.wasUpdated);
    };
    return (
        <form method="post">
            <label htmlFor="user_name">Name:</label>
            <input
                type="text"
                name="user_name"
                id="user_name"
                onChange={handleInputChange}
            />
            <input
                placeholder="Write a comment"
                type="text"
                name="comment_text"
                id="comment_text"
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
        <div className="comments">
            <p>{userName}</p>
            <p>{format_date}</p>
            <p>{text}</p>

            {!isDeleteMode ? (
                <button
                    onClick={() => setDeleteMode(!isDeleteMode)}
                    type="button"
                >
                    Delete
                </button>
            ) : (
                <ConfirmDeletion
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
