// PhonenumOTP.jsx  (simplified: no OTP)
import "../styles/PhonenumOTP.css";
import Logo from "../assets/landscapelogo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PhonenumOTP = () => {
  const { updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { comingFrom, username, password } = location.state || {};
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!ph && comingFrom !== "login") {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      if (comingFrom === "register") {
        // Just proceed to the next step with the phone number
        navigate("/profile", { state: { username, password, ph } });
        return;
      }

      if (comingFrom === "login") {
        // Skip OTP: issue token now and go to dashboard
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/giveToken",
          { username }
        );
        updateToken(data.token);
        navigate("/dashboard");
        return;
      }

      // Forgot password flow (no state passed): ensure phone exists, then go to security questions
      await axios.post("http://localhost:3000/api/v1/forgotpasswordphauth", {
        ph,
      });
      navigate("/securityq", { state: { ph } });
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div className="OTP-main">
        <div className="OTP-right-container">
          <img className="OTP-logo" src={Logo} alt="logo" />
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <label className="title">
              {comingFrom === "login"
                ? "Confirm your registered phone number (optional)"
                : "Enter your phone number"}
            </label>

            {comingFrom !== "login" && (
              <PhoneInput country="sg" value={ph} onChange={setPh} />
            )}

            <button
              id="OTP-button"
              onClick={handleContinue}
              disabled={loading}
              className="bg-emerald-600 w-full flex items-center justify-center py-2.5 text-white rounded"
            >
              <span>{loading ? "Please wait..." : "Continue"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhonenumOTP;
