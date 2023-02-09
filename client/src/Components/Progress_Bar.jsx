/*
    The props is an object "data" conatining all the shared info
    eg - 
        props.data.load_percent
*/

import React from 'react' ;
import "./Progress_Bar.css" ;

const Progress_Bar = (props) => {
  return (
    <div className="progress-container">
        <div className="bg-progress" style={{width : `${props.progress}%`}}>
            <div className="inner-container-progress">
                <div className="title">Uploading...</div>
                <div className="percent-container"><span>{props.progress}</span>%</div>
                <div className="percent-progress" style={{transform : `scaleX(${props.progress / 100})`}}></div>
            </div>
        </div>
    </div>
  ) ;
}

export default Progress_Bar ;
