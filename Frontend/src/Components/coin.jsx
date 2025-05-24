import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "./Context/coincontext";
import LineChart from "./LineChart/lineChart";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import PriceComponent from "./priceComponent";
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency, API_KEY } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);

  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress =
    localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };


  async function addToFavorite(coinId, coinName) {


    try {
        let response = await axios.post("http://localhost:5000/addToFavorite", {
            coinId,
            coinName,
            userEmailAddress,
        });
        
        toast.success(response.data.message, {
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
    } catch (error) {
        toast.error(error.response.data.message || "An Error Occurred!", {
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
}


  if (coinData && historicalData) {
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
                <Link className={Style.linkElementNavBar} to="/converter">Converter</Link>
              </div>

              <div className={Style.ProfileBtnNavBarMainPage}>
                <select onChange={currencyHandler}>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="inr">INR</option>
                </select>
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
            <div className={Style.coinMainDiv}>
              <div className={Style.coinMainDivInnerDiv}>
                <div className={Style.coinMainDivInnerDiv1}>
                  <div className={Style.coinMainDivInnerDiv11}>
                    <img src={coinData.image.large} alt="" />
                    <p className={Style.cryptoCurrencyNamePara}>
                      <b>
                        {coinData.name} ({coinData.symbol.toUpperCase()})
                      </b>
                    </p>
                  </div>
                  <div className={Style.coinMainDivInnerDiv12}>
                    <button className={Style.addToFavoriteBtn} onClick={(e)=>{addToFavorite(coinId,coinData.name)}}>Add to Favorite</button>
                  </div>
                </div>
                <div className={Style.coinChart}>
                  {/* <LineChart historicalData={historicalData}/> */}
                  <LineChart historicalData={historicalData} />
                </div>

                <div className={Style.coinInfo}>
                  <table className={Style.coinInfoTable}>
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Crypto Market Rank</td>
                        <td>{coinData.market_cap_rank}</td>
                      </tr>
                      <tr>
                        <td>Current Price</td>
                        <td>
                          {currency.symbol}{" "}
                          {coinData.market_data.current_price[
                            currency.name
                          ].toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td>Market Cap</td>
                        <td>
                          {currency.symbol}{" "}
                          {coinData.market_data.market_cap[
                            currency.name
                          ].toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td>24 Hour High</td>
                        <td>
                          {currency.symbol}{" "}
                          {coinData.market_data.high_24h[
                            currency.name
                          ].toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td>24 Hour Low</td>
                        <td>
                          {currency.symbol}{" "}
                          {coinData.market_data.low_24h[
                            currency.name
                          ].toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </div>
      </>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
