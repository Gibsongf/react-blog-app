import { useEffect, useState } from "react";
import { getPostDetails, deletePost } from "../Api";
import { NavLink } from "react-router-dom";
import { PostEditForm, ConfirmPostDeletion } from "./Forms";
import { PostComment, NewComment } from "./Comment";

import "../styles/PostDetails.css";

const PostButtons = (props) => {
    const { setEditMode, isEditMode, setDeleteMode, isDeleteMode } = props;
    return (
        <div className="buttons">
            <button onClick={() => setEditMode(!isEditMode)}>Edit Post</button>
            <button onClick={() => setDeleteMode(!isDeleteMode)}>Delete</button>
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
    const { author, postId } = props;
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [postComments, setPostComments] = useState(null);
    const [wasUpdated, setWasUpdated] = useState(false);

    const RenderComments = () => {
        return (
            <div className="all-comments">
                {postComments.map((comment) => {
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
                setCurrentPost(result.post);
                setPostComments(result.comment);
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
                            title={currentPost.title}
                            author={author}
                            text={currentPost.text}
                            timestamp={currentPost.timestamp}
                        />
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
                                setHomeUpdate={props.setHomeUpdate}
                            />
                        )}
                    </>
                ) : (
                    <PostEditForm
                        {...currentPost}
                        editMode={isEditMode}
                        setEditMode={setEditMode}
                        homeUpdate={props.homeUpdate}
                        setHomeUpdate={props.setHomeUpdate}
                    />
                )}
            </div>
            {postComments.length > 0 ? <RenderComments /> : ""}
            <NewComment
                postID={postId}
                wasUpdated={wasUpdated}
                setWasUpdated={setWasUpdated}
            />
        </div>
    );
};
