import React from 'react'
import "./Button.scss"

export default function Button({ onClickHandler, className, content}) {
  return (
    <button className={`button-33 ${className}`} role="button" onClick={onClickHandler}>
      {content}
    </button>
  );
}