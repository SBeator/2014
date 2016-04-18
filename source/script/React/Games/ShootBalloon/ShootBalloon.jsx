var React = require("react");

var Event = require("./../../Event.jsx");

var ShootBalloon = React.createClass({
    mixins: [Event],

    animationTime: 0.2,

    keyArrowMap: {
        37: "left",
        38: "up",
        39: "right",
        40: "bottom"
    },

    numberMap: {},

    getDefaultProps: function() {
        return {
            table: {
                col: 4,
                row: 4
            }
        };
    },

    getInitialState: function () {
        var playData = [];
        var emptyNumber = 0;

        var rowNumber = this.props.table.row;
        var colNumber = this.props.table.col;

        for (var row = 0; row < rowNumber; row++) {
            for (var col = 0; col < colNumber; col++) {
                playData.push({
                    row: row,
                    col: col,
                    number: 2
                });
            }
        }

        playData[0].number = 4;
        playData[3].number = 2;
        playData[7].number = 2;

        this.numberMap = {
            'left':     [0,                     colNumber,  rowNumber, 1,           colNumber],
            'up':       [0,                     1,          colNumber, colNumber,   rowNumber],
            'right':    [colNumber-1,           colNumber,  rowNumber, -1,          colNumber],
            'bottom':   [colNumber*rowNumber-1, -1,         colNumber, -colNumber,  rowNumber]
        };

        return {
            playData: playData,
            animation: false
        };
    },

    componentDidMount: function() {
        window.addEventListener("keydown", this._handleKeyDown);
    },

    _getBalloons: function () {
        var blockSize = this.props.block.size;
        var rowNumber = this.props.table.row;
        var animationTime = this.animationTime;

        return this.state.playData.map(function(data) {
            return (
                !!data.number ?
                    (<Block data={data}
                            size={blockSize}
                            animationTime={animationTime}
                            key={data.row * rowNumber + data.col} />) :
                    "");
        });
    },

    _getStyle: function() {
        return {
            width: this.props.block.size.width * this.props.table.col,
            height: this.props.block.size.height * this.props.table.row
        };
    },

    render: function () {
        return (
            <div className="shoot_balloon" style={this._getStyle()} onKeyPress={this._handleKeyDown}>
                {this._getBalloons()}
            </div>);
    }
});

module.exports = ShootBalloon;