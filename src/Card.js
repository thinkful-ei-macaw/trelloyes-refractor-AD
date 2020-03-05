import React from 'react';
import './Card.css';

export default function Card(props) {
  
  console.log(props)

  return (
    <div className='Card'>
      <button
        id={props.id}
        type='button'
        onClick={e => props.onDelete(e.id, e.id)}
      >
        delete
      </button>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}
