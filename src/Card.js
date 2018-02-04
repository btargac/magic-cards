import React from 'react';
import { Link, Route } from 'react-router-dom';
import './Card.css';

const Card = ({ card }) => card ? (
  <div className="card">
    <div className="card__preview">
      <h2 className="card__preview_title">{card.name}</h2>
      <img src={card.imageUrl} alt={card.imageUrl}/>
    </div>
    <div className="card__details">
      <Route path="/cards/:cardId/:type?" render={
        ({match}) => {

          const {cardId, type} = match.params;

          return (
            <ul className="card__details__tabs">
              <li className={`tab ${type === 'basic' ? 'tab--active' : ''}`.trim()}>
                <Link to={`/cards/${cardId}/basic`} className="tab__link">Basic</Link>
              </li>
              <li className={`tab ${type === 'details' ? 'tab--active' : ''}`.trim()}>
                <Link to={`/cards/${cardId}/details`} className="tab__link">Details</Link>
              </li>
              <li className={`tab ${type === 'printings' ? 'tab--active' : ''}`.trim()}>
                <Link to={`/cards/${cardId}/printings`} className="tab__link">Printings</Link>
              </li>
            </ul>
          )
        }
      }/>
      <Route path="/cards/:cardId/basic" render={() => {
        return (
          <div className="card__details__content">
            <div><strong>Artist:</strong> {card.artist}</div>
            <div><strong>Definition:</strong> {card.text}</div>
          </div>
        );
      }}/>
      <Route path="/cards/:cardId/details" render={() => {
        return (
          <div className="card__details__content">
            <div><strong>Type:</strong> {card.type}</div>
            <div><strong>Number:</strong> {card.number}</div>
            <div><strong>Mana Cost:</strong> {card.manaCost}</div>
            <div><strong>Rarity:</strong> {card.rarity}</div>
            <div><strong>Watermark:</strong> {card.watermark}</div>
          </div>
        );
      }}/>
      <Route path="/cards/:cardId/printings" render={() => {
        return (
          <div className="card__details__content">
            {card.printings.map((printing, index) => (
              <div key={index}>{printing}</div>
            ))}
          </div>
        );
      }}/>
    </div>
  </div>
) : (<div>Loading</div>);

export default Card;
