import React from "react";
import Search from "./Search";
import Gif from "./Gif";

import { GIPHY_API_URL, GIPHY_PUB_KEY } from "./config";

class App extends React.Component {
  state = { loading: false, gif: {} };

  callAPI = (url, callback) => {
    fetch(url)
      .then(resp => resp.json())
      .then(resp => callback(resp));
  };

  getGif = (searchingText, type) => {
    const url = `${GIPHY_API_URL}/v1/gifs/${type}?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;

    this.callAPI(url, ({ data }) => {
      const gif = {
        url: data.fixed_width_downsampled_url,
        sourceUrl: data.url
      };
      this.setState({
        loading: false,
        gif
      });
    });
  };
  handleSearch = searchingText => {
    this.setState({
      loading: true
    });

    this.getGif(searchingText, "random");
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
        {gif.url && (
          <Gif loading={loading} url={gif.url} sourceUrl={gif.sourceUrl} />
        )}
      </div>
    );
  }
}

export default App;
