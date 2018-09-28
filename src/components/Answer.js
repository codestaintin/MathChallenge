import React from 'react';

const Answer = (props) => {
    return (
      <div className="col-5 answer">
      {props.selectedNumbers.map((number, i) =>
          <span key={i} onClick={() => props.deselectNumber(number)}>
            {number}
          </span>
        )}
      </div>
    );
  };

  export default Answer;