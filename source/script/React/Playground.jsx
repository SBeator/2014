var React = require("react");

var Block = require("./Block.jsx");

var Playground = React.createClass({
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
                    number: emptyNumber
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

    _handleKeyDown: function(event) {
        var key = this.keyArrowMap[event.keyCode];
        if(key) {
            this._moveUp(key);
        }
    },

    _moveUp: function(key) {

        var rowNumber = this.props.table.row;
        var colNumber = this.props.table.col;

        var paraArray = this.numberMap[key];

        var startIndex = paraArray[0];
        var changeIndex = paraArray[1];
        var totalNumber = paraArray[2];
        var currentChangeNumber = paraArray[3];
        var currentTotalNumber = paraArray[4];

        var startArray = [];
        var startCount = 0;
        for(var index = startIndex; startCount < totalNumber; index += changeIndex) {
            var thisArray = [];
            var thisCount = 0;
            for(var thisIndex = index; thisCount < currentTotalNumber; thisIndex += currentChangeNumber) {
                thisArray.push(thisIndex);
                thisCount++;
            }

            startArray.push(thisArray);

            startCount++;
        }

        var oldData = this.state.playData;
        var newData = oldData.slice();

        var emptyIndex = [];

        for(var sIndex = 0; sIndex < totalNumber; sIndex ++) {

            var lastNumber = 0;
            var newIndex = 0;

            for(var tIndex = 0; tIndex < currentTotalNumber; tIndex ++) {
                var rightIndex = startArray[sIndex][tIndex];

                var thisData = oldData[rightIndex];
                if (thisData.number) {
                    var newDataobj;
                    if(lastNumber != thisData.number) {
                        newDataobj = newData[startArray[sIndex][newIndex]];
                        newDataobj.newNumber = thisData.number;
                        oldData[rightIndex].newPosition = {
                            col: newDataobj.col,
                            row: newDataobj.row
                        };
                        lastNumber = thisData.number;
                        newIndex++;
                    } else {
                        newDataobj = newData[startArray[sIndex][newIndex - 1]];
                        newDataobj.newNumber = thisData.number * 2;
                        oldData[rightIndex].newPosition = {
                            col: newDataobj.col,
                            row: newDataobj.row
                        };
                    }
                }
            }

            if(newIndex != currentTotalNumber - 1) {
                emptyIndex.push(startArray[sIndex][currentTotalNumber - 1]);
            }

            for(var i = newIndex; i<currentTotalNumber; i++) {
                newData[startArray[sIndex][i]].newNumber = 0;
            }
        }

        if(emptyIndex.length) {
            oldData[emptyIndex[(Math.random() * emptyIndex.length) | 0]].newNumber = 2;
        }

        var _this = this;
        setTimeout(function() {
            oldData.forEach(function(data) {
                data.number = data.newNumber;
                data.newPosition = null;
            });

            _this.setState({
                playData: oldData,
            });
        }, this.animationTime * 1000);

        this.setState({
            playData: oldData,
            animation: true
        });
    },

    _logData: function(data) {
        var numberData = data.map(function(item) {
            return item.number;
        });

        var rowNumber = this.props.table.row;
        var colNumber = this.props.table.col;

        for(var i = 0; i<rowNumber * colNumber; i+= colNumber ) {
            console.log(numberData.slice(i, i + colNumber));
        }

    },

    _getBlocks: function () {
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
            <div className="playground" style={this._getStyle()} onKeyPress={this._handleKeyDown}>
                {this._getBlocks()}
            </div>);
    }
});

module.exports = Playground;