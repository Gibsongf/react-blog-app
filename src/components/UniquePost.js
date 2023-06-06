import { useEffect, useState } from "react";
import { uniquePost } from "../Api";
import { NavLink } from "react-router-dom";
import { PostEditForm } from "./EditForm";
import { PostComment } from "./Comment";
import "../styles/UniquePost.css";

const PostDelConfirmation = ({ isDeleteMode, setDeleteMode }) => {
    return (
        <>
            <h3>Do you want to delete this Post? </h3>
            <form action="DELETE">
                <button type="submit">Yes</button>
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

const PostButtons = ({
    setEditMode,
    isEditMode,
    setDeleteMode,
    isDeleteMode,
}) => {
    return (
        <div className="buttons">
            <button onClick={() => setEditMode(!isEditMode)}>Edit Post</button>
            <button onClick={() => setDeleteMode(!isDeleteMode)}>Delete</button>
        </div>
    );
};
export const PostDetails = (props) => {
    const { author, postId } = props;
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [postComments, setPostComments] = useState(null);

    const renderComments = () => {
        return postComments.map((comment) => {
            return (
                <PostComment
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
    }, [postId, isEditMode]);
    if (isEditMode) {
        return (
            <PostEditForm
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
    return (
        <div className="contents">
            <div className="post">
                <h2 className="title">{currentPost.title}</h2>
                <h2 className="author">
                    {author.first_name + " " + author.last_name}
                </h2>
                <h4>{currentPost.timestamp}</h4>
                <p className="post-content">{currentPost.text}</p>

                {!isDeleteMode ? (
                    <PostButtons
                        isEditMode={isEditMode}
                        isDeleteMode={isDeleteMode}
                        setDeleteMode={setDeleteMode}
                        setEditMode={setEditMode}
                    />
                ) : (
                    <PostDelConfirmation
                        setDeleteMode={setDeleteMode}
                        isDeleteMode={isDeleteMode}
                    />
                )}
            </div>
            {postComments.length > 0 ? renderComments() : ""}
        </div>
    );
};
