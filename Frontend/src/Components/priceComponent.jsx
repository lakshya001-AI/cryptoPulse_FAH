import React from "react";
import Style from "../App.module.css";

export default function PriceComponent({imgURL, coin, coinPrice}) {
  return (
    <>
      <div className={Style.priceDiv}>
        <img
          src={imgURL}
          className={Style.coinImg}
        />
        <h2 className={Style.currencyHeading}>{coin}</h2>
        <div className={Style.exchangePriceDiv}>
          <p className={Style.priceExchangePara}>Price Exchange:</p>
          <p className={Style.pricePara}>{coinPrice}</p>
        </div>
      </div>
    </>
  );
}