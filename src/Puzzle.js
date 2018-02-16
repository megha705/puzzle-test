import React, { Component } from 'react';
import Container from './Container';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { ToastContainer } from 'react-toastify';

class Puzzle extends Component {
  constructor(props) {
    super(props)
    this.generateCards = this.generateCards.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      cards: [],
      gridValue: 3
    }
  }

  handleChange(e) {
    this.setState({ gridValue: e.target.value, cards: [] });
  }

  generateCards(){
    const { gridValue } = this.state;
    let squares = gridValue * gridValue;
    let cards = [];
    var random = []
    while(random.length < squares){
        var randomnumber = Math.floor(Math.random()*squares) + 1;
        if(random.indexOf(randomnumber) > -1) continue;
        random[random.length] = randomnumber;
    }
    for(var i=0; i < squares; i++){
      cards.push({id: random[i], text: random[i]});
    }
    this.setState({cards});
  }

  render() {
    const {gridValue, cards} = this.state;
    return (
      <div>
        <ToastContainer />
        <TextField
          id="gridInput"
          type="number"
          label="Enter Grid Input"
          value={this.state.gridValue}
          onChange={this.handleChange}
          margin="normal"
        />
        <br/>
        <Button disabled={gridValue && gridValue > 1 ? false : true} variant="raised" color="primary" onClick={this.generateCards}>generateCards</Button>
        {gridValue && gridValue > 0 && <Container gridValue={gridValue}  cards={cards}/>}
      </div>
    );
  }
}

export default Puzzle;
