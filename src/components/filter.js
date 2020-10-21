import React from "react";
import PropTypes from "prop-types";
const Filter = ({ filter, onChangeFilter }) => (
  <>
    <label>
      Find contacts by name
      <br />
      <input type="text" value={filter} onChange={onChangeFilter} />
    </label>
  </>
);
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
export default Filter;
