import React, { useState } from "react";
import Style from "../App.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Recommendation() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    budget: "",
    riskTolerance: "",
    investmentDuration: "",
    investmentGoal: "",
    cryptocurrencies: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [recommendationPopUp, setRecommendationPopUp] = useState(false);
  const [cohereRecommendation, setCohereRecommendation] = useState("");
  const [geminiRecommendation, setGeminiRecommendation] = useState("");
  const [showCohere, setShowCohere] = useState(true);
  const [showGemini, setShowGemini] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    console.log(formData);
    

    try {
      const response = await axios.post("http://localhost:3000/recommend", {
        budget: Number.parseInt(formData.budget),
        risk_tolerance: formData.riskTolerance,
        duration: formData.investmentDuration,
        goal: formData.investmentGoal,
        interest: formData.cryptocurrencies,
      });

      console.log(JSON.stringify(response.data.cohere_recommendation));
      console.log(JSON.stringify(response.data.gemini_recommendation));

       // Set the recommendations in the state
      setCohereRecommendation(response.data.cohere_recommendation);
      setGeminiRecommendation(response.data.gemini_recommendation);
      setShowPopup(false);
      setRecommendationPopUp(true); // Show the recommendation popup
    
      alert("Recommendation received! Check below.");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations.");
    }finally{
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const userFirstName = localStorage.getItem("userFirstName") || "John";
  const userLastName = localStorage.getItem("userLastName") || "Doe";
  const userEmailAddress =
    localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

    // Handle Cohere recommendation button click
  const handleCohereClick = () => {
    setShowCohere(true);
    setShowGemini(false); // Hide Gemini recommendation
  };

  // Handle Gemini recommendation button click
  const handleGeminiClick = () => {
    setShowCohere(false); // Hide Cohere recommendation
    setShowGemini(true);
  };

  return (
    <>
      <div className={Style.mainDiv}>
        <div className={Style.mainPageMainDiv}>
          <div className={Style.navBarMainPage}>
            <div className={Style.logoNavBarMainPage}>
              <h1>CryptoPulse</h1>
            </div>
            <div className={Style.linkNavBarMainPage}>
              <Link className={Style.linkElementNavBar} to="/mainPage">
                Home
              </Link>
              <Link className={Style.linkElementNavBar} to="/currencies">
                Currencies
              </Link>
              <Link className={Style.linkElementNavBar} to="/favorite">
                Favorite
              </Link>
              <Link className={Style.linkElementNavBar} to="/recommendation">
                GuideAI
              </Link>
            </div>
            <div className={Style.ProfileBtnNavBarMainPage}>
              <button
                className={Style.profileBtn}
                onClick={() => setShowUserInfo(!showUserInfo)}
              >
                Profile
              </button>
              {showUserInfo && (
                <div className={Style.userInfoDiv}>
                  <p
                    className={Style.userInfoDivPara1}
                  >{`${userFirstName} ${userLastName}`}</p>
                  <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
                  <button className={Style.logoutBtn} onClick={logoutUser}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={Style.converterHeadingDiv}>
            <h1>
              <span className={Style.cryptoCurrencyText}>Cryptocurrency</span>{" "}
              Investment Guide & Planner
            </h1>
            {/* <p>
              CryptoPulse provides a personalized investment guide to help you
              make informed cryptocurrency decisions tailored to your financial
              goals and preferences.
            </p> */}
          </div>
          <div className={Style.sendCryptoCurrencyMainDiv}>
            <div className={Style.sendCryptoCurrencyContentDiv}>
              <div className={Style.mainDivInvestment}>
                <p className={Style.investmentPara}>
                  Our investment guide uses tools like Gemini, LangChain, and
                  Cohere to offer a personalized cryptocurrency investment
                  experience. Gemini provides real-time market data to identify
                  opportunities, while LangChain tailors recommendations based
                  on user inputs like budget and risk tolerance. Cohere
                  simplifies complex insights into easy-to-understand guidance.
                  Together, these tools deliver actionable strategies, helping
                  users make informed decisions in the dynamic crypto market
                </p>

                <div className={Style.logoMainDiv}>
                  <div className={Style.imageContainerDiv}>
                    <img
                      src="https://logowik.com/content/uploads/images/google-ai-gemini91216.logowik.com.webp"
                      alt="Gemini Logo"
                    />
                  </div>
                  <div className={Style.imageContainerDiv}>
                    <img
                      src="https://images.seeklogo.com/logo-png/61/1/langchain-logo-png_seeklogo-611654.png"
                      alt="LangChain Logo"
                    />
                  </div>
                  <div className={Style.imageContainerDiv}>
                    <img
                      src="https://logowik.com/content/uploads/images/cohere-new9011.logowik.com.webp"
                      alt="Cohere Logo"
                    />
                  </div>
                </div>

                <div className={Style.getStartedBtnDiv}>
                  <button onClick={() => setShowPopup(true)}>Try Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className={Style.popupOverlay}>
          <div className={Style.popupContent}>
            <h2>Investment Preferences</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Budget (in USD)
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Risk Tolerance
                <select
                  name="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select risk tolerance</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>

              <label>
                Investment Duration
                <select
                  name="investmentDuration"
                  value={formData.investmentDuration}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select duration</option>
                  <option value="Short-term">Short-term</option>
                  <option value="Medium-term">Medium-term</option>
                  <option value="Long-term">Long-term</option>
                </select>
              </label>

              <label>
                Investment Goal
                <select
                  name="investmentGoal"
                  value={formData.investmentGoal}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select goal</option>
                  <option value="Growth">Capital Growth</option>
                  <option value="Income">Passive Income</option>
                  <option value="Diversify">Diversification</option>
                </select>
              </label>
              <label>
                Cryptocurrencies Interested In
                <select
                  name="cryptocurrencies"
                  value={formData.cryptocurrencies}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                  Select a cryptocurrency
                  </option>
                  <option value="Bitcoin">Bitcoin (BTC)</option>
                  <option value="Ethereum">Ethereum (ETH)</option>
                  <option value="BinanceCoin">Binance Coin (BNB)</option>
                  <option value="Ripple">Ripple (XRP)</option>
                  <option value="Cardano">Cardano (ADA)</option>
                  <option value="Solana">Solana (SOL)</option>
                  <option value="Polygon">Polygon (MATIC)</option>
                </select>
              </label>

              <div className={Style.popupActions}>
                {/* Submit Button with dynamic text */}
        <button type="submit" disabled={loading}>
             {loading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress size={24} color="white"/>
            </Box>
          ) : (
            "Submit"
          )}
        </button>
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        

      {/* Pop for showing the recommendation result */}
            {/* Recommendation Popup */}
      {recommendationPopUp && (
        <div className={Style.recommendationPopUpOverlay}>
          <div className={Style.recommendationPopUpContent}>
            {/* Buttons to toggle between recommendations */}
            <div className={Style.recommendationBtnDivOption}>
              <button onClick={handleCohereClick}>Cohere Recommendation</button>
              <button onClick={handleGeminiClick}>Gemini Recommendation</button>
            </div>

            {/* Show Cohere recommendation */}
            {showCohere && (
              <div className={Style.responseDiv}>
                <p>{cohereRecommendation}</p>
              </div>
            )}

            {/* Show Gemini recommendation */}
            {showGemini && (
              <div className={Style.responseDiv}>
                <p>{geminiRecommendation}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
    </>
  );
}

export default Recommendation;
