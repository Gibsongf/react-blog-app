import "../styles/App.css";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";
import { useEffect, useState } from "react";
import { getUserData } from "../Api";

const AuthorInfo = (props) => {
    const { fname, lname } = props;

    return (
        <div className="author-details">
            <h1>
                Welcome {fname} {lname}{" "}
            </h1>
        </div>
    );
};

export const Home = ({ savePostId, wasUpdated, setWasUpdated }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // console.log("Fetching data");
            try {
                const result = await getUserData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [wasUpdated]);
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <AuthorInfo
                fname={data.author.first_name}
                lname={data.author.last_name}
                description={data.author.description}
            />
            <FormNewPost
                wasUpdated={wasUpdated}
                setWasUpdated={setWasUpdated}
            />

            <AllPost
                allPosts={data.posts}
                author={data.author.first_name}
                setPostId={savePostId}
            />
        </div>
    );
};
