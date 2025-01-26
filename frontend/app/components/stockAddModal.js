"use client";
import { stockData } from "./stockData.js";
import { useState, useRef } from "react";

const stockAddModal = ({ isOpen, onClose, onSubmit, stockToEdit, stock }) => {
  if (!isOpen) return null;

  const [tickerValue, setTickerValue] = useState(stockToEdit?.ticker || "");
  const [tickerId,setTickerId] = useState(stockToEdit?.ticker_id || "");
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(stockToEdit?.name || "");
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a new stock object
    const newStock = {
      name: inputValue,
      ticker: tickerValue,
      quantity: parseInt(quantity, 10),
      buyPrice: parseFloat(buyPrice),
      tickerId: tickerId,
    };

    try {
      // Pass the stock data to the parent
     onSubmit(newStock);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">{stock ? "Edit Stock Details" : "Add Stock Details"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Stock Name */}
          <div className="mb-4">
            <label htmlFor="stockName" className="block text-sm font-medium text-black">
              Stock Name
            </label>
            <input
              type="text"
              id="stockName"
              className="w-full border text-black border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
              ref={inputRef}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!isHovered) {
                  setIsFocused(false);
                }
              }
              }
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);

                // Clear ticker value if stock name is deleted
                if (value.trim() === "") {
                  setTickerValue("");
                }
              }}
            />
            {isFocused &&
              <div className="shadow-lg max-h-28 overflow-y-auto" onMouseEnter={() => { setIsHovered(true); }} onMouseLeave={() => { setIsHovered(false); }}>
                {stockData.map((stock, index) => {
                  const isMatch = stock.stock_name.toLowerCase().includes(inputValue.toLowerCase());
                  return (
                    <div key={index}>
                      {isMatch && <div className="p-1 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setInputValue(stock.stock_name);
                          setTickerValue(stock.ticker_name);
                          setTickerId(stock.ticker_id);
                          if (inputRef.current) { inputRef.current.focus(); }
                        }}>
                        {stock.stock_name}
                      </div>}
                    </div>
                  )
                })}
              </div>
            }
          </div>

          {/* Ticker */}
          <div className="mb-4">
            <label htmlFor="ticker" className="block text-sm font-medium text-black">
              Ticker
            </label>
            <input
              type="text"
              id="ticker"
              value={tickerValue}
              className="w-full border text-black border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
              readOnly
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-black">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border text-black border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Buy Price */}
          <div className="mb-4">
            <label htmlFor="buyPrice" className="block text-sm font-medium text-black">
              Buy Price
            </label>
            <input
              type="number"
              step="0.01"
              id="buyPrice"
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full border text-black border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default stockAddModal;
