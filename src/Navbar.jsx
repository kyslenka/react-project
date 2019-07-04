import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #1e90ff;
  font-family: Montserrat;
  & a {
    text-decoration: none;
    color: #fff;
    font-size: 1.5em;
  }
  & input {
    width: 70%;
    border-radius: 5px;
    border: none;
    padding: 1%;
    font-size: 1em;
  }
  & #logo {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 2em;
    padding: 20px;
  }
`;

class UnconnectedNavbar extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", request: evt.target.value });
  };

  handleCreateDeck = evt => {
    this.props.dispatch({ type: "creatingDeck" });
  };

  render() {
    return (
      <div>
        <NavContainer>
          <Link id="logo" to={"/"}>
            GOT IT!
          </Link>
          <input
            type="text"
            onChange={this.handleQuery}
            value={this.props.query}
          />
          <Link to={"/"}>Home</Link>
          <Link to={"/createDeck"} onClick={this.handleCreateDeck}>
            Create deck
          </Link>
        </NavContainer>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery
  };
};

let Navbar = connect(mapStateToProps)(UnconnectedNavbar);

export default Navbar;
