import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import ItemTypes from './ItemTypes'
import GridList, { GridListTile } from 'material-ui/GridList';
import { toast } from 'react-toastify';

var isSorted = false;

const customStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}

const cardTarget = {
	drop() {},
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
export default class Container extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
		this.findCard = this.findCard.bind(this)
		this.checkSorted = this.checkSorted.bind(this)
		this.state = {
			cards: [],
		}
	}

	moveCard(id, atIndex) {
		const { card, index } = this.findCard(id)
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),
		)
	}

	findCard(id) {
		const { cards } = this.state
		const card = cards.filter(c => c.id === id)[0]

		return {
			card,
			index: cards.indexOf(card),
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.cards !== nextProps.cards){
			console.log('1111111');
			this.setState({ cards: nextProps.cards });
		}
	}

	checkSorted() {
		const {cards} = this.state;
		for (let i = 0; i < cards.length; i++) {
			if(cards[i].id !== i+1){
				isSorted = false;
				break;
			} else {
				debugger
				isSorted = true;
				continue;
			}
		};
		return isSorted;
	}

	render() {

		const { connectDropTarget, gridValue } = this.props
		const { cards } = this.state
		const showNotification = this.checkSorted();
		showNotification && toast("Welcome to the Team !");
		return connectDropTarget(
			<div className="container">
			    <GridList cellHeight={40} className={customStyles.gridList} cols={parseInt(gridValue, 10)}>
				{cards.map((card, index) => (
					<GridListTile key={card.id}>
					<Card
						id={card.id}
						text={card.text}
						moveCard={this.moveCard}
						findCard={this.findCard}
						isSorted={isSorted}
						checkSorted={this.checkSorted}
					/>
					</GridListTile>
				))}
				</GridList>
			</div>,
		)
	}
}
