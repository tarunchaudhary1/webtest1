import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import './Auth.css'; // CSS file for styling

const Auth = () => {
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`;
        const data = isLogin ? { email, password } : { name, email, password };
        try {
            const res = await axios.post(url, data);
            if (isLogin) login(res.data.token);
            else setIsLogin(true);
        } catch {
            alert("Error");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-btn">
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="switch-btn"
            >
                {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
        </div>
    );
};

export default Auth;
