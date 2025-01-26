"use client";
import Navbar from "../components/navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import StockAddModal from "../components/stockAddModal";

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolio, setPortfolio] = useState(0);
  const [editStockIndex, setEditStockIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  

  const openModal = (index = null) => {
    setEditStockIndex(index); // If index is null, we're adding a new stock
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Fetch current price based on tickerId
  const fetchCurrentPrice = async (tickerId) => {
    const url = `https://indian-stock-exchange-api2.p.rapidapi.com/stock?name=${tickerId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4eb9d746b8msh878c75e71851c05p18d337jsne802c786b04b",
        "x-rapidapi-host": "indian-stock-exchange-api2.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // Assuming you want to get the price of the stock
      return result.currentPrice.NSE; // Update this depending on the actual response structure
    } catch (error) {
      console.error("Error fetching current price:", error);
      return 0;
    }
  };

  const handleFormSubmit = async (stock) => {
    // Fetch the current price using the ticker ID
    const price = await fetchCurrentPrice(stock.tickerId);

    // Update stocks
    setStocks((prevStocks) => {
      const updatedStocks = [...prevStocks];
      if (editStockIndex !== null) {
        // Editing an existing stock
        const existingStock = updatedStocks[editStockIndex];
        const newQuantity = existingStock.quantity + stock.quantity;

        // Weighted average buy price
        const newBuyPrice =
          (existingStock.quantity * existingStock.buyPrice +
            stock.quantity * stock.buyPrice) /
          newQuantity;

        updatedStocks[editStockIndex] = {
          ...existingStock,
          quantity: newQuantity,
          buyPrice: newBuyPrice,
          totalValue: newQuantity * existingStock.currentPrice,
          pnl:(newQuantity * existingStock.currentPrice) - (newQuantity * newBuyPrice)
        };

      } else {
        // Adding a new stock
        updatedStocks.push({
          ...stock,
          currentPrice:price,
          totalValue: stock.quantity * price,
          pnl:(stock.quantity * price) - (stock.quantity * stock.buyPrice)
        });

      }
      return updatedStocks;
    });

    // Update portfolio value
    setPortfolio((prevPortfolio) => {
      if (editStockIndex !== null) {
        const existingStock = stocks[editStockIndex];
        const newQuantity = existingStock.quantity + stock.quantity;
        const updatedValue = newQuantity * existingStock.currentPrice - existingStock.totalValue;
        return prevPortfolio + updatedValue;
      } else {
        return prevPortfolio + stock.quantity * price;
      }
    });

    closeModal();
  };
  
  const handleDelete = async (index) => {
    const deletedStockValue = stocks[index].quantity * stocks[index].currentPrice;
    setStocks(stocks.filter((_, i) => i !== index));
    setPortfolio((prevPortfolio) => prevPortfolio - deletedStockValue);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="mx-4 my-4">
        <h1 className="text-black text-3xl font-semibold">Stock Wallet</h1>
      </div>
      <div className="mx-4 mt-10 pb-5 flex justify-between items-center border-b">
        <div>
          <p className="text-gray-400 text-xs">CURRENT PORTFOLIO VALUE</p>
          <h1 className="text-black text-3xl font-semibold">
            <span className="text-gray-500">₹</span>
            {portfolio.toFixed(2)}
          </h1>
        </div>
        <div className="flex items-center justify-around gap-2">
          <button
            onClick={() => openModal()}
            className="bg-green-400 p-2 rounded-md text-black border hover:bg-green-500"
          >
            Add Stock
          </button>
          <StockAddModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleFormSubmit}
            stockToEdit={editStockIndex !== null ? stocks[editStockIndex] : null}
          />
          <div className="bg-gray-300 flex justify-around items-center p-2 rounded-md">
            <Image
              alt="search"
              className=""
              height={1}
              src="/assets/search.png"
              width={20}
            />
            <input
              className="text-black bg-inherit ml-2 focus:outline-none border-none"
              type="text"
              placeholder="Search Stocks"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container p-4 min-w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-1 py-2 text-center">Stock Name</th>
                <th className="border px-1 py-2 text-center">Ticker</th>
                <th className="border px-1 py-2 text-center">Quantity</th>
                <th className="border px-1 py-2 text-center">Buy Price</th>
                <th className="border px-1 py-2 text-center">Current Price</th>
                <th className="border px-1 py-2 text-center">P&L</th>
                <th className="border px-1 py-2 text-center">Total Value</th>
                <th className="border px-1 py-2 text-center">Actions</th>

              </tr>
            </thead>
            <tbody>
              {filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No stocks added yet.
                  </td>
                </tr>
              ) : (
                filteredStocks.map((stock, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border px-4 py-2 text-center">{stock.name}</td>
                    <td className="border px-4 py-2 text-center">{stock.ticker}</td>
                    <td className="border px-4 py-2 text-center">
                      {stock.quantity}
                    </td>
                    <td className="border px-4 py-2 text-center">₹{stock.buyPrice.toFixed(2)}</td>
                    <td className="border px-4 py-2 text-center">₹{stock.currentPrice}</td>
                    <td className="border px-4 py-2 text-center">₹{stock.pnl.toFixed(2)}</td>
                    <td className="border px-4 py-2 text-center">
                      ₹{stock.totalValue.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="text-black hover:bg-blue-400 p-1 px-3 mr-2 rounded-md bg-blue-300"
                        onClick={() => openModal(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-black hover:bg-red-500 p-1 px-3 rounded-md bg-red-400"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}