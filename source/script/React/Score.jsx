var React = require("react");

var Event = require("./Event.jsx");

var Score = React.createClass({
    mixins: [Event],

    events: {
        "score": "_handleScoreChange"
    },

    getDefaultProps: function() {
        return {
            score: 0
        };
    },

    getInitialState: function () {
        return {
            score: this.props.score
        };
    },

    //componentDidMount: function() {
    //    this.bindEvent("score", this._handleScoreChange);
    //},

    _handleScoreChange: function(changeScore) {
        this.setState({
           score: this.state.score + changeScore
        });
    },

    render: function() {
        return (
            <div className="score">
                {this.state.score}
            </div>);
    }
});

module.exports = Score;