import "../styles/App.css";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIndexData } from "../Api";

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

export const Index = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data");
            try {
                const result = await getIndexData();
                // 
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
    console.log(data);
    return <div className="content"></div>;
};
