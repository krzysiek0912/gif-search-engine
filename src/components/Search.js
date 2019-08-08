import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingText: ""
    };
  }

  handleChange = ({ target }) => {
    const searchingText = target.value;
    this.setState({ searchingText });

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  };

  handleKeyUp = event => {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  };

  render() {
    const styles = {
        fontSize: "1.5em",
        width: "90%",
        maxWidth: "350px"
      },
      { handleChange, handleKeyUp, state } = this;
    return (
      <input
        type="text"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Tutaj wpisz wyszukiwaną frazę"
        style={styles}
        value={state.searchTerm}
      />
    );
  }
}

export default Search;
