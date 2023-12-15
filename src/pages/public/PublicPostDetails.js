import { useEffect, useState, createContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { Loading } from "../components/Loading";
import { PostComment, NewComment } from "../../components/Comment";
import { getPostDetails } from "../../Api";
import { formatDate } from "../../utils";
// import "src/styles/PostDetails.css";
const PostInformation = ({ title, authorInfo, text, timestamp }) => {
    // console.log(authorInfo);
    const fullName = `${authorInfo.first_name} ${authorInfo.last_name}`;
    const saveAuthorId = () => {
        if (localStorage["authorID"]) {
            localStorage.removeItem("authorID");
        }
        localStorage.setItem("authorID", authorInfo._id);
    };
    return (
        <div className="post-information">
            <h2 className="post-title">{title}</h2>
            <NavLink
                to={`/public/author/${authorInfo._id}`}
                onClick={saveAuthorId}
            >
                <h2 className="post-author">{fullName}</h2>
            </NavLink>
            <p className="post-text">{text}</p>
            <h5 className="post-timestamp">{timestamp}</h5>
        </div>
    );
};
export const PublicUpdateContext = createContext({
    updated: false,
    setUpdated: () => {},
});
export const PublicPostDetails = () => {
    // const { postId } = props;
    const [currentPost, setCurrentPost] = useState(null);
    const [postComments, setPostComments] = useState(null);
    const [author, setAuthor] = useState(null);
    const [wasUpdated, setWasUpdated] = useState(false);

    const RenderComments = () => {
        return (
            <div className="all-comments">
                {postComments.map((comment) => {
                    return (
                        <PostComment
                            key={comment._id}
                            commentID={comment._id}
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
                result.post.timestamp = formatDate(result.post.timestamp);
                setCurrentPost(() => result.post);
                setAuthor(() => result.post.author);
                setPostComments(() => result.comment);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [wasUpdated]);

    if (!currentPost) {
        // Data is still being fetched
        return <div>Load</div>; //<Loading />;
    }
    return (
        <div className="post-content">
            <div className="post-details">
                <PostInformation
                    title={currentPost.title}
                    authorInfo={author}
                    text={currentPost.text}
                    timestamp={currentPost.timestamp}
                />
            </div>
            <PublicUpdateContext.Provider
                value={{ updated: wasUpdated, setUpdated: setWasUpdated }}
            >
                {postComments.length > 0 ? <RenderComments /> : ""}
                <NewComment />
            </PublicUpdateContext.Provider>
        </div>
    );
};
