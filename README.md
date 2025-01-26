# Stock Portfolio Tracker

A responsive web application for managing and tracking your stock portfolio. The app allows users to perform CRUD operations on stock holdings and provides real-time updates on stock prices. Built with React for the frontend and Node.js for the backend.

## Features

- **Stock Management**: Add, edit, delete, and view stock holdings.
- **Real-Time Price Updates**: Integrates with stock price APIs to provide up-to-date market data.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Secure Backend**: Developed using Node.js for robust and scalable performance.
- **Deployment**: Hosted on Vercel (frontend) and Render (backend).

## Tech Stack

### Frontend
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB (or any preferred database, if applicable)

### Deployment
- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) or another database
- [Git](https://git-scm.com/) installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lovelish-xd/portfolio-tracker.git
   cd portfolio-tracker
   ```

2. Install dependencies:

   #### Frontend
   ```bash
   cd frontend
   npm install
   ```

   #### Backend
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `backend` folder and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   API_KEY=your_stock_price_api_key
   ```

4. Run the development servers:

   #### Frontend
   ```bash
   cd frontend
   npm run dev
   ```

   #### Backend
   ```bash
   cd backend
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Create an account or log in.
2. Add stocks to your portfolio by specifying the stock symbol, quantity, and purchase price.
3. View your portfolio with real-time price updates.
4. Edit or delete stock entries as needed.

## API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | /api/stocks      | Fetch all stocks           |
| POST   | /api/stocks      | Add a new stock            |
| PUT    | /api/stocks/:id  | Update stock information   |
| DELETE | /api/stocks/:id  | Delete a stock             |

## Screenshots

(Add screenshots or GIFs showing the UI of your application.)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

