import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/components/_addrecipients.scss";
import {
  setSelectedRole,
  setIsDropdownOpen,
  setName,
  setEmail,
  setNameTouched,
  setEmailTouched,
  setRoleTouched,
  addRecipient,
  removeRecipient,
} from "@/store/slices/recipientsSlice";

const AddRecipients = () => {
  const dispatch = useDispatch();
  const {
    recipients,
    selectedRole,
    isDropdownOpen,
    name,
    email,
    nameTouched,
    emailTouched,
    roleTouched,
    roles,
  } = useSelector((state) => state.recipients);

  const handleRoleChange = (role) => {
    dispatch(setSelectedRole(role));
    dispatch(setIsDropdownOpen(false));
  };

  const toggleDropdown = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
  };

  // Validation logic
  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isRoleValid = selectedRole !== "Select Role";
  const isFormValid = isNameValid && isEmailValid && isRoleValid;

  // For Recipients List
  const handleAddRecipient = (e) => {
    e.preventDefault();
    dispatch(setNameTouched(true));
    dispatch(setEmailTouched(true));
    dispatch(setRoleTouched(true));

    if (!isFormValid) return;

    const newRecipient = {
      id: Date.now(),
      name,
      email,
      role: selectedRole,
    };

    dispatch(addRecipient(newRecipient));
  };

  const handleRemoveRecipient = (id) => {
    dispatch(removeRecipient(id));
  };

  return (
    <section className="addrecipients-container">
      <div className="addrecipients-box-container">
        <div className="addrecipients-box-header">
          <h1>Add Recipients</h1>
          <hr />
        </div>

        <div className="addrecipients-box-content">
          <form className="add-recipients-form" onSubmit={handleAddRecipient}>
            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                onBlur={() => dispatch(setNameTouched(true))}
                className={nameTouched && !isNameValid ? "input-error" : ""}
              />
              {nameTouched && !isNameValid && (
                <span className="error-message">Name is required.</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                onBlur={() => dispatch(setEmailTouched(true))}
                className={emailTouched && !isEmailValid ? "input-error" : ""}
              />
              {emailTouched && !isEmailValid && (
                <span className="error-message">Enter a valid email.</span>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="role-container">
              <label>Role</label>
              <div className="custom-dropdown">
                <div
                  className="dropdown-header"
                  onClick={() => {
                    toggleDropdown();
                    dispatch(setRoleTouched(true));
                  }}
                >
                  <span>{selectedRole}</span>
                  <span className={`arrow ${isDropdownOpen ? "open" : ""}`}>
                    ▼
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {roles.map((role) => (
                      <div
                        key={role}
                        className="dropdown-item"
                        onClick={() => handleRoleChange(role)}
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {roleTouched && !isRoleValid && (
                <span className="error-message">Select a role.</span>
              )}
            </div>
          </form>
          <button
            className="add-recipient-btn"
            onClick={handleAddRecipient}
            type="submit"
            disabled={!isFormValid}
            style={{
              opacity: isFormValid ? 1 : 0.6,
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
          >
            Add Recipient
          </button>
          <hr />

          <br />

          <div className="recipients-list-container">
            {/* Recipients List */}
            {recipients.length > 0 && (
              <div className="recipients-list">
                <p className="recipients-list-title">Recipients List</p>
                {/* Header Row */}
                <div className="recipient-info recipient-header">
                  <span
                    className="color-box"
                    style={{ visibility: "hidden" }}
                  ></span>
                  <span className="recipient-name header">Name</span>
                  <span className="recipient-email header">Email</span>
                  <span className="recipient-role header">Role</span>
                  <span
                    className="remove-recipient-btn header"
                    style={{ cursor: "default" }}
                  ></span>
                </div>
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="recipient-info">
                    <span className="color-box"></span>
                    <span className="recipient-name">{recipient.name}</span>
                    <span className="recipient-email">{recipient.email}</span>
                    <span className="recipient-role">{recipient.role}</span>
                    <span
                      className="remove-recipient-btn"
                      onClick={() => handleRemoveRecipient(recipient.id)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddRecipients;
