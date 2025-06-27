import React from "react";
import PropTypes from "prop-types";
import "../styles/reusable/_button.scss";

const Button = ({
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  loading = false,
  onClick,
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  type = "button",
  ...props
}) => {
  const buttonClass = `button button--${variant} button--${size} ${
    loading ? "button--loading" : ""
  } ${fullWidth ? "button--full-width" : ""} ${className}`.trim();

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {!loading &&
        icon &&
        iconPosition === "left" &&
        React.cloneElement(icon, { size: "1rem" })}
      {loading ? "Loading..." : children}
      {!loading &&
        icon &&
        iconPosition === "right" &&
        React.cloneElement(icon, { size: "1rem" })}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "danger",
    "ghost",
    "link",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
