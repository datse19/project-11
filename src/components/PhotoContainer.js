import React from 'react';

import NotFound from './NotFound';
import Photos from './Photos';

//construction should display image and list in browser
const PhotoContainer = (props) => {
    
    const results = props.data
    let photo;
    if (results.length > 0) {
        photo = results.map(photos => <Photos url={`https://live.staticflickr.com/${photos.server}/${photos.id}_${photos.secret}.jpg`} key={photos.id} alt={`${photos.title}`} />);
    } else {
        photo = <NotFound />
    }

    return (
        <div className ="photo-container" >
            <h2>Results</h2>
            <ul>
                {photo}
            </ul>
        </div>
    );
}


export default PhotoContainer;