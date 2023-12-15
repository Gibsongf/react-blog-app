import { createContext, useContext, useEffect, useState } from "react";
import { getPostDetails } from "../Api";
import { PostEditForm, ConfirmDeletionForm } from "../components/Forms";
import { PostComment, NewComment } from "../components/Comment";
import "../styles/PostDetails.css";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";

export const UserUpdateContext = createContext({
    wasUpdated: false,
    setWasUpdated: () => {},
    changeEditMode: () => {},
});

// Btn that triggers a form for delete or edit content
const PostButtons = (props) => {
    const { setDeleteMode } = props;
    const { changeEditMode } = useContext(UserUpdateContext);
    return (
        <div className="buttons">
            <button onClick={changeEditMode}>Edit Post</button>
            <button onClick={setDeleteMode}>Delete</button>
        </div>
    );
};

const PostInformation = ({ title, author, text, timestamp }) => {
    const postId = localStorage.getItem("postID");

    const [isDeleteMode, setDeleteMode] = useState(false);

    const changeDeleteMode = () => {
        setDeleteMode(!isDeleteMode);
    };
    return (
        <div className="post-information">
            <h2 className="post-title">{title}</h2>
            <h2 className="post-author">
                <Link to="/profile">
                    {author.first_name} {author.last_name}
                </Link>
            </h2>
            <p className="post-text">{text}</p>
            <h5 className="post-timestamp">{timestamp}</h5>
            {!isDeleteMode ? (
                <PostButtons setDeleteMode={changeDeleteMode} />
            ) : (
                <ConfirmDeletionForm
                    warningText={"Do you really want to delete this Post?"}
                    setDeleteMode={changeDeleteMode}
                    dbID={postId}
                    deleteActionType={"Post"}
                />
            )}
        </div>
    );
};
export const UserPostDetails = () => {
    const postId = localStorage.getItem("postID");
    const [isEditMode, setEditMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [wasUpdated, setWasUpdated] = useState(true);
    const changeEditMode = () => {
        setEditMode(!isEditMode);
    };

    const RenderComments = () => {
        return (
            <div className="all-comments">
                {currentPost.comment.map((comment) => {
                    return (
                        <PostComment
                            key={comment._id}
                            commentID={comment._id}
                            userName={comment.user_name}
                            text={comment.text}
                            timestamp={comment.timestamp}
                        />
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPostDetails(postId);
                const formattedDate = formatDate(result.post.timestamp);
                result.post.timestamp = formattedDate;
                setCurrentPost(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [postId, wasUpdated]);

    if (!currentPost) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="post-content">
            <UserUpdateContext.Provider
                value={{ wasUpdated, setWasUpdated, changeEditMode }}
            >
                <div className="post-details">
                    {!isEditMode ? (
                        <PostInformation
                            title={currentPost.post.title}
                            author={currentPost.post.author}
                            text={currentPost.post.text}
                            timestamp={currentPost.post.timestamp}
                        />
                    ) : (
                        <PostEditForm {...currentPost.post} />
                    )}
                </div>
                {currentPost.comment.length > 0 ? <RenderComments /> : ""}
                <NewComment />
            </UserUpdateContext.Provider>
        </div>
    );
};
