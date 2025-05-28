import React from "react";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        console.warn(email, password);
    };

    return (
        <div className="login">
            <input
                type="text"
                className="inputBox"
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                className="inputBox"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleLogin} className="appbutton" type="button">
                Login
            </button>
        </div>
    );
};

export default Login;
