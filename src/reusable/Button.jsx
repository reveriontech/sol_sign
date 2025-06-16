import React from 'react';
import PropTypes from 'prop-types';
import '../styles/reusable/_button.scss';

const Button = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  onClick,
  children,
  icon,
  ...props
}) => {
  const buttonClass = `button button--${variant} ${className}`;
  
  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && React.cloneElement(icon, { size: '1rem' })}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  icon: PropTypes.element,
};

export default Button;
