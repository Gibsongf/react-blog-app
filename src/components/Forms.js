import { useContext, useState } from "react";
import { newPost, updatePost, deleteComment, deletePost } from "../Api";
import { newContentValidator } from "./FormValidation";
import { useNavigate } from "react-router-dom";
import { UpdateContext } from "../pages/PostDetails";
import { TitlePost, TextPost, IsPublished, FormPostButton } from "./Inputs";
const UseForm = (formType, initialState, postId, updateHome) => {
    const { setWasUpdated, changeEditMode } = useContext(UpdateContext);
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        newContentValidator(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validData = newContentValidator(e.target.parentElement);

        if (validData) {
            if (formType === "new") {
                await newPost(formData);
                setFormData({ text: "", title: "", published: false });
                updateHome((bool) => !bool);
            }
            if (formType === "edit") {
                updatePost(postId, formData); // api call to update post
                changeEditMode(); // leave edit mode
                setWasUpdated((e) => !e);
            }
        }
    };
    return { formData, handleInputChange, handleSubmit };
};
// New/Edit form content
export const PostEditForm = (props) => {
    const { title, text, published, _id } = props;

    const initialState = { title, text, published };
    const { formData, handleInputChange, handleSubmit } = UseForm(
        "edit",
        initialState,
        _id
    );

    return (
        <form method="POST" action="" className="edit-post-form">
            <TitlePost value={formData.title} handler={handleInputChange} />
            <TextPost value={formData.text} handler={handleInputChange} />
            <IsPublished
                value={formData.published}
                handler={handleInputChange}
            />
            <FormPostButton handleSubmit={handleSubmit} />
        </form>
    );
};

export const FormNewPost = ({ setWasUpdated }) => {
    const initialState = { text: "", title: "", published: false };

    const { formData, handleInputChange, handleSubmit } = UseForm(
        "new",
        initialState,
        "",
        setWasUpdated
    );
    return (
        <form method="post" className="new-post">
            <TitlePost
                placeholder={"Title (min characters: 3)"}
                handler={handleInputChange}
                value={formData.title}
            />
            <TextPost
                placeholder={"Write your new post (min characters: 10)"}
                handler={handleInputChange}
                value={formData.text}
            />
            <IsPublished
                value={formData.published}
                handler={handleInputChange}
            />
            <FormPostButton handleSubmit={handleSubmit} newContent={true} />
        </form>
    );
};

// Confirmation forms
export const ConfirmDeletionForm = (props) => {
    const { setDeleteMode, commentID, warningText, deleteActionType } = props;
    const postId = localStorage.getItem("postID");
    const navigate = useNavigate();
    const { setWasUpdated } = useContext(UpdateContext);

    const handleComment = async () => {
        // API call delete comment
        await deleteComment(postId, commentID);
        // update post when confirm edition
        setWasUpdated((e) => !e);
    };
    const handlePost = async () => {
        await deletePost(postId);
        navigate("/");
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (deleteActionType === "Post") {
            handlePost();
        }
        if (deleteActionType === "Comment") {
            handleComment();
        }
    };

    return (
        <>
            <h5>{warningText}</h5>
            <form action="DELETE">
                <button onClick={handleSubmit} type="submit">
                    Yes
                </button>
                <button onClick={() => setDeleteMode((e) => !e)} type="button">
                    No
                </button>
            </form>
        </>
    );
};
