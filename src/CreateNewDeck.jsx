import React, { Component } from "react";
import { connect } from "react-redux";
import CreateCard from "./CreateCard.jsx";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f2f2;
  min-height: 100vh;
`;
const CardBox = styled.div`
  height: 10vh auto;
  width: 150vh;
  background-color: white;
  text-align: center;
  box-sizing: border-box;
  margin: 20px;
  left: 20%;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px lightgrey;
  & > h2 {
    background-color: #585454;
    color: white;
    font-family: Montserrat;
    font-weight: 700;
    font-size: 2em;
    padding: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0;
  }
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & form {
    margin: 2%;
    text-align: left;
    height: 75vh;
    width: 75%;
  }
  & form > #title {
    font-size: 1.1em;
  }
  & input[type="submit"] {
    width: 100%;
    background-color: #1e90ff;
    margin: 5px 0;
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.5em;
  }
  & input[type="text"] {
    border-radius: 5px;
    border-color: black;
    font-size: 1em;
    padding: 10px;
    width: calc(100% - 20px);
    margin: 10px 0;
  }
  & #add {
    background: white;
    color: black;
    width: 100%;
    margin: 5px 0;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2em;
  }
`;
class UnconnectedCreateNewDeck extends Component {
  handleTitleChange = evt => {
    this.props.dispatch({ type: "titleChange", title: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch({
      type: "newDeckSubmit"
    });
    this.props.history.push("/");
  };

  addCard = evt => {
    evt.preventDefault();
    this.props.dispatch({
      type: "addCard"
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <CardContainer>
          <CardBox>
            <h2>Create a deck</h2>
            <FormContainer>
              <form onSubmit={this.handleSubmit}>
                <label id="title">
                  Title
                  <input
                    type="text"
                    onChange={this.handleTitleChange}
                    value={this.props.propsNewDeck.title}
                  />
                </label>
                {this.props.propsNewDeck.cards.map((card, idx) => {
                  return <CreateCard idxQuestion={idx} key={idx} />;
                })}
                <button id="add" onClick={this.addCard}>
                  Add card
                </button>
                <input type="submit" value="Submit" />
              </form>
            </FormContainer>
          </CardBox>
        </CardContainer>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    propsNewDeck: st.newDeck,
    propsIdxQuestion: st.idxQuestion
  };
};

let CreateNewDeck = connect(mapStateToProps)(UnconnectedCreateNewDeck);

export default CreateNewDeck;
