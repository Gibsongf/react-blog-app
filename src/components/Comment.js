import { useContext, useState } from "react";
import { postComment } from "../Api";
import { ConfirmDeletionForm } from "./Forms";
import { newContentValidator } from "./FormValidation";
import { formatDate } from "../utils";
import { UserUpdateContext } from "../pages/UserPostDetails";
import { useLocation } from "react-router-dom";
import { PublicUpdateContext } from "../pages/public/PublicPostDetails";

export const NewComment = () => {
    const initialState = { user_name: "", comment_text: "" };
    const [formData, setFormData] = useState(initialState);
    const postId = localStorage.getItem("postID");
    const { setWasUpdated } = useContext(UserUpdateContext);
    const { setUpdated } = useContext(PublicUpdateContext);
    const urlLocation = useLocation().pathname.split("/")[1];
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        newContentValidator(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidData = newContentValidator(e.target.parentElement);
        if (isValidData) {
            if (urlLocation === "public") {
                await postComment(postId, formData, true);
            } else {
                await postComment(postId, formData);
            }
            setWasUpdated((e) => !e);
            setUpdated((e) => !e);
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
const ConditionalBtn = ({ setDeleteMode }) => {
    const location = useLocation();
    const currentUrl = location.pathname.split("/")[2];
    if (currentUrl === "public") {
        return;
    }
    return (
        <button onClick={() => setDeleteMode((e) => !e)} type="button">
            Delete
        </button>
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
                <ConditionalBtn setDeleteMode={setDeleteMode} />
            ) : (
                <ConfirmDeletionForm
                    warningText={"Do you really want to delete this Comment?2"}
                    setDeleteMode={setDeleteMode}
                    postID={postID}
                    commentID={commentID}
                    deleteActionType={"Comment"}
                />
            )}
        </div>
    );
};
