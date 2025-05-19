// // src/pages/Login.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../features/user/userSlice';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const { loading, error } = useSelector((state) => state.user);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(loginUser({ email, password }));
//     };

//     return (
//         <div className="login-page">
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" disabled={loading}>Login</button>
//             </form>
//             {error && <p className="error">{error}</p>}
//         </div>
//     );
// };

// export default Login;

// //working model
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../features/user/userSlice"; // Login action
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.user);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dispatch login action
//     dispatch(loginUser({ email, password })).then((result) => {
//       if (result.payload?.token) {
//         navigate("/home"); // Redirect on successful login
//       }
//     });
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error.message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle} from "../features/user/userSlice"; // Login action
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("bookuser"));
    if (savedUsers && savedUsers.length > 0) {
      const lastUser = savedUsers[savedUsers.length - 1];
      setEmail(lastUser.email);
      setPassword(lastUser.password);
      setRememberMe(true); // Optional: auto-check rememberMe box
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password })).then((result) => {
      if (result.payload?.token) {
        // If rememberMe is checked, store credentials
        if (rememberMe) {
          const storedUsers = JSON.parse(localStorage.getItem("bookuser")) || [];
          storedUsers.push({ email, password });
          localStorage.setItem("bookuser", JSON.stringify(storedUsers));
        }
        navigate("/home"); // Redirect on success
      }
    });
  };
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle()).then((result) => {
      if (result.payload?.token) {
        navigate("/home");
      }
    });
  };
 
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        
        <div className="login-container">
          {error && <p className="error">{error.message}</p>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={loading ? "loading" : ""}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          
          <div className="social-login">
            <div className="social-login-divider">
              <span>Or continue with</span>
            </div>
            <div className="social-buttons">
              <button className="social-button" onClick={handleGoogleLogin}>G</button>
              <button className="social-button">f</button>
              <button className="social-button">in</button>
            </div>
          </div>
          
          <div className="auth-switch">
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



// Reset form fields when component mounts
  // useEffect(() => {
  //   setEmail("");
  //   setPassword("");
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Dispatch login action
  //   dispatch(loginUser({ email, password })).then((result) => {
  //     if (result.payload?.token) {
  //       navigate("/home"); // Redirect on successful login
  //     }
  //   });
  //   if(rememberMe){
  //     if(localStorage.getItem("bookuser")){
  //       localStorage.setItem()
  //     }
  //   }
  // };