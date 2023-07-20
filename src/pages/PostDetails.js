import { useEffect, useState } from "react";
import { getPostDetails } from "../Api";
import { PostEditForm, ConfirmPostDeletion } from "../components/Forms";
import { PostComment, NewComment } from "../components/Comment";
import "../styles/PostDetails.css";

const PostButtons = (props) => {
    const { setEditMode, setDeleteMode } = props;
    return (
        <div className="buttons">
            <button onClick={setEditMode}>Edit Post</button>
            <button onClick={setDeleteMode}>Delete</button>
        </div>
    );
};

const PostInformation = ({ title, author, text, timestamp }) => {
    return (
        <div className="post-information">
            <h2 className="post-title">{title}</h2>
            <h2 className="post-author">
                {author.first_name} {author.last_name}
            </h2>
            <p className="post-text">{text}</p>
            <h5 className="post-timestamp">{timestamp}</h5>
        </div>
    );
};
export const PostDetails = (props) => {
    const { postId } = props;
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [wasUpdated, setWasUpdated] = useState(false);

    const changeEditMode = () => {
        setEditMode(!isEditMode);
    };
    const changeDeleteMode = () => {
        setDeleteMode(!isDeleteMode);
    };
    const RenderComments = () => {
        return (
            <div className="all-comments">
                {currentPost.comment.map((comment) => {
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
                })}
            </div>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPostDetails(postId);
                const date = new Date(result.post.timestamp);
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                };
                const format_date = date.toLocaleString("en-US", options);

                result.post.timestamp = format_date;
                setCurrentPost(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [postId, isEditMode, wasUpdated]);

    if (!currentPost) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="post-content">
            <div className="post-details">
                {!isEditMode ? (
                    <>
                        <PostInformation
                            title={currentPost.post.title}
                            author={currentPost.author}
                            text={currentPost.post.text}
                            timestamp={currentPost.post.timestamp}
                        />
                        {!isDeleteMode ? (
                            <PostButtons
                                setDeleteMode={changeDeleteMode}
                                setEditMode={changeEditMode}
                            />
                        ) : (
                            <ConfirmPostDeletion
                                setDeleteMode={changeDeleteMode}
                                dbID={postId}
                            />
                        )}
                    </>
                ) : (
                    <PostEditForm
                        {...currentPost.post}
                        setEditMode={changeEditMode}
                    />
                )}
            </div>
            {currentPost.comment.length > 0 ? <RenderComments /> : ""}
            <NewComment
                postID={postId}
                wasUpdated={wasUpdated}
                setWasUpdated={setWasUpdated}
            />
        </div>
    );
};
