import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import './style.scss';

const AlbumCover = ({ imageSrc, size, active, ...rest}) => (
  <div className={classNames({
    'album-cover': true,
    'is-active': active,
    }
  )}>
    <img className="album-cover__image" src={imageSrc}></img>
  </div>
)

AlbumCover.propTypes = {
  size: PropTypes.string,
  cirlcle: PropTypes.bool,
  active: PropTypes.bool,
}

export default AlbumCover;




