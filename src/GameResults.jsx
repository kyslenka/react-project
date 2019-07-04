import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  min-height: 100vh;
`;
const ResultsBox = styled.div`
  margin: 5vh auto;
  width: 70vw;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px lightgrey;
  box-sizing: border-box;
  & h1 {
    background-color: #585454;
    color: white;
    font-family: Montserrat;
    font-weight: 700;
    font-size: 1.5em;
    padding: 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0;
    text-align: center;
  }
  & h2 {
    text-align: center;
    font-size: 1.5em;
  }
`;
const LinkButton = styled.div`
  & a {
    text-decoration: none;
    background-color: #1e90ff;
    color: white;
    border-radius: 5px;
    padding: 15px;
    font-size: 1.2em;
  }
`;

const Answers = styled.div`
  padding-left: 30px;
  & h3 {
    font-size: 1.3em;
  }
  & h4 {
    font-size: 1.1em;
  }
  & .correct {
    color: green;
  }
  & .incorrect {
    color: red;
  }
`;

class UnconnectedGameResults extends Component {
  onClickHandler = evt => {
    this.props.dispatch({
      type: "playAgain"
    });
  };

  render() {
    console.log(this.props);
    let deck = this.props.propsDataDecks.find(
      deck => deck.id === Number(this.props.propsDeckId)
    );
    let cardsNum = deck.cards.length;
    let correctAnswerNum = 0;
    deck.cards.forEach((card, idx) => {
      if (this.props.propsAllUserAnswers[idx] === card.answer)
        correctAnswerNum++;
    });

    let successRate = (correctAnswerNum / cardsNum) * 100;
    let ratingTitle;

    if (successRate === 0) {
      ratingTitle = "Does not get it at all 😞";
    } else if (successRate < 25) {
      ratingTitle = "Potential to get it one day 🤔";
    } else if (successRate < 50) {
      ratingTitle = "Kind of gets it 😐";
    } else if (successRate < 75) {
      ratingTitle = "On the road to getting it 🙂";
    } else if (successRate < 100) {
      ratingTitle = "Almost got it! 😄";
    } else if (successRate === 100) {
      ratingTitle = "Got it! 😎";
    }

    return (
      <div>
        <ResultsContainer>
          <ResultsBox>
            <h1>Results</h1>
            <h2>{ratingTitle}</h2>
            {deck.cards.map((card, idx) => {
              return (
                <Answers key={card.answer}>
                  <h3>{card.question}</h3>
                  <h4>Answer: {card.answer}</h4>
                  <h4
                    className={
                      this.props.propsAllUserAnswers[idx] === card.answer
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    Your answer: {this.props.propsAllUserAnswers[idx]}
                  </h4>
                </Answers>
              );
            })}
            <LinkButton>
              <Link id="btn" role="button" to="/" onClick={this.onClickHandler}>
                Play again
              </Link>
            </LinkButton>
          </ResultsBox>
        </ResultsContainer>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    propsUserAnswer: st.userAnswer,
    propsDataDecks: st.dataDecks,
    propsDeckId: st.deckId,
    propsIdxQuestion: st.idxQuestion,
    propsAllUserAnswers: st.allUserAnswers
  };
};

let GameResults = connect(mapStateToProps)(UnconnectedGameResults);

export default GameResults;
