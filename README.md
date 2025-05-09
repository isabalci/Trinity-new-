# Trinity - Financial Trading Platform

Trinity is a modern financial trading platform inspired by TradingView. It provides users with a comprehensive set of tools for monitoring markets, analyzing charts, and executing trades.

## Features

- **Dashboard**: Overview of market performance with indices, popular markets, and watchlist
- **Trading View**: Interactive charting platform with multiple chart types and timeframes
- **Market Analysis**: Technical indicators, historical data, and price movement visualization
- **Trading Functionality**: Buy and sell orders with market and limit order types
- **Portfolio Management**: Track your investments and monitor performance
- **Multilingual Support**: Full internationalization with English and Turkish language options
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Screenshots

- Dashboard with market overview
- Trading view with charts
- Portfolio tracking
- Mobile-responsive design

## Technology Stack

- **Frontend**: React, TypeScript, Recharts
- **Backend**: Node.js, Express (planned)
- **Database**: PostgreSQL (planned)
- **Styling**: CSS with dark/light themes
- **Libraries**: react-icons, i18next for internationalization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/trinity.git
cd trinity
```

2. Install dependencies
```
cd client
npm install
```

3. Start the development server
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - React components
    - `/contexts` - React contexts for state management
    - `/styles` - CSS styles
    - `/i18n` - Internationalization files
  - `/public` - Static assets

## Development Roadmap

- [x] Basic UI layout and components
- [x] Chart visualization with different timeframes
- [x] Mock market data implementation
- [x] Internationalization (English/Turkish)
- [ ] Real-time market data API integration
- [ ] User authentication and account management
- [ ] Advanced chart indicators and drawing tools
- [ ] Portfolio management with transaction history
- [ ] Social features (comments, shared charts)
- [ ] Mobile app

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by TradingView's interface and functionality
- Icons provided by react-icons
- Chart visualization using Recharts 