import React from 'react'

const Navbar = ({handleChange}) => {
  return (
    <div className="header">
          <h1 className="brand">
            CoinXpress<i className="fa-solid fa-truck-fast"></i>
          </h1>
          <form action="">
            <input
              className="input-field"
              type="text"
              onChange={handleChange}
              placeholder="Search here..."
            />
          </form>
        </div>
  )
}

export default Navbar