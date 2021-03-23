import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { formateTime } from '../../helpers/index';
import classNames from "classnames";
import './style.scss';

const TrackPlayer = ({ title, currentTime, currentDuration,  active, ...rest}) => {
  return (
    <div className={classNames({
      'player__track': true,
      'is-active': active,
      })}>
      <div className='title' title='Track title'>
      {title}
      </div>
      <div className='time'>
      <span className='currentTime' title='Current time'>
          {formateTime(currentTime)}
      </span>
      {' / '}
      <span className='currentDuration' title='Track duration'>
          {formateTime(currentDuration)}
      </span>
    </div>
    </div>
  )
}

TrackPlayer.propTypes = {
  title: PropTypes.string,
  currentDuration: PropTypes.number,
  currentTime: PropTypes.number,
  active: PropTypes.bool,
}

export default TrackPlayer;