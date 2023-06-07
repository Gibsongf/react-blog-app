import { useEffect, useState } from "react";
import { getPostDetails, deletePost } from "../Api";
import { NavLink } from "react-router-dom";
import { PostEditForm } from "./Forms";
import { PostComment, NewComment } from "./Comment";
import "../styles/PostDetails.css";

const ConfirmPostDeletion = (props) => {
    const { isDeleteMode, setDeleteMode, dbID } = props;
    const { setHomeUpdate, homeUpdate } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        setHomeUpdate(!homeUpdate);
        deletePost(dbID);
        // setDeleteMode(!isDeleteMode);
        document.querySelector(".back-home").click();
    };
    return (
        <>
            <h3>Do you want to delete this Post? </h3>
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

const PostButtons = (props) => {
    const { setEditMode, isEditMode, setDeleteMode, isDeleteMode } = props;
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
    const [wasUpdated, setWasUpdated] = useState(false);

    const renderComments = () => {
        return postComments.map((comment) => {
            return (
                <PostComment
                    key={comment._id}
                    commentID={comment._id}
                    postID={postId}
                    userName={comment.user_name}
                    text={comment.text}
                    timestamp={comment.timestamp}
                    wasUpdated={wasUpdated}
                    setWasUpdated={setWasUpdated}
                />
            );
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPostDetails(postId);
                setCurrentPost(result.post);
                setPostComments(result.comment);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [postId, isEditMode, wasUpdated]);
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
            <NavLink to="/" className="back-home">
                Home
            </NavLink>
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
                    <ConfirmPostDeletion
                        setDeleteMode={setDeleteMode}
                        isDeleteMode={isDeleteMode}
                        dbID={postId}
                        homeUpdate={props.homeUpdate}
                        s
                        setHomeUpdate={props.setHomeUpdate}
                    />
                )}
            </div>
            {postComments.length > 0 ? renderComments() : ""}
            <NewComment
                postID={postId}
                wasUpdated={wasUpdated}
                setWasUpdated={setWasUpdated}
            />
        </div>
    );
};
