import "../styles/App.css";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";

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
