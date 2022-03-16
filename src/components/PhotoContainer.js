import React from 'react';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import Photos from './Photos';

const PhotoContainer = (props) => {
    let search = props.match.params.query;
    let title = `Results for: ${search}`;
    let matches = props.photos;
    let photoLists;

    if (search !== props.query) {
        props.updateQuery(search);
    } else {
        if (matches.length > 0) {
            photoLists = matches.map( (photo, index) => <Photos key={index} data={photo} /> );
        } else {
            title = "";
            photoLists = <NotFound /> 
        }
    }

    return (
        <div className ="photo-container" >
            <h2>{title}</h2>
            <ul>
                {photoLists}
            </ul>
        </div>
    );
}


export default withRouter(PhotoContainer);