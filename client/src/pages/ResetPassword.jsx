import React, { useState } from "react";
import Logo from "../assets/crbologo.png";
import backImage from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/ResetPassword.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import PasswordStrengthMeterComponent from "../utils/PasswordStrengthMeter";
import { evaluatePasswordStrength } from "../utils/passwordUtils.js";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { updateToken, userProfile } = useUser();
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword === "" || confirmPassword === "") {
      toast.info("Please input all fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const { level } = evaluatePasswordStrength(newPassword);
    if (level !== "Strong") {
      toast.warn("Please use a stronger password for better security.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/update-password",
        { userId: userProfile._id, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (
        response.data.message ===
        "New Password should not be same as old password!"
      ) {
        toast.info("New Password should not be same as old password!");
        return;
      }

      updateToken(token);
      toast.success("Password changed successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="reset-password-main">
      <div className="header-container">
        <img
          src={backImage}
          alt="back"
          className="back-image"
          onClick={handleBackClick}
        />
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      <div className="reset-password-content">
        <h2>Reset Password</h2>
        <form onSubmit={handlePasswordChangeSubmit}>
          <p>Please enter your new password</p>

          {/* New Password */}
          <div className="pass-input-div">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <PasswordStrengthMeterComponent password={newPassword} />
          </div>

          {/* Confirm Password */}
          <div className="pass-input-div">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              name="confirmPassword"
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
