import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // from Redux
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    console.log(user.email);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("password",password,user.email)
    // Dispatch update password (you need to define this in userSlice)
   dispatch(updateUserPassword({ email: user.email, password }))
  .unwrap()
  .then(() => {
    alert("Password set successfully!");
    navigate("/home");
  })
  .catch((error) => {
    alert(`Failed to set password: ${error.message || error}`);
  });   
  console.log(password);

  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Set Your Password</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Set Password</button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
