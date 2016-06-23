const React = require('react');
const ReactDOM = require('react-dom');

const Main = require('./React/Main.jsx');

const data = {
  table: {
    col: 4,
    row: 4
  },

  block: {
    size: {
      width: 50,
      height: 50
    }
  }
};

ReactDOM.render(
  (<Main data={data} />),
  document.getElementById('content'));
