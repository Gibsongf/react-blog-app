import "./styles/App.css";
import { getIndexData } from "./Api";
import { useEffect, useState } from "react";
// import uniqid from "uniqid";
import { AllPost } from "./components/Posts";
import { Routes, Route } from "react-router-dom";
import { PostDetails } from "./components/PostDetails";

const Header = () => {
    return (
        <div className="header">
            <div className="nav-bar">
                <h1>Blog Author Section</h1>
            </div>
        </div>
    );
};

const AuthorInfo = (props) => {
    const { fname, lname, description } = props;

    return (
        <div className="author-details">
            <h1>
                {fname} {lname}
            </h1>
            <h1>{description.length > 0 ? description : ""}</h1>
        </div>
    );
};
// at UniquePost
// add a delete message
// and add new message at the post and save in the api
function App() {
    const [data, setData] = useState(null);
    const [postId, setPostId] = useState();
    const savePostId = (e) => {
        setPostId(e.target.id);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getIndexData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="App">
            <Header />
            {/* <AllPost allPosts={data.posts} author={data.author.first_name} /> */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <AuthorInfo
                                fname={data.author.first_name} //some
                                lname={data.author.last_name}
                                description={data.author.description}
                            />
                            <AllPost
                                allPosts={data.posts}
                                author={data.author.first_name}
                                setPostId={savePostId}
                            />
                        </>
                    }
                />
                <Route path="/post/:id" element={<PostDetails postId={postId} author={data.author}/>} />
            </Routes>
        </div>
    );
}

export default App;
