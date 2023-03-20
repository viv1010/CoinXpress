import React from 'react';
import '../Component/Coinitem.css'

const CoinItem = ({name,symbol,marketCap,volume,image,currentPrice,priceChange}) => {
    return (
    <div className="crypto-coin">
      <img src={image} alt="" className='coin-logo'/>
      <div className="coin-wrap">
        <h1 className="coin-name">{name}</h1>
        <p className="coin-symbol">&nbsp;&nbsp;{symbol}</p>
      </div>
      <p className="coin_price">Current Price: ${currentPrice.toLocaleString()}</p>
      <p className="market-cap">Market Cap: ${marketCap.toLocaleString()}</p>
      <p className="coin-volume">Volume (24H): ${volume.toLocaleString()}</p>
      {priceChange < 0 ? (
        <div className="priceContainerDOWN">
          <i className="fas fa-angle-down fa-2x"></i>
          <p className="priceChange">{priceChange.toFixed(2)}%</p>
        </div>
      ) : (
        <div className="priceContainerUP">
          <i className="fas fa-angle-up fa-2x"></i>
          <p className="priceChange">{priceChange.toFixed(2)}%</p>
        </div>
      )}
    </div>
  )}

export default CoinItem