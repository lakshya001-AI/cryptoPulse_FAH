// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Style from "../App.module.css";
// import axios from "axios";

// const Converter = () => {
//   const navigate = useNavigate();
//   const [showUserInfo, setShowUserInfo] = useState(false);
//   const [amount, setAmount] = useState(1);
//   const [crypto, setCrypto] = useState("bitcoin");
//   const [currency, setCurrency] = useState("usd");
//   const [convertedValue, setConvertedValue] = useState(0);
//   const [cryptos, setCryptos] = useState([]);

//   function logoutUser() {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   }

//   let userFirstName = localStorage.getItem("userFirstName") || "John";
//   let userLastName = localStorage.getItem("userLastName") || "Doe";
//   let userEmailAddress =
//     localStorage.getItem("userEmailAddress") || "john.doe@example.com";

//   const API_URL = `https://api.coingecko.com/api/v3/coins/markets`;

//   useEffect(() => {
//     const fetchCryptos = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
//         );
//         setCryptos(response.data);
//       } catch (error) {
//         console.error("Error fetching cryptocurrencies:", error);
//       }
//     };

//     fetchCryptos();
//   }, [currency]);

//   useEffect(() => {
//     const selectedCrypto = cryptos.find((item) => item.id === crypto);
//     if (selectedCrypto) {
//       const result = (amount * selectedCrypto.current_price).toFixed(2);
//       setConvertedValue(result);
//     }
//   }, [crypto, currency, amount, cryptos]);

//   return (
//     <>
//       <div className={Style.mainDiv}>
//         <div className={Style.mainPageMainDiv}>
//           <div className={Style.navBarMainPage}>
//             <div className={Style.logoNavBarMainPage}>
//               <h1>CryptoPulse</h1>
//             </div>

//             <div className={Style.linkNavBarMainPage}>
//               <Link className={Style.linkElementNavBar} to="/mainPage">
//                 Home
//               </Link>
//               <Link className={Style.linkElementNavBar} to="/currencies">
//                 Currencies
//               </Link>
//               <Link className={Style.linkElementNavBar} to="/favorite">
//                 Favorite
//               </Link>
//               <Link className={Style.linkElementNavBar} to="/converter">
//                 Converter
//               </Link>
//             </div>

//             <div className={Style.ProfileBtnNavBarMainPage}>
//               <button
//                 className={Style.profileBtn}
//                 onClick={() => setShowUserInfo(!showUserInfo)}
//               >
//                 Profile
//               </button>

//               {showUserInfo && (
//                 <div className={Style.userInfoDiv}>
//                   <p
//                     className={Style.userInfoDivPara1}
//                   >{`${userFirstName} ${userLastName}`}</p>
//                   <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
//                   <button className={Style.logoutBtn} onClick={logoutUser}>
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className={Style.converterHeadingDiv}>
//             <h1>
//               <span className={Style.cryptoCurrencyText}> Cryptocurrency</span>{" "}
//               Converter & Calculator
//             </h1>
//             <p>
//               CryptoPulse exchange rate calculator helps you convert prices
//               online between two currencies in real-time.
//             </p>
//           </div>

//           <div className={Style.convertInputFieldsDiv}>
//             {/* This is an amount input */}
//             <input
//               type="text"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />

//             {/*This is a cryptoCurrencies select option*/}
//             <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
//               {cryptos.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             {/* This is font awesome logo*/}
//             <i className="fa-solid fa-arrow-right-arrow-left fa-2xl"></i>

//             {/* This is an input where we show the result after conversion */}
//             <input type="text" value={convertedValue} readOnly />

//             {/* This is for the Currency select option */}
//             <select
//               value={currency}
//               onChange={(e) => setCurrency(e.target.value)}
//             >
//               <option value="usd">USD</option>
//               <option value="eur">EUR</option>
//               <option value="inr">INR</option>
//             </select>
//           </div>

//           <div className={Style.sendCryptoCurrencyMainDiv}>
//             <div className={Style.sendCryptoCurrencyContentDiv}>
//               <h2 className={Style.heading}>
//               Send Cryptocurrencies Instantly
//               </h2>
//               <p className={Style.paragraph}>
//                 Securely send your cryptocurrencies using MetaMask. Enjoy a
//                 seamless and fast experience powered by blockchain technology.
//               </p>
//               <p className={Style.paragraph}>
//                 Start your journey now. Your digital assets, your control.
//               </p>
//               <button className={Style.sendButton}>Send Crypto Now</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Converter;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

const Converter = () => {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [amount, setAmount] = useState(1);
  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [convertedValue, setConvertedValue] = useState(0);
  const [cryptos, setCryptos] = useState([]);
  const [userAccount, setUserAccount] = useState(null); // state to store user wallet address

  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress =
    localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  const API_URL = `https://api.coingecko.com/api/v3/coins/markets`;

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          `${API_URL}?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        );
        setCryptos(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      }
    };

    fetchCryptos();
  }, [currency]);

  useEffect(() => {
    const selectedCrypto = cryptos.find((item) => item.id === crypto);
    if (selectedCrypto) {
      const result = (amount * selectedCrypto.current_price).toFixed(2);
      setConvertedValue(result);
    }
  }, [crypto, currency, amount, cryptos]);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(accounts[0]); // Store user's wallet address
      } catch (error) {
        console.error("Error connecting MetaMask:", error);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
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
            <Link className={Style.linkElementNavBar} to="/converter">
              Converter
            </Link>
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
                <p className={Style.userInfoDivPara1}>
                  {`${userFirstName} ${userLastName}`}
                </p>
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
            <span className={Style.cryptoCurrencyText}>Cryptocurrency</span> Converter & Calculator
          </h1>
          <p>
            CryptoPulse exchange rate calculator helps you convert prices online between two currencies in real-time.
          </p>
        </div>

        <div className={Style.convertInputFieldsDiv}>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
            {cryptos.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <i className="fa-solid fa-arrow-right-arrow-left fa-2xl"></i>

          <input type="text" value={convertedValue} readOnly />

          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
        </div>

        <div className={Style.sendCryptoCurrencyMainDiv}>
          <div className={Style.sendCryptoCurrencyContentDiv}>
            <h2 className={Style.heading}>Send Cryptocurrencies Instantly</h2>
            <p className={Style.paragraph}>
              Securely send your cryptocurrencies using MetaMask. Enjoy a seamless and fast experience powered by blockchain technology.
            </p>
            <p className={Style.paragraph}>
              Start your journey now. Your digital assets, your control.
            </p>
            <button className={Style.sendButton} onClick={connectWallet}>
              {userAccount ? `Wallet: ${userAccount.slice(0, 6)}...` : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;

