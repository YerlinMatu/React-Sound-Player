import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import './style.scss';

const Button = ({ icon, size, round, cirlcle, outline, content, ...rest}) => (
  <button className={classNames({
      'is-circle': true,
      'is-outline': outline,
      'is-round': round
    })} {...rest}>
    {icon && (
      <i className={'material-icons' + (size ? ' ' + size : '')}>
        {icon}
      </i>
    )}
    {content}
  </button>
)

Button.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  cirlcle: PropTypes.bool,
  outline: PropTypes.bool,
  content: PropTypes.element
}

export default Button;




