# 10X Hacker Cup - CryptoPulse

![CryptoPulse]()

CryptoPulse is your go-to web application for tracking, comparing, and managing cryptocurrency prices with ease. Built using the MERN stack, this platform empowers users to stay informed about the dynamic world of cryptocurrencies while providing a seamless experience for conversions and data visualization.

---

## Features

### 1. **Live Cryptocurrency Prices**
- Get real-time data for various cryptocurrencies using the CoinGecko API.

### 2. **Compare Cryptocurrencies**
- Compare different cryptocurrencies side-by-side to make informed decisions.

### 3. **Favorites Management**
- Add your favorite cryptocurrencies to a list for quick access.

### 4. **Cryptocurrency Converter**
- Convert any amount from cryptocurrency to your preferred fiat currency and vice versa.

### 5. **Data Visualization**
- Leverage interactive charts powered by `react-google-charts` to visualize trends and historical data.

---

## Tech Stack

### Frontend:
- React.js
- react-google-charts
- CSS

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB

### API:
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## Installation and Setup

### Prerequisites:
- Node.js installed on your machine
- MongoDB instance (local or cloud)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cryptopulse.git
   cd cryptopulse
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   REACT_APP_COINGECKO_API_URL=https://api.coingecko.com/api/v3
   ```

4. Start the application:
   - **Backend**:
     ```bash
     npm start
     ```
   - **Frontend**:
     ```bash
     cd client
     npm start
     ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Screenshots

1. **Login Page:**
   ![Login Page](https://i.imgur.com/slJppQo.png)

2. **Home Page:**
   ![Home Page](https://i.imgur.com/1d6GDXk.png)

3. **Top Currencies Prices:**
   ![Top Currencies](https://i.imgur.com/fH1C3w1.png)

4. **Currencies Page:**
   ![Currencies Page](https://i.imgur.com/HpETiH4.png)

5. **Currency Details and Daily Price Trend Chart:**
   ![Currencies Detail Page](https://i.imgur.com/rYHLa6P.png)

6. **Favorite Currency Page:**
   ![Favorite Currency Page](https://i.imgur.com/26Ow0VE.png)

7. **Currency Converter Page:**
   ![Currency Converter Page](https://i.imgur.com/d3hDb37.png)
   
   

---

## Future Enhancements
- Support for more fiat and cryptocurrencies.
- Integration of additional APIs for market news and insights.
- Mobile application version.
- Buy and Sell cryptoCurrencies using Metamask Wallet

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

---

## Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api) for providing reliable cryptocurrency data.
- Open-source libraries and tools used in this project.

---

**Stay ahead in the crypto game with CryptoPulse!**
