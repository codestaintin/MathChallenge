import React from 'react';

const Instructions = () => {
	return (
  	<div className="text-center">
  	  <h2 className="text-center">Game Instructions</h2>
        <ul>
            <li>Choose a number that corresponds to the number of rolling stars</li>
            <li>You have an oppurtunity of playing five times</li>
            <li>When you get a correct answer the equal sign turns green, click again to continue</li>
            <li>When you get a wrong answer the equal sign turns red, click again to continue</li>
            <li>Enjoy.</li>
        </ul>
  	</div>
  );
}

export default Instructions;