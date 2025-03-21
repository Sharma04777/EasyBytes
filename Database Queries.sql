-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 10000.00,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Stocks Table
CREATE TABLE stocks (
    symbol VARCHAR(10) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    stock_symbol VARCHAR(10) REFERENCES stocks(symbol) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Portfolio Table
CREATE TABLE portfolio (
    user_id INT REFERENCES users(id) NOT NULL,
    stock_symbol VARCHAR(10) REFERENCES stocks(symbol) NOT NULL,
    quantity INT NOT NULL,
    average_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (user_id, stock_symbol)
);

-- Example Queries:

-- Get user portfolio
SELECT stock_symbol, quantity, average_price FROM portfolio WHERE user_id = 1;

-- Get transaction history for user
SELECT * FROM transactions WHERE user_id = 1 ORDER BY transaction_date DESC;

-- Update stock price
UPDATE stocks SET current_price = 150.00, last_updated = CURRENT_TIMESTAMP WHERE symbol = 'AAPL';

-- Insert new transaction
INSERT INTO transactions (user_id, stock_symbol, transaction_type, quantity, price) VALUES (1, 'AAPL', 'BUY', 10, 150.00);
