import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  background-color: #f2f2f2;
  height: 100vh;
`;

const Deck = styled.div`
  height: 130px;
  width: 250px;
  margin: 4%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px lightgrey;
  text-align: center;
  & > #title {
    background-color: #585454;
    color: white;
    font-family: Montserrat;
    font-weight: 700;
    font-size: 1.5em;
    padding: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  & > #linkContainer {
    display: flex;
    height: 50%;
    justify-content: center;
    align-items: center;
  }
  & > #linkContainer > #link {
    text-decoration: none;
    background-color: #1e90ff;
    color: white;
    border-radius: 5px;
    width: 70%;
    padding: 3%;
    font-size: 1.5em;
  }
`;

class UnconnectedSearchResults extends Component {
  render = () => {
    let decks = this.props.propsDataDecks.filter(deck => {
      return deck.title.toLowerCase().includes(this.props.query.toLowerCase());
    });
    return (
      <div>
        <div>{this.props.propsDeckTitle}</div>
        <CardContainer>
          {decks.map(deck => {
            return (
              <Deck key={deck.id}>
                <div id="title">{deck.title}</div>
                <div id="linkContainer">
                  <Link id="link" to={`/deck/${deck.id}`}>
                    Play
                  </Link>
                </div>
              </Deck>
            );
          })}
        </CardContainer>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    propsDataDecks: st.dataDecks,
    propsDeckTitle: st.deckTitle
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
