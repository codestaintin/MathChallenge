import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
  return (
      <div className="col-5 number">
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className="fa fa-star fa fa-star fa-spinner fa-spin" />
      )}
      </div>
  );
};

export default Stars;
