var React = require("react");

var Balloon = React.createClass({

    sidePadding: 20,

    size: {},

    getDefaultProps: function() {
        return {
            playgroundSize: {
                width: 200,
                height: 200
            },

            maxScore: 10,

            maxSize: 50,
            minSize: 20
        };
    },

    getInitialState: function() {

        this.size = this._getSize();

        var playgroundSize = this.props.playgroundSize;

        return {
            top: playgroundSize + this.sidePadding,
            left: Math.random() * (playgroundSize.width - this.size.width - this.sidePadding * 2) + this.sidePadding
        };
    },

    _getSize: function() {
        var maxScore = this.props.maxScore;
        var score = this.props.hitScore;

        warning(isNaN(parseInt(score)), "score is not a number");

        if (score < 0) {
            score = 0;
        } else if (score > this.props.maxScore) {
            score = this.props.maxScore;
        }

        var size = this.props.minSize + (maxScore - score) * (this.props.maxSize - this.props.minSize);

        return {
            width: size,
            height: size
        };
    },


    _getClasses: function() {
        return "balloon";
    },

    _getStyle: function() {
        var style = {
            top: this.state.top,
            left: this.state.left
        };

        return style;
    },

    _getDisplayStyle: function() {
        return this._needAnimation() ? { transition: "all " + this.props.animationTime + "s"} : {};
    },

    render: function() {
        return (
            <div className={this._getClasses()} style={this._getStyle()}>
                <div className="balloon-display">{this.props.hitScore}</div>
            </div>);
    }
});

module.exports = Balloon;