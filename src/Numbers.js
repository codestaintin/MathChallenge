import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected'
    }

    if(props.usedNumbers.indexOf(number) >= 0) {
    	return 'used'
    }
  };
    Numbers.list = _.range(1,10);
  return (
  	<div className ="card text-center number">
    	<div>
    	  {Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )}
    	</div>
    </div>
  );
}

export default Numbers;