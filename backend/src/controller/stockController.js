const Stock = require('../models/Stock');
const axios = require('axios');

exports.createStock = async (req, res) => {
  try {
    const { name, ticker, tickerId, quantity, buyPrice } = req.body;
    
    // Fetch current price
    const currentPrice = await fetchCurrentPrice(tickerId);

    const stock = new Stock({
      user: req.user._id,
      name,
      ticker,
      tickerId,
      quantity,
      buyPrice,
      currentPrice,
      totalValue: quantity * currentPrice,
      pnl: (quantity * currentPrice) - (quantity * buyPrice)
    });

    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user._id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, buyPrice } = req.body;

    const existingStock = await Stock.findById(id);
    const currentPrice = await fetchCurrentPrice(existingStock.tickerId);

    const newQuantity = existingStock.quantity + quantity;
    const newBuyPrice = ((existingStock.quantity * existingStock.buyPrice) + 
                         (quantity * buyPrice)) / newQuantity;

    const updatedStock = await Stock.findByIdAndUpdate(
      id, 
      {
        quantity: newQuantity,
        buyPrice: newBuyPrice,
        currentPrice,
        totalValue: newQuantity * currentPrice,
        pnl: (newQuantity * currentPrice) - (newQuantity * newBuyPrice)
      },
      { new: true }
    );

    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    await Stock.findByIdAndDelete(id);
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function fetchCurrentPrice(tickerId) {
  try {
    const url = `https://indian-stock-exchange-api2.p.rapidapi.com/stock?name=${tickerId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "indian-stock-exchange-api2.p.rapidapi.com",
      },
    };

    const response = await axios(url, options);
    return response.data.currentPrice.NSE;
  } catch (error) {
    console.error("Error fetching current price:", error);
    return 0;
  }
}