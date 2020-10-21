import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import Header from "./components/header";
import createContact from "./utils/createContact";
import PhoneBookList from "./components/phoneBookList";
import Filter from "./components/filter";
import ContactForm from "./components/contactForm";
import { ToastContainer, toast, cssTransition, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./components/phonebookList.module.css";

class Phonebook extends Component {
  state = {
    contacts: [],
    name: "",
    number: "",
    filter: "",
    showToast: false,
  };
  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.addContact();
  };
  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  NotificationError = () => {
    toast.error("Contact already in list", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.setState({
      showToast: true,
    });
  };
  addContact = () => {
    const { name, number } = this.state;
    const contact = createContact(name, number);
    this.setState((prevState) => {
      let duplicate = this.state.contacts
        .map((contact) => contact.name)
        .includes(prevState.name);
      return duplicate
        ? this.NotificationError()
        : {
            contacts: [...prevState.contacts, contact],
          };
    });
  };
  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };
  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactId
        ),
      };
    });
  };
  render() {
    const { contacts, name, number, filter, showToast } = this.state;
    const showFilter = contacts.length > 1;
    return (
      <div className={styles.container}>
        <Header header="Phonebook" />
        <ContactForm
          onHandleSubmit={this.handleSubmit}
          onHandleChange={this.handleChange}
          name={name}
          number={number}
        />
        <br />
        <CSSTransition in={showToast}>
          <ToastContainer
            transition={Slide}
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            duration={250}
          />
        </CSSTransition>

        <CSSTransition
          in={showFilter}
          timeout={250}
          unmountOnExit
          classNames={styles}
        >
          <Filter filter={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <PhoneBookList
          contacts={this.getContacts()}
          onRemoveContact={this.removeContact}
        />
      </div>
    );
  }
}
export default Phonebook;
