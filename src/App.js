import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import uuidv5 from 'uuid/v5';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSize } from './modules/lister';
import Card from './Card';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.setSize(this.props.size);
  }

  changeList = (event) => {
    this.props.setSize(+event.target.value);
  };

  render() {

    const { cards, size } = this.props;

    const NAME_SPACE = uuidv5('react.magic.cards', uuidv5.DNS);

    const cardsDom = cards ? (
      cards.map((card, index) =>
        <Link key={uuidv5(''+ index, NAME_SPACE)} to={`/cards/${card.id}/basic`} className="cards-list__card">
          <h3 className="cards-list__card__title">{card.name}</h3>
          <img className="cards-list__card__image" src={card.imageUrl} alt={card.name}/>
        </Link>
      )
    ) : null;

    const listingOptions = [10, 20, 50];

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <h1 className="App-title">Magic Cards App</h1>
          </header>
          <Route path="/cards/:cardId?/:type?" render={({ match }) => {
            const {cardId, type} = match.params;

            return cardId && type ? (
              <div className="card-holder">
                <Link to="/" className="back-button">⬅ Back to Listing</Link>
                <Card card={cards && cards.find(card => card.id === match.params.cardId)}/>
              </div>
            ) : (
              <Redirect to={{
                pathname: `/`
              }}/>
            )
          }} />
          <Route exact={ true } path="/" render={() => (
            <div>
              <div className="options-holder">
                Show
                <select className="options-holder__select" onChange={this.changeList} value={size}>
                  { listingOptions.map((option, index) => <option key={uuidv5(''+ index, NAME_SPACE)} value={option}>{option}</option>) }
                </select> items
              </div>
              {cardsDom}
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.lister.cards,
  size: state.lister.size
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSize
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
