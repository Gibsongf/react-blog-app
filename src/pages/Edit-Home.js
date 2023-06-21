import "../styles/App.css";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";
import { NavLink } from "react-router-dom";

const AuthorInfo = (props) => {
    const { fname, lname, description } = props;

    return (
        <div className="author-details">
            <h1>
                Welcome {fname} {lname}{" "}
            </h1>
            {/* <h1>{description.length > 0 ? description : ""}</h1> */}
        </div>
    );
};

export const Home = ({ savePostId, data, wasUpdated, setWasUpdated }) => {
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
