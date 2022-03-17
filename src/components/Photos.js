import React from 'react';

const Photos = (props) => {
    return (
        <li> 
            <img src={props.url} alt="" />
        </li>
    );
}

export default Photos;