import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledCard = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  padding: 15px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #fff;
  & .choice {
    display: flex;
    justify-content: space-between;
  }
`;

const Buttons = styled.div`
  text-align: center;
  & button.addRemove {
    display: block;
    margin: 10px auto;
    border-color: #dad1d1;
    border-radius: 5px;
    background-color: white;
    padding: 5px;
  }
`;

class UnconnectedCreateCard extends Component {
  handleQuestionChange = event => {
    this.props.dispatch({
      type: "questionChange",
      idxQuestion: this.props.propsIdxQuestion,
      newQuestion: event.target.value
    });
  };
  handleChoiceChange = (event, index) => {
    this.props.dispatch({
      type: "choiceChange",
      idxQuestion: this.props.propsIdxQuestion,
      choiceIndex: index,
      newChoice: event.target.value
    });
  };
  handleAddChoice = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "addChoice",
      idxQuestion: this.props.propsIdxQuestion
    });
  };
  handleRemoveChoice = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "removeChoice",
      idxQuestion: this.props.propsIdxQuestion
    });
  };
  handleAnswer = (event, index) => {
    this.props.dispatch({
      type: "answerChange",
      idxQuestion: this.props.propsIdxQuestion,
      answer: index
    });
  };
  render() {
    return (
      <StyledCard>
        Question {this.props.propsIdxQuestion}
        <br />
        <input type="text" onChange={this.handleQuestionChange} />
        <br />
        {this.props.propsNewDeck.cards[this.props.propsIdxQuestion].choices.map(
          (choice, index) => {
            return (
              <div key={index}>
                <div className="choice">
                  <div>Choice {index}</div>
                  <div>
                    Mark as answer
                    <input
                      type="radio"
                      name={"choicesCard" + this.props.propsIdxQuestion}
                      value={choice}
                      onClick={event => this.handleAnswer(event, index)}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  onChange={event => this.handleChoiceChange(event, index)}
                  value={choice}
                />
              </div>
            );
          }
        )}
        <Buttons>
          <button className="addRemove" onClick={this.handleAddChoice}>
            Add choice
          </button>
          <button className="addRemove" onClick={this.handleRemoveChoice}>
            Remove choice
          </button>
        </Buttons>
      </StyledCard>
    );
  }
}

const mapStateToProps = st => {
  return {
    propsNewDeck: st.newDeck,
    propsIdxQuestion: st.idxQuestion
  };
};

let CreateCard = connect(mapStateToProps)(UnconnectedCreateCard);

export default CreateCard;
