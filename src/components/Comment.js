import { useContext, useState } from "react";
import { newComment } from "../Api";
import { ConfirmDeletionForm } from "./Forms";
import { newContentValidator } from "./FormValidation";
import { formatDate } from "../utils";
import { UpdateContext } from "../pages/UserPostDetails";

export const NewComment = (props) => {
    const initialState = { user_name: "", comment_text: "" };
    const [formData, setFormData] = useState(initialState);
    // const [validData, setValidData] = useState();
    const postId = localStorage.getItem("postID");
    const { setWasUpdated } = useContext(UpdateContext);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        newContentValidator(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidData = newContentValidator(e.target.parentElement);
        if (isValidData) {
            await newComment(postId, formData);
            setWasUpdated((e) => !e);
            e.target.parentElement.reset();
        }
    };
    return (
        <form method="post" className="new-comment-form">
            <input
                placeholder="Name (min characters: 4)"
                type="text"
                name="user_name"
                id="user_name"
                onChange={handleInputChange}
                required
            />
            <input
                placeholder="Write a comment (min characters: 4)"
                type="text"
                name="comment_text"
                id="comment_text"
                required
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit} type="submit">
                Comment
            </button>
        </form>
    );
};
export const PostComment = (props) => {
    const { userName, text, timestamp, commentID } = props;
    const postID = localStorage.getItem("postID");
    const [isDeleteMode, setDeleteMode] = useState(false);

    return (
        <div className="comment">
            <p className="comment-username">{userName}</p>
            <p className="comment-timestamp">{formatDate(timestamp)}</p>
            <p className="comment-text">{text}</p>

            {!isDeleteMode ? (
                <button
                    onClick={() => setDeleteMode(!isDeleteMode)}
                    type="button"
                >
                    Delete
                </button>
            ) : (
                <ConfirmDeletionForm
                    warningText={"Do you really want to delete this Comment?"}
                    setDeleteMode={setDeleteMode}
                    postID={postID}
                    commentID={commentID}
                    deleteActionType={"Comment"}
                />
            )}
        </div>
    );
};
