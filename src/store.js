import { createStore } from "redux";
import { initialDecks } from "./Data.js";

let initialState = {
  dataDecks: initialDecks,
  deckTitle: "",
  searchQuery: "",
  deckId: "",
  idxQuestion: 0,
  userAnswer: "",
  allUserAnswers: [],
  newDeck: {
    id: initialDecks.length,
    title: "",
    cards: [
      {
        question: "",
        choices: ["", ""],
        answer: null
      }
    ]
  }
};

let reducer = (state, action) => {
  let newDeckId;
  let newCard;
  let newCards;
  if (action.type === "query") {
    return { ...state, searchQuery: action.request };
  }
  if (action.type === "playDeck") {
    return { ...state, deckId: action.value, idxQuestion: 0 };
  }
  if (action.type === "choiceSelect") {
    let infoDecks = state.dataDecks;
    let Card = infoDecks[state.deckId].cards[action.idxQuestion];

    let newCard = { ...Card, userAnswer: action.userAnswer };
    Card = newCard;

    let temp = state.idxQuestion;
    if (temp < infoDecks[state.deckId].cards.length) {
      temp++;
    }
    return {
      ...state,
      idxQuestion: temp,
      userAnswer: action.userAnswer,
      dataDecks: infoDecks,
      allUserAnswers: state.allUserAnswers.concat(action.userAnswer)
    };
  }
  if (action.type === "playAgain") {
    return { ...state, allUserAnswers: [] };
  }
  if (action.type === "creatingDeck") {
    newDeckId = state.dataDecks.length;
    newCard = { question: "", choices: ["", ""], answer: null };
    return {
      ...state,
      newDeck: { id: newDeckId, title: "", cards: [newCard] }
    };
  }
  if (action.type === "newDeckSubmit") {
    return { ...state, dataDecks: state.dataDecks.concat(state.newDeck) };
  }

  if (action.type === "titleChange") {
    return { ...state, newDeck: { ...state.newDeck, title: action.title } };
  }
  if (action.type === "questionChange") {
    newCards = state.newDeck.cards.slice();
    newCards[action.idxQuestion].question = action.newQuestion;
    return { ...state, newDeck: { ...state.newDeck, cards: newCards } };
  }
  if (action.type === "answerChange") {
    newCards = state.newDeck.cards.slice();
    newCards[action.idxQuestion].answer = action.answer;
    return { ...state, newDeck: { ...state.newDeck, cards: newCards } };
  }
  if (action.type === "choiceChange") {
    newCards = state.newDeck.cards.slice();
    newCards[action.idxQuestion].choices[action.choiceIndex] = action.newChoice;
    return { ...state, newDeck: { ...state.newDeck, cards: newCards } };
  }

  if (action.type === "addCard") {
    newCard = { question: "", choices: ["", ""], answer: null };
    return {
      ...state,
      newDeck: {
        ...state.newDeck,
        cards: state.newDeck.cards.concat([newCard])
      }
    };
  }
  if (action.type === "addChoice") {
    newCards = state.newDeck.cards.slice();
    newCards[action.idxQuestion].choices.push("");
    return { ...state, newDeck: { ...state.newDeck, cards: newCards } };
  }
  if (action.type === "removeChoice") {
    newCards = state.newDeck.cards.slice();
    newCards[action.idxQuestion].choices.pop();
    if (
      newCards[action.idxQuestion].choices.length ===
      newCards[action.idxQuestion].answer
    ) {
      newCards[action.idxQuestion].answer = null;
    }
    return { ...state, newDeck: { ...state.newDeck, cards: newCards } };
  }
  return state;
};
let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
