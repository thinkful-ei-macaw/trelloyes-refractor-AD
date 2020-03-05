import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {},
  //   }
  // };
  constructor(){
    super()
    this.state = {
      lists: [
      {
        id: '1',
        header: 'First list',
        cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
      },
      {
        id: '2',
        header: 'Second list',
        cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
      },
      {
        id: '3',
        header: 'Third list',
        cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
      },
      {
        id: '4',
        header: 'Fourth list',
        cardIds: [ 'l', 'm' ],
      },
    ],
    allCards: {
      'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
      'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
      'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
      'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
      'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
      'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
      'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
      'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
      'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
      'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
      'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
      'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
      'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
    }
    }
  }

  handleCreateRandom = (listId) => {
    console.log('create random clicked', listId)
    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }
    let newCard = newRandomCard()
    let allCards = this.state.allCards
    allCards[newCard.id] = newCard
    this.setState(
      {
      lists: this.state.lists.map((list) => {
        if (listId === list.id) {
          return { 
            id: list.id,
            header: list.header,
            cardIds: [...list.cardIds, newCard.id]
          }
        } else {
          return list;
        }
      }),
    allCards
    });
  }
  
  handleDelete = (obj, keyToOmit) => {
    
    function omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
            key === keyToOmit ? newObj : {...newObj, [key]: value},
        {}
      );
    }

      const newAllCards = omit(obj, keyToOmit);
      this.setState({
        lists: this.state.lists.map((list) => {
          let newCardIds = list.cardIds.filter(id => id !== keyToOmit)
          return {
            id: list.id,
            header: list.header,
            cardIds: newCardIds
          }}),
        allCards: newAllCards
      })
  }



  render() {
    console.log(this.state.lists)
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              allCards={this.state.allCards}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              onDelete={this.handleDelete}
              onAdd={this.handleCreateRandom}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
