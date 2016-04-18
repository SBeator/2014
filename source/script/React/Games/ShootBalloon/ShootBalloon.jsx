var React = require("react");

var Balloon = require("./Balloon.jsx");

var Event = require("./../../Event.jsx");

var ShootBalloon = React.createClass({
    mixins: [Event],

    getInitialState: function () {
        return {
            balloons: []
        };
    },

    componentDidMount: function() {
        this.bindEvent("score_1024", this._addBalloon);
    },

    _addBalloon: function(hitScore) {
        var balloons = this.state.balloons;

        balloons.push({
            key: Date.now(),
            hitScore: hitScore
        });

        this.setState({
            balloons: balloons
        });
    },

    _getBalloons: function () {

        return this.state.balloons.map(function(balloon) {
            return (<Balloon hitScore={balloon.hitScore} key={balloon.key} />);
        });
    },

    render: function () {
        return (
            <div className="shoot_balloon">
                {this._getBalloons()}
            </div>);
    }
});

module.exports = ShootBalloon;