import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import styles from "./contactForm.module.css";
const ContactForm = ({ onHandleSubmit, onHandleChange, name, number }) => (
  <form onSubmit={onHandleSubmit} className={styles.form}>
    <label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onHandleChange}
        placeholder="What's your name?"
        required
      />
    </label>

    <label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={onHandleChange}
        placeholder="What's your phone?"
        required
      />
    </label>

    <Button
      variant="info"
      type="submit"
      value="submit"
      className={styles.addBtn}
    >
      {" "}
      Add contact
    </Button>
  </form>
);
ContactForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};
export default ContactForm;
