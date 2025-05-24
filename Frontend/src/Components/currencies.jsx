import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import PriceComponent from "./priceComponent";
import axios from "axios";
import { CoinContext } from "./Context/coincontext";

function Currencies() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

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

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

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
              {/* <Link className={Style.linkElementNavBar} to="/converter">Converter</Link> */}
               <Link className={Style.linkElementNavBar} to="/recommendation">GuideAI</Link>
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
          <div className={Style.currenciesSection1}>
            <div className={Style.currenciesSection1Div1}>
              <h1 className={Style.stayAheadHeading}>
                Explore{" "}
                <span className={Style.cryptoCurrencyText}>
                  {" "}
                  Cryptocurrencies
                </span>{" "}
              </h1>
              <p className={Style.discoverPara}>
                Discover a wide range of cryptocurrencies available in the
                market. Stay updated with the latest trends, market caps, and
                real-time values of your favorite digital currencies.
              </p>
              <form onSubmit={searchHandler}>
                <input
                  onChange={inputHandler}
                  list="coinlist"
                  value={input}
                  type="text"
                  placeholder="Search crypto.."
                  required
                />

                <datalist id="coinlist">
                  {allCoin.map((item, index) => (
                    <option key={index} value={item.name} />
                  ))}
                </datalist>

                <button type="submit">Search</button>
              </form>
            </div>
            <div className={Style.cryptoTable}>
              <div className={Style.tableLayout}>
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{ textAlign: "center" }}>24H Change</p>
                <p className={Style.marketCap}>Market Cap</p>
              </div>
              {displayCoin.slice(0, 10).map((item, index) => (
                <Link
                  to={`/coin/${item.id}`}
                  className={Style.tableLayout}
                  key={index}
                >
                  <p>{item.market_cap_rank}</p>
                  <div>
                    <img src={item.image} alt="" />
                    <p>{item.name + " - " + item.symbol}</p>
                  </div>
                  <p>
                    {currency.symbol} {item.current_price.toLocaleString()}
                  </p>
                  <p
                    className={
                      item.price_change_percentage_24h > 0
                        ? Style.green
                        : Style.red
                    }
                  >
                    {Math.floor(item.price_change_percentage_24h * 100) / 100}
                  </p>
                  <p className="market-cap">
                    {currency.symbol} {item.market_cap.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Currencies;





