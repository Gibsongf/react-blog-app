import { NavLink, useLocation } from "react-router-dom";
import { formatDate, savePostId } from "../utils";

const Post = ({ title, timestamp, text, id }) => {
    let postLink = `/react-blog-app/public/post/${id}`;
    const location = useLocation();
    const currentUrl = location.pathname.split("/")[2];
    if (currentUrl === "profile") {
        postLink = `/react-blog-app/profile/post/${id}`;
    }
    return (
        <div className="post">
            <NavLink to={postLink} onClick={savePostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <h5>{formatDate(timestamp)}</h5>
            <p>{text}</p>
        </div>
    );
};

export const AllPost = ({ allPosts, author }) => {
    let authorPost = author;
    if (!author) {
        authorPost = JSON.parse(localStorage.getItem("author"));
    }
    const location = useLocation();
    const currentUrl = location.pathname.split("/")[2];
    return (
        <>
            {currentUrl === "profile" && <h1>All Yours Post</h1>}

            <div className="posts-content">
                {allPosts?.map((post) => {
                    return (
                        <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            author={authorPost}
                            timestamp={post.timestamp}
                            text={post.text}
                        />
                    );
                })}
            </div>
        </>
    );
};
