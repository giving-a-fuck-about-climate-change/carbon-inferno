import React from 'react';

const InfoColDiv = ({ statInfo, subHeader }) => {
 return (
   <div className="info-col">
     <div className="info-wrapper">
       <div className="stat-info"> {statInfo} </div>
       <div className="sub-header"> {subHeader} </div>
     </div>
   </div>
 );
};

export default InfoColDiv;
