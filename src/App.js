import "./styles/App.css";
import { getIndexData } from "./Api";
import { useEffect, useState } from "react";
// import uniqid from "uniqid";
// import { AllPost } from "./components/Posts";
import { Routes, Route } from "react-router-dom";
import { PostDetails } from "./components/PostDetails";
import { Home } from "./pages/Home";

const Header = () => {
    return (
        <div className="header">
            <div className="nav-bar">
                <h1>Blog Author Section</h1>
            </div>
        </div>
    );
};

// at UniquePost
// add a delete message
// and add new message at the post and save in the api
function App() {
    const [data, setData] = useState(null);
    const [postId, setPostId] = useState();
    const [wasUpdated, setWasUpdated] = useState(false);

    const savePostId = (e) => {
        setPostId(e.target.id);
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data");
            try {
                const result = await getIndexData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [wasUpdated]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            savePostId={savePostId}
                            data={data}
                            wasUpdated={wasUpdated}
                            setWasUpdated={setWasUpdated}
                        />
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        data ? (
                            <PostDetails
                                postId={postId}
                                author={data.author}
                                homeUpdate={wasUpdated}
                                setHomeUpdate={setWasUpdated}
                            />
                        ) : (
                            ""
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
