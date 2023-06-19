import { NavLink } from "react-router-dom";
const Post = ({ title, timestamp, text, setPostId, id }) => {
    // NEED TO FORMAT THE POST DATE THIS ONE IS RETURNING THE SAME THING
    const date = new Date(timestamp);
    const format_date = date.toUTCString().replace("GMT", "");
    return (
        <div className="post">
            <NavLink to={`post/${id}`} onClick={setPostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <h4>{format_date}</h4>
            <p>{text}</p>
        </div>
    );
};

export const AllPost = ({ allPosts, author, setPostId }) => {
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
