var React = require('react');

var Balloon = require('./Balloon.jsx');

var Event = require('./../../Event.jsx');

var ShootBalloon = React.createClass({
  mixins: [Event],

  getInitialState() {
    return {
      balloons: []
    };
  },

  componentDidMount() {
    this.bindEvent('score_1024', this._addBalloon);
  },

  _addBalloon(hitScore) {
    var balloons = this.state.balloons;

    balloons.push({
      key: Date.now(),
      hitScore
    });

    this.setState({
      balloons
    });
  },

  _getBalloons() {
    return this.state.balloons.map(function (balloon) {
      return (<Balloon hitScore={balloon.hitScore} key={balloon.key} />);
    });
  },

  render() {
    return (
      <div className="shoot_balloon">
        {this._getBalloons()}
      </div>);
  }
});

module.exports = ShootBalloon;
