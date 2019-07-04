import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";
import SearchResults from "./SearchResults.jsx";
import DeckData from "./DeckData.jsx";
import CreateNewDeck from "./CreateNewDeck.jsx";

class UnconnectedApp extends Component {
  renderDecks = () => {
    return (
      <div>
        <div>
          <SearchResults />
        </div>
      </div>
    );
  };

  renderCreateDeck = routeprops => {
    console.log(routeprops);
    return <CreateNewDeck history={routeprops.history} />;
  };

  renderPlayDeck = routerData => {
    let deckId = routerData.match.params.dId;
    this.props.dispatch({ type: "playDeck", value: deckId });
    return <DeckData />;
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <div>
            <Route exact={true} path={"/"} render={this.renderDecks} />
            <Route
              exact={true}
              path={"/createDeck"}
              render={this.renderCreateDeck}
            />
            <Route
              exact={true}
              path={"/deck/:dId"}
              render={this.renderPlayDeck}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    propsDataDecks: st.dataDecks,
    propsDeckTitle: st.deckTitle
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
