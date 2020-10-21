import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./phoneBookItem.module.css";

const PhoneBookItem = ({ name, number, id, onRemoveContact }) => (
  <li className={styles.phoneBookItem}>
    <span>
      {name}: {number}
    </span>
    <Button
      variant="danger"
      type="button"
      onClick={() => onRemoveContact(id)}
      size="sm"
    >
      Delete
    </Button>
  </li>
);
PhoneBookItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};
export default PhoneBookItem;
