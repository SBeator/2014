const React = require('react');

// const Event = require('./Event.jsx');

const propTypes = {
  score: React.PropTypes.number
};

const defaultProps = {
  score: 0,
};

class Score extends React.Component {
  // mixins: [Event],

  // events: {
  //   score: '_handleScoreChange'
  // },

  constructor(props) {
    super(props);

    this.state = {
      score: this.props.score
    };
  }

  // componentDidMount: function() {
  //    this.bindEvent("score", this._handleScoreChange);
  // },

  _handleScoreChange(changeScore) {
    this.setState({
      score: this.state.score + changeScore
    });
  }

  render() {
    return (
      <div className="score">
        {this.state.score}
      </div>);
  }
}

Score.propTypes = propTypes;
Score.defaultProps = defaultProps;

module.exports = Score;
