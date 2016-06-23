const React = require('react');

const Block = require('./Block.jsx');
const Event = require('./../../Event.jsx');

const Game1024 = React.createClass({
  mixins: [Event],

  animationTime: 0.2,

  keyArrowMap: {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'bottom'
  },

  numberMap: {},

  getDefaultProps() {
    return {
      table: {
        col: 4,
        row: 4
      }
    };
  },

  getInitialState() {
    const playData = [];
    let emptyNumber = 0;

    const rowNumber = this.props.table.row;
    const colNumber = this.props.table.col;

    for (let row = 0; row < rowNumber; row++) {
      for (let col = 0; col < colNumber; col++) {
        playData.push({
          row,
          col,
          number: 2
        });
      }
    }

    playData[0].number = 4;
    playData[3].number = 2;
    playData[7].number = 2;

    this.numberMap = {
      left: [0, colNumber, rowNumber, 1, colNumber],
      up: [0, 1, colNumber, colNumber, rowNumber],
      right: [colNumber - 1, colNumber, rowNumber, -1, colNumber],
      bottom: [colNumber * rowNumber - 1, -1, colNumber, -colNumber, rowNumber]
    };

    return {
      playData,
      animation: false
    };
  },

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  handleKeyDown(event) {
    const key = this.keyArrowMap[event.keyCode];
    if (key) {
      this._moveUp(key);
    }
  },

  _moveUp(key) {
    const rowNumber = this.props.table.row;
    const colNumber = this.props.table.col;

    const paraArray = this.numberMap[key];

    const startIndex = paraArray[0];
    const changeIndex = paraArray[1];
    const totalNumber = paraArray[2];
    const currentChangeNumber = paraArray[3];
    const currentTotalNumber = paraArray[4];

    const startArray = [];
    const startCount = 0;
    for (const index = startIndex; startCount < totalNumber; index += changeIndex) {
      const thisArray = [];
      const thisCount = 0;
      for (const thisIndex = index; thisCount < currentTotalNumber; thisIndex += currentChangeNumber) {
        thisArray.push(thisIndex);
        thisCount++;
      }

      startArray.push(thisArray);

      startCount++;
    }

    let oldData = this.state.playData;
    const newData = oldData.slice();

    const emptyIndex = [];

    let score = 0;

    for (let sIndex = 0; sIndex < totalNumber; sIndex++) {
      let lastNumber = 0;
      let newIndex = 0;

      for (let tIndex = 0; tIndex < currentTotalNumber; tIndex++) {
        const rightIndex = startArray[sIndex][tIndex];

        const thisData = oldData[rightIndex];
        if (thisData.number) {
          let newDataobj;
          if (lastNumber !== thisData.number) {
            newDataobj = newData[startArray[sIndex][newIndex]];
            newDataobj.newNumber = thisData.number;
            oldData[rightIndex].newPosition = {
              col: newDataobj.col,
              row: newDataobj.row,
              zIndex: 1,
            };
            lastNumber = thisData.number;
            newIndex++;
          } else {
            newDataobj = newData[startArray[sIndex][newIndex - 1]];
            newDataobj.newNumber = thisData.number * 2;
            oldData[rightIndex].newPosition = {
              col: newDataobj.col,
              row: newDataobj.row,
              zIndex: 0
            };
            lastNumber = 0;
            score += thisData.number;
          }
        }
      }

      if (newIndex !== currentTotalNumber) {
        emptyIndex.push(startArray[sIndex][currentTotalNumber - 1]);
      }

      for (let i = newIndex; i < currentTotalNumber; i++) {
        newData[startArray[sIndex][i]].newNumber = 0;
      }
    }

    if (score) {
      this.triggerEvent('score', score);
      this.triggerEvent('score_1024', score);
    }

    if (emptyIndex.length) {
      oldData[emptyIndex[(Math.random() * emptyIndex.length) | 0]].newNumber = 2;
    }

    setTimeout(() => {
      oldData = oldData.map((data) => {
        const newOldData = data;
        newOldData.number = data.newNumber;
        newOldData.newPosition = null;

        return newOldData;
      });

      this.setState({
        playData: oldData,
      });
    }, this.animationTime * 1000);

    this.setState({
      playData: oldData,
      animation: true
    });
  },

  _logData(data) {
    const numberData = data.map(item => item.number);

    const rowNumber = this.props.table.row;
    const colNumber = this.props.table.col;

    for (let i = 0; i < rowNumber * colNumber; i += colNumber) {
      console.log(numberData.slice(i, i + colNumber));
    }
  },

  getBlocks() {
    const blockSize = this.props.block.size;
    const rowNumber = this.props.table.row;
    const animationTime = this.animationTime;

    return this.state.playData.map(
      data => (!!data.number
                ? (<Block
                  data={data}
                  size={blockSize}
                  animationTime={animationTime}
                  key={data.row * rowNumber + data.col}
                />)
                : '')
    );
  },

  getStyle() {
    return {
      width: this.props.block.size.width * this.props.table.col,
      height: this.props.block.size.height * this.props.table.row
    };
  },

  render() {
    return (
      <div className="game_1024" style={this.getStyle()} onKeyPress={this.handleKeyDown}>
        {this.getBlocks()}
      </div>);
  }
});

module.exports = Game1024;
