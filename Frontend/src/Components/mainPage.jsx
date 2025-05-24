import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import PriceComponent from "./priceComponent";
import axios from "axios";

function MainPage() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const [bitPrice, setBitPrice] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [tetPrice, setTetPrice] = useState();
  const [binPrice, setBinPrice] = useState();

  useEffect(() => {
    async function bitPrice() {
      const BitPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=inr"
      );
      setBitPrice(Math.floor(BitPrice.data.INR));
    }

    async function ethPrice() {
      const BitPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=inr"
      );
      setEthPrice(Math.floor(BitPrice.data.INR));
    }

    async function tetPrice() {
      const BitPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=inr"
      );
      setTetPrice(Math.floor(BitPrice.data.INR));
    }

    async function binPrice() {
      const BitPrice = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=inr"
      );
      setBinPrice(Math.floor(BitPrice.data.INR));
    }

    bitPrice();
    ethPrice();
    tetPrice();
    binPrice();
  }, []);


  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";


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

          {/* section 1 Main Page */}

          <div className={Style.section1MainPage}>
            <div className={Style.overlaySection1MainPage}>
              <div className={Style.overlaySection1MainPageDiv1}>
                <p className={Style.overlaySection1MainPageDiv1Para1}>
                  Stay Ahead with Real-Time Crypto Prices.
                </p>
              </div>
              <div className={Style.overlaySection1MainPageDiv2}>
                <p>
                  Discover the latest trends in cryptocurrency with our
                  user-friendly platform. Easily check prices and make informed
                  decisions to maximize your investments.
                </p>
              </div>

              <div className={Style.overlaySection1MainPageDiv3}>
                <button className={Style.exploreBtn}>Explore</button>
                <button className={Style.learnMoreBtn}>Learn More</button>
              </div>
            </div>
          </div>

          <div className={Style.section2MainPage}>
            <div className={Style.section2MainPageDiv1}>
              <p className={Style.section2MainPageDiv1Para1}>
                Discover the Ultimate
                <span className={Style.cryptoCurrencyText}>
                  {" "}
                  Cryptocurrency
                </span>{" "}
                Platform for Real-Time Insights and Tracking
              </p>
              <p className={Style.section2MainPageDiv1Para2}>
                Stay ahead in the crypto market with our real-time price
                updates. Effortlessly manage your investments with our intuitive
                portfolio tracking tools.
              </p>
              <div className={Style.section2MainPageDiv1InnerDiv}>
                <div className={Style.section2MainPageDiv1InnerDiv1}>
                  <p className={Style.section2MainPageDiv1InnerDiv1Para1}>
                    Price Updates
                  </p>
                  <p className={Style.section2MainPageDiv1InnerDiv1Para2}>
                    Get instant access to live cryptocurrency prices and never
                    miss a market movement.
                  </p>
                </div>

                <div className={Style.section2MainPageDiv1InnerDiv2}>
                  <p className={Style.section2MainPageDiv1InnerDiv1Para1}>
                    Portfolio Tracking
                  </p>
                  <p className={Style.section2MainPageDiv1InnerDiv1Para2}>
                    Monitor your investments in real-time and make informed
                    decisions with ease.
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.section2MainPageDiv2}>
              <div className={Style.cryptoPriceDiv}>
                <PriceComponent
                  imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png"
                  coin="Bitcoin"
                  coinPrice={bitPrice}
                />
                <PriceComponent
                  imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png"
                  coin="Ethereum"
                  coinPrice={ethPrice}
                />
                <PriceComponent
                  imgURL="https://cdn.worldvectorlogo.com/logos/tether-1.svg"
                  coin="Tether"
                  coinPrice={tetPrice}
                />
                <PriceComponent
                  imgURL="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
                  coin="Binance Coin"
                  coinPrice={binPrice}
                />
              </div>
            </div>
          </div>

          <div className={Style.section3MainPage}>
            <div className={Style.section3Content}>
              <h2 className={Style.section3Heading}>Discover Our Features</h2>
              <p className={Style.section3Description}>
              Our platform offers real-time updates on cryptocurrency prices, ensuring you never miss a market shift. Stay informed and make smarter investment decisions with our powerful tools.
              </p>
              <div className={Style.featureGrid}>
                <div className={Style.featureCard}>
                  <h3>Real-Time Crypto Prices</h3>
                  <p>
                    Stay updated with live cryptocurrency prices and market
                    trends. Get the latest data to make informed investment
                    decisions effortlessly.
                  </p>
                </div>
                <div className={Style.featureCard}>
                  <h3>Favorite Your Cryptos</h3>
                  <p>
                    Keep track of your favorite cryptocurrencies with just a
                    click. Bookmark the ones you love and access them anytime,
                    anywhere.
                  </p>
                </div>
                <div className={Style.featureCard}>
                  <h3>Compare Prices Instantly</h3>
                  <p>
                    Easily compare the prices of multiple cryptocurrencies to
                    identify opportunities and make smarter trading choices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={Style.section4MainPage}>
            <div className={Style.overlaySection4MainPage}>
              <h1>Track Your Crypto Journey Today</h1>
              <p>Join us now to effortlessly monitor cryptocurrency prices and manage your investment portfolio.</p>
              
              <div className={Style.overlaySection1MainPageDiv3}>
                <button className={Style.exploreBtn}>Join US</button>
                <button className={Style.learnMoreBtn}>Learn More</button>
              </div>
            </div>
          </div>

          <div className={Style.footerSection}>
            <p>© 2024 CryptoPulse. All rights reserved.</p>
          </div>

       
        </div>
      </div>
    </>
  );
}

export default MainPage;
