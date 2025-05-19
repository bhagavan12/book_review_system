// // 



// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/user/userSlice"; // Register action
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.user);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     // Dispatch register action
//     dispatch(registerUser({ name, email, password })).then((result) => {
//       if (result.payload?.token) {
//         navigate("/home"); // Redirect on successful registration
//       }
//     });
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       {error && <p className="error">{error.message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
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
//         <div className="input-group">
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice"; // Register action
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import "../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  // Reset form fields when component mounts
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  // Check password strength
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength("weak");
    } else if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10) {
      setPasswordStrength("medium");
    } else if (password.length < 12) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("very-strong");
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    // Dispatch register action
    dispatch(registerUser({ name, email, password })).then((result) => {
      if (result.payload?.token) {
        navigate("/home"); // Redirect on successful registration
      }
    });
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
       const idToken = await user.getIdToken();

    console.log('Firebase ID Token:', idToken);
      console.log(user);
      const userData = {
        name: user.displayName,
        email: user.email,
        token: user.accessToken,
        uid: user.uid,
        authType: "google", // <-- Track signup method
      };

      dispatch(registerUser(userData)).then((result) => {
      if (result.payload?.token) {
        navigate("/set-password"); // Redirect on successful registration
      }
    }); // Store in Redux or trigger register
      // navigate("/"); // Prompt user to set password manually
    } catch (error) {
      console.error("Google signup error:", error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Fill in your details to get started</p>
        </div>

        <div className="register-container">
          {error && <p className="error">{error.message}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

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

              <div className="password-strength">
                <div className="password-strength-label">
                  <span>Password Strength</span>
                  <span>{passwordStrength.replace('-', ' ')}</span>
                </div>
                <div className="password-strength-meter">
                  <div className={`password-strength-${passwordStrength}`}></div>
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              {confirmPassword && (
                <div className={`password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                  <div className={`password-match-icon ${password === confirmPassword ? 'match' : 'no-match'}`}></div>
                  <span>{password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}</span>
                </div>
              )}
            </div>

            <div className="terms">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreeToTerms || password !== confirmPassword}
              className={loading ? "loading" : ""}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="social-login">
            <div className="social-login-divider">
              <span>Or sign up with</span>
            </div>
            <div className="social-buttons">
              <button className="social-button" onClick={handleGoogleSignup}>G</button>
              <button className="social-button">f</button>
              <button className="social-button">in</button>
            </div>
          </div>

          <div className="auth-switch">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;