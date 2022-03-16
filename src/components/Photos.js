import React from 'react';

const Photos = (props) => {
    let photoData = props.data;
    return (
        <li>
           <img src={`https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_m.jpg`} alt='' />
        </li>
    );
}

export default Photos;