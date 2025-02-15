import React, { useState } from 'react';
import './Trades.css';

const Trades = () => {
  const [trades, setTrades] = useState([
    {
      id: 1,
      cardOffered: 'Babe Ruth 1933 Goudey',
      cardRequested: 'Mickey Mantle 1952 Topps',
      status: 'Pending',
    },
    {
      id: 2,
      cardOffered: 'Ken Griffey Jr. 1989 Upper Deck',
      cardRequested: 'Derek Jeter 1993 SP Foil',
      status: 'Pending',
    },
  ]);

  const [newTrade, setNewTrade] = useState({
    cardOffered: '',
    cardRequested: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade((prevTrade) => ({
      ...prevTrade,
      [name]: value,
    }));
  };

  const handleProposeTrade = () => {
    if (newTrade.cardOffered && newTrade.cardRequested) {
      setTrades((prevTrades) => [
        ...prevTrades,
        { id: prevTrades.length + 1, ...newTrade, status: 'Pending' },
      ]);
      setNewTrade({ cardOffered: '', cardRequested: '' });
    }
  };

  const handleAccept = (id) => {
    setTrades((prevTrades) =>
      prevTrades.map((trade) =>
        trade.id === id ? { ...trade, status: 'Accepted' } : trade
      )
    );
  };

  const handleReject = (id) => {
    setTrades((prevTrades) =>
      prevTrades.map((trade) =>
        trade.id === id ? { ...trade, status: 'Rejected' } : trade
      )
    );
  };

  return (
    <div className="trades">
      <h1>Trades</h1>
      {/* Coming Soon Tag */}
      <div className="coming-soon-banner">
        <p>🚧 Coming Soon: Enhanced Trading Features! 🚧</p>
      </div>
      <div className="trade-list">
        <h2>Ongoing Trades</h2>
        {trades.map((trade) => (
          <div key={trade.id} className="trade-card">
            <p><strong>Offered:</strong> {trade.cardOffered}</p>
            <p><strong>Requested:</strong> {trade.cardRequested}</p>
            <p><strong>Status:</strong> {trade.status}</p>
            {trade.status === 'Pending' && (
              <div className="trade-actions">
                <button onClick={() => handleAccept(trade.id)}>Accept</button>
                <button onClick={() => handleReject(trade.id)}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="propose-trade">
        <h2>Propose a New Trade</h2>
        <input
          type="text"
          name="cardOffered"
          placeholder="Card you are offering..."
          value={newTrade.cardOffered}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cardRequested"
          placeholder="Card you want..."
          value={newTrade.cardRequested}
          onChange={handleInputChange}
        />
        <button onClick={handleProposeTrade}>Propose Trade</button>
      </div>
    </div>
  );
};

export default Trades;



// Features Added:
// Accept Trade: Changes trade status to "Accepted."
// Reject Trade: Changes trade status to "Rejected."
// Conditional Buttons: Buttons only show if the trade is in "Pending" status.
// Potential Enhancements:
// Modal for Confirmation: Add modals to confirm actions.
// Backend Integration: Sync trade actions with a backend.
// Notifications: Alert users when their trades are accepted or rejected. 