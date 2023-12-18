import { useEffect, useState } from "react";
import { apiLogin } from "../Api";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({ setToken, setGuest }) => {
    const nav = useNavigate();
    const ini = { username: "", password: "" };
    const [informUser, setInformUser] = useState({ msg: "", text: "" });
    const [formData, setFormData] = useState(ini);
    const onChange = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            nav("/profile");
        }
    }, [nav]);
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await apiLogin(formData);
        if (response === "login-error") {
            // console.log(response);
            setInformUser(() => {
                return {
                    msg: "error",
                    text: "Username or password is incorrect or non-existent",
                };
            });
        } else {
            setInformUser({ msg: "success" }); // Clear the error on successful login

            if (Object.keys(response).includes("id")) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userID", response.id);
                setToken(localStorage.getItem("token"));
            }
            nav("/profile");
        }
    };
    return (
        <>
            <form method="post" onSubmit={onSubmit} className="login-form">
                {informUser.msg === "error" && (
                    <p className="error-login">{informUser.text}</p>
                )}
                {informUser.msg === "success" && (
                    <ReactLoading
                        type={"spin"}
                        color={"white"}
                        height={"5%"}
                        width={"5%"}
                    />
                )}
                <label htmlFor="username">User Name</label>
                <input
                    id="username"
                    value={formData.username}
                    onChange={onChange}
                    name="username"
                    type="text"
                    required={true}
                />
                <label htmlFor="password">Password</label>
                <input
                    value={formData.password}
                    onChange={onChange}
                    type="password"
                    name="password"
                    id="password"
                    required={true}
                />
                <div className="error-msg"></div>

                <div className="login-btn-container">
                    <Link to="/public" onClick={() => setGuest(true)}>
                        <button type="button">Guest</button>
                    </Link>
                    <button type="submit">Enter</button>
                </div>
            </form>
        </>
    );
};
