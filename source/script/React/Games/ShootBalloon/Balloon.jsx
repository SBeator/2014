var React = require("react");

var Event = require("./../../Event.jsx");

var Balloon = React.createClass({

    mixins: [Event],

    sidePadding: 20,

    animationTime: 1,
    size: {
        width: 20,
        height: 20
    },

    getDefaultProps: function() {
        return {
            playgroundSize: {
                width: 200,
                height: 200
            },

            maxScore: 16,

            maxSize: 50,
            minSize: 20,

            maxAnimationTime: 5,
            minAnimationTime: 2
        };
    },

    getInitialState: function() {

        this.size = this._getSize();
        this.animationTime = this._getAnimationTime();

        var playgroundSize = this.props.playgroundSize;

        return {
            show: true,
            top: playgroundSize.height + this.sidePadding,
            left: Math.random() * (playgroundSize.width - this.size.width - this.sidePadding * 2) + this.sidePadding
        };
    },

    componentDidMount: function() {
        var _this = this;
        setTimeout(function() {
            _this.setState({
               top: -_this.size.height
            });
        }, 10);
    },

    _handleClick: function() {
        this.triggerEvent("score", this.props.hitScore);
        this.setState({
            show: false
        });
    },

    _getAnimationTime: function() {
        var animationTime = this.props.minAnimationTime + ( 1 - this._getScorePercent()) * (this.props.maxAnimationTime - this.props.minAnimationTime);

        return animationTime;
    },

    _getSize: function() {
        var size = this.props.maxSize - this._getScorePercent() * (this.props.maxSize - this.props.minSize);

        return {
            width: size,
            height: size
        };
    },

    _getScorePercent: function() {
        var maxScore = this.props.maxScore;
        var score = this.props.hitScore;

        // warning(typeof(score) != "number", "score is not a number");

        if (score < 0) {
            score = 0;
        } else if (score > this.props.maxScore) {
            score = this.props.maxScore;
        }

        return score / maxScore;
    },


    _getClasses: function() {
        return "balloon";
    },

    _getStyle: function() {
        var style = {
            display: this.state.show ? "block" : "none",
            top: this.state.top,
            left: this.state.left,
            width: this.size.width,
            height: this.size.height,
            lineHeight: this.size.height + "px",
            transition: "all " + this.animationTime + "s linear"
        };

        return style;
    },

    render: function() {
        return (
            <div className={this._getClasses()} style={this._getStyle()} onClick={this._handleClick}>
                <div className="balloon-display">{this.props.hitScore}</div>
            </div>);
    }
});

module.exports = Balloon;