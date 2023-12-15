import { useEffect, useState } from "react";
import { getPostDetails } from "../Api";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/PostDetails.css";
import { Loading } from "../components/Loading";

const PostInformation = ({ title, authorName, authorID, text, timestamp }) => {
    const saveAuthorId = () => {
        if (localStorage["authorID"]) {
            localStorage.removeItem("authorID");
        }
        localStorage.setItem("authorID", authorID._id);
    };
    return (
        <div className="post-information">
            <h2 className="post-title">{title}</h2>
            <NavLink to={`/author/${authorID._id}`} onClick={saveAuthorId}>
                <h2 className="post-author">{authorName}</h2>
            </NavLink>
            <p className="post-text">{text}</p>
            <h5 className="post-timestamp">{timestamp}</h5>
        </div>
    );
};
export const PostDetails = (props) => {
    const { postId } = props;
    const [currentPost, setCurrentPost] = useState(null);
    const [postComments, setPostComments] = useState(null);
    const [authorName, setAuthorName] = useState(null);
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
            const postID = localStorage["postID"];
            try {
                const result = await getPostDetails(postID);
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
                setAuthorName(result.author);
                setPostComments(result.comment);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [postId, wasUpdated]);

    if (!currentPost) {
        // Data is still being fetched
        return <Loading />;
    }
    return (
        <div className="post-content">
            <div className="post-details">
                <PostInformation
                    title={currentPost.title}
                    authorID={currentPost.author}
                    authorName={authorName}
                    text={currentPost.text}
                    timestamp={currentPost.timestamp}
                />
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
