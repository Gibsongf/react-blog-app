import { NavLink } from "react-router-dom";
import { formatDate, savePostId } from "../utils";
const Post = ({ title, timestamp, text, id }) => {
    return (
        <div className="post">
            <NavLink to={`post/${id}`} onClick={savePostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <h5>{formatDate(timestamp)}</h5>
            <p>{text}</p>
        </div>
    );
};

export const AllPost = ({ allPosts }) => {
    const author = JSON.parse(localStorage.getItem("author"));
    return (
        <>
            <h1>All Yours Post</h1>

            <div className="posts-content">
                {allPosts.map((post) => {
                    return (
                        <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            author={author}
                            timestamp={post.timestamp}
                            text={post.text}
                        />
                    );
                })}
            </div>
        </>
    );
};
