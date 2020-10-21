import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PhoneBookItem from "./phoneBookItem";
import styles from "./phonebookList.module.css";
const PhoneBookList = ({ contacts, onRemoveContact }) => (
  <TransitionGroup component="ul" className={styles.phoneBookList}>
    {contacts.map(({ id, number, name }) => (
      <CSSTransition key={id} timeout={250} classNames={styles}>
        <PhoneBookItem
          id={id}
          number={number}
          name={name}
          onRemoveContact={() => onRemoveContact(id)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
);
PhoneBookList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
export default PhoneBookList;
