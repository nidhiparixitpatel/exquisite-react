import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 1,
      poem: [],
      updateTurnCallBack: this.updateTurn,
      lastLine: "",
      isSubmitted: false,
      submitCallBack: this.submit
    };
  }

  updateTurn = (line) => {
    let updatedPlayer = this.state.currentPlayer + 1
    this.setState({ currentPlayer: updatedPlayer });
    this.state.poem.push(line)
    const newPoem = this.state.poem
    this.setState({poem: newPoem})
    this.setState({lastLine: line})
  }

  submit = () => {
    this.setState({isSubmitted: true })
  }

  render() {

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    const recentSubmission =  this.state.isSubmitted === false && this.state.currentPlayer > 1 ? <RecentSubmission lastLine={this.state.lastLine} /> : ""
    const form = this.state.isSubmitted ? "" : <PlayerSubmissionForm id={this.state.currentPlayer} updateTurnCallBack={this.state.updateTurnCallBack}/> 
    

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        {recentSubmission}
        {form}

        <FinalPoem poem={this.state.poem} submitCallBack={this.state.submitCallBack} isSubmitted={this.state.isSubmitted}/>

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
