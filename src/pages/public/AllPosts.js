import { NavLink } from "react-router-dom";
import { formatDate, savePostId } from "../../utils";
import { useEffect, useState } from "react";
import { getIndexData } from "../../Api";

const Post = ({ title, author, timestamp, text, id }) => {
    let authorLink = `author/${author._id}`;
    let postLink = `post/${id}`;

    if (author._id === localStorage.getItem("userID")) {
        authorLink = `/profile`;
        postLink = `/profile/post/${id}`;
    }
    const saveAuthorId = (e) => {
        if (localStorage["authorID"]) {
            localStorage.removeItem("authorID");
        }
        localStorage.setItem("authorID", e.target.id);
    };

    return (
        <div className="post">
            <NavLink to={postLink} onClick={savePostId}>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </NavLink>
            <NavLink to={authorLink} onClick={saveAuthorId}>
                <h3 id={author._id} className="all-post-author-link">
                    {author.first_name} {author.last_name}
                </h3>
            </NavLink>

            <h5>{formatDate(timestamp)}</h5>
            <p>{text}</p>
        </div>
    );
};

export const AllPublicPost = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getIndexData();
                setData(() => result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="post-content">
            {data?.allPost.map((post) => {
                if (!post) {
                    return "";
                }
                return (
                    <Post
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        author={post.author}
                        timestamp={post.timestamp}
                        text={post.text}
                    />
                );
            })}
        </div>
    );
};
