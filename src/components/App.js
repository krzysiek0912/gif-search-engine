import React from "react";
import Search from "./Search";
import Gif from "./Gif";

import { GIPHY_API_URL, GIPHY_PUB_KEY } from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, searchingText: "", gif: {} };
  }
  getGif = (searchingText, callback) => {
    const url =
      GIPHY_API_URL +
      "/v1/gifs/random?api_key=" +
      GIPHY_PUB_KEY +
      "&tag=" +
      searchingText;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText).data,
          gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          };
        callback(gif); // 6.
      }
    };
    xhr.send();
  };
  handleSearch = searchingText => {
    this.setState({
      loading: true
    });

    this.getGif(searchingText, gif => {
      this.setState({
        loading: false,
        gif,
        searchingText
      });
    });
  };

  render() {
    const styles = {
        margin: "0 auto",
        textAlign: "center",
        width: "90%"
      },
      { loading, gif } = this.state;
    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>
          Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter,
          aby pobrać kolejne gify.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif loading={loading} url={gif.url} sourceUrl={gif.sourceUrl} />
      </div>
    );
  }
}

export default App;
