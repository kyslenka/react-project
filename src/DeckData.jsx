import React, { Component } from "react";
import { connect } from "react-redux";
import "./main.css";
import GameResults from "./GameResults.jsx";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  min-height: 100vh;
`;
const CardBox = styled.div`
  width: 70vw;
  background-color: white;
  text-align: center;
  box-sizing: border-box;
  margin: 20px;
  left: 20%;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px lightgrey;
  & #question {
    background-color: #585454;
    color: white;
    font-family: Montserrat;
    font-weight: 700;
    font-size: 2em;
    padding: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  & #choiceBox {
    background-color: #1e90ff;
    color: white;
    border-radius: 5px;
    padding: 1%;
    font-size: 1.5em;
    margin: 4%;
  }
  & #choiceBox > input {
    width: 45%;
    border: none;
    padding: 1%;
    font-size: 1em;
    color: #fff;
    background-color: #1e90ff;
  }
`;

const ProgressBar = styled.div`
  width: calc(100% + 30px);
  justify-content: flex-start;
  padding: 0;
  & #progress {
    background-color: #1e90ff;
    height: 7px;
  }
`;

class UnconnectedDeckData extends Component {
  onClickHandler = evt => {
    this.props.dispatch({
      type: "choiceSelect",
      userAnswer: evt.target.value,
      idxQuestion: this.props.propsIdxQuestion
    });
  };

  render = () => {
    console.log(this.props);
    let deck = this.props.propsDataDecks.find(
      deck => deck.id === Number(this.props.propsDeckId)
    );

    if (!deck) return <div>Unknown deck</div>;
    if (this.props.propsIdxQuestion < deck.cards.length) {
      let currentCard = deck.cards[this.props.propsIdxQuestion];
      let progress = (this.props.propsIdxQuestion / deck.cards.length) * 100;

      return (
        <div key={this.props.propsDeckId}>
          <CardContainer>
            <CardBox>
              <div id="question">{currentCard.question}</div>
              <ProgressBar>
                <div id="progress" style={{ width: progress + "%" }} />
              </ProgressBar>
              {currentCard.choices.map(choice => (
                <div id="choiceBox" key={choice}>
                  <input
                    type="button"
                    value={choice}
                    onClick={this.onClickHandler}
                  />
                </div>
              ))}
            </CardBox>
          </CardContainer>
        </div>
      );
    } else {
      return <div>{<GameResults />}</div>;
    }
  };
}

let mapStateToProps = st => {
  return {
    propsDataDecks: st.dataDecks,
    propsDeckId: st.deckId,
    propsIdxQuestion: st.idxQuestion,
    propsUserAnswer: st.userAnswer,
    propsAllUserAnswers: st.allUserAnswers
  };
};

let DeckData = connect(mapStateToProps)(UnconnectedDeckData);
export default DeckData;
