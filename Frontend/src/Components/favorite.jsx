import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "../App.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Favorite() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [favoriteCryptos, setFavoriteCryptos] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [cachedData, setCachedData] = useState({});

  // User details
  const userFirstName = localStorage.getItem("userFirstName") || "John";
  const userLastName = localStorage.getItem("userLastName") || "Doe";
  const userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  
  useEffect(() => {
  async function fetchFavoriteDetails() {
    try {
      // Step 1: Fetch coin IDs from the backend
      const { data } = await axios.post("http://localhost:5000/getTheFavoriteCryptoCurrencies", {
        userEmailAddress,
      });

      // Check if the response has favoriteCryptos and map them to coin IDs
      const coinIds = data.favoriteCryptos?.map((crypto) => crypto.coinId).join(",");
      if (coinIds) {
        // Check if data is cached for the selected currency
        const cachedForCoinIds = cachedData[coinIds];
        const cachedForCurrency = cachedForCoinIds ? cachedForCoinIds[selectedCurrency] : null;

        if (cachedForCurrency) {
          setFavoriteCryptos(cachedForCurrency);
        } else {
          // Step 2: Fetch coin details from CoinGecko
          const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
              vs_currency: selectedCurrency,
              ids: coinIds, // Batch request for multiple coins
            },
          });

          // Cache the fetched data
          const newCache = {
            ...cachedData,
            [coinIds]: {
              ...cachedForCoinIds,
              [selectedCurrency]: response.data,
            },
          };
          setCachedData(newCache);

          // Set detailed crypto data
          setFavoriteCryptos(response.data);
        }
      } else {
        console.warn("No favorite cryptocurrencies found for the user.");
        setFavoriteCryptos([]); // Handle case when no favorite coins are returned
      }
    } catch (error) {
      console.error("Error fetching favorite cryptocurrencies:", error?.response || error.message);
      toast.error("Failed to load favorites. Please try again.", {
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  // Fetch details only if the email address and selected currency are available
  if (userEmailAddress && selectedCurrency) {
    fetchFavoriteDetails();
  }
}, [userEmailAddress, selectedCurrency, cachedData]); // Ensure proper dependencies


  // Remove a favorite cryptocurrency
  const removeFavoriteCrypto = async (coinId) => {
    try {
      const { data } = await axios.post("http://localhost:5000/removeFavoriteCrypto", {
        coinId,
        userEmailAddress,
      });

      toast.success(`${coinId} removed Successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        className: Style.customToast,
      });

      setFavoriteCryptos((prevCryptos) =>
        prevCryptos.filter((crypto) => crypto.id !== coinId)
      );
    } catch (error) {
      console.error("Error removing favorite cryptocurrency:", error);
      toast.error("Failed to remove favorite. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        className: Style.customToast,
      });
    }
  };

  // Handle currency change
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
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
            {/* <Link className={Style.linkElementNavBar} to="/converter">Converter</Link> */}
             <Link className={Style.linkElementNavBar} to="/recommendation">GuideAI</Link>
          </div>

          <div className={Style.ProfileBtnNavBarMainPage}>
            <select onChange={handleCurrencyChange} value={selectedCurrency}>
              <option value="usd">USD</option>
              <option value="inr">INR</option>
              <option value="eur">EUR</option>
            </select>
            <button
              className={Style.profileBtn}
              onClick={() => setShowUserInfo(!showUserInfo)}
            >
              Profile
            </button>

            {showUserInfo && (
              <div className={Style.userInfoDiv}>
                <p className={Style.userInfoDivPara1}>{`${userFirstName} ${userLastName}`}</p>
                <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
                <button className={Style.logoutBtn} onClick={logoutUser}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={Style.favoriteContentDiv}>
          <h1>Your Favorite <span className={Style.cryptoCurrencyText}> Cryptocurrencies</span> at a Glance</h1>
          <p>Stay up to date with the latest prices of the cryptocurrencies you love!</p>
        </div>

        <div className={Style.favoriteCryptosMainDiv}>
          {favoriteCryptos.length > 0 ? (
            favoriteCryptos.map((crypto) => (
              <div key={crypto.id} className={Style.favoriteCryptoDiv}>
                <div className={Style.cryptoInfoDiv}>
                  <div className={Style.imageAndNameCrypto}>
                    <img src={`${crypto.image}`} alt="" />
                    <h1>{`${crypto.name} (${crypto.symbol.toUpperCase()})`}</h1>
                  </div>
                  <div className={Style.cryptoInfoDiv1}>
                    <p>
                      Current Price: {selectedCurrency.toUpperCase()} {crypto.current_price}
                    </p>
                    <p>Market Cap: {selectedCurrency.toUpperCase()} {crypto.market_cap.toLocaleString()}</p>
                    <p>24h High: {selectedCurrency.toUpperCase()} {crypto.high_24h}</p>
                    <p>24h Low: {selectedCurrency.toUpperCase()} {crypto.low_24h}</p>
                  </div>
                </div>
                <button
                  className={Style.removeFavoriteBtn}
                  onClick={() => removeFavoriteCrypto(crypto.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No favorite cryptocurrencies found.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Favorite;

