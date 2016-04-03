var React = require("react");

var Block = require("./Block.jsx");

var Playground = React.createClass({
    leftKey: 37,
    upKey: 38,
    rightKey: 39,
    downKey: 40,

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
                    number: emptyNumber
                });
            }
        }



        playData[0].number = 4;
        playData[3].number = 3;
        playData[5].number = 1;

        return {
            playData: playData
        };
    },

    componentDidMount: function() {
        window.addEventListener("keydown", this._handleKeyDown);
    },

    _handleKeyDown: function(event) {
        console.log(event);
    },

    _moveUp: function() {

        var rowNumber = this.props.table.row;
        var colNumber = this.props.table.col;

        var startIndex = 0;
        var changeIndex = 1;
        var totalNumber = colNumber;

        var currentChangeNumber = colNumber;
        var currentTotalNumber = rowNumber;

        var startArray = [];
        for(var index = startIndex; index < totalNumber; index += changeIndex) {
            var thisArray = [];
            for(var thisIndex = index; thisIndex < currentTotalNumber; thisIndex += currentChangeNumber) {
                thisArray.push(thisIndex);
            }

            startArray.push(thisArray);
        }
    },

    _getBlocks: function () {
        var blockSize = this.props.block.size;
        var rowNumber = this.props.table.row;

        return this.state.playData.map(function(data) {
            return (
                 !!data.number ?
                    (<Block row={data.row}
                       col={data.col}
                       number={data.number}
                       size={blockSize}
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
            <div className="playground" style={this._getStyle()} onKeyPress={this._handleKeyDown}>
                {this._getBlocks()}
            </div>);
    }
});

module.exports = Playground;