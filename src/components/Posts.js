import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
const Post = ({ title, timestamp, text, id }) => {
    const { savePostId } = useContext(DataContext);
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const format_date = date.toLocaleString("en-US", options);
    return (
        <div className="post">
            <NavLink to={`post/${id}`} onClick={savePostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <h5>{format_date}</h5>
            <p>{text}</p>
        </div>
    );
};

export const AllPost = ({ allPosts, setPostId }) => {
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
                            setPostId={setPostId}
                        />
                    );
                })}
            </div>
        </>
    );
};
