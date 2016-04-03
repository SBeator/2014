var React = require('react');
var ReactDOM = require('react-dom');

var Main = require('./React/Main.jsx');

var data = {
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