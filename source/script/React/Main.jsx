const React = require('react');

const Game1024 = require('./Games/1024/Game1024.jsx');
const ShootBalloon = require('./Games/ShootBalloon/ShootBalloon.jsx');
const Score = require('./Score.jsx');

const propTypes = {
  data: React.PropTypes.object
};

// const Main = React.createClass({
//   render() {
//     return (
//       <div className="main">
//         <Game1024 table={this.props.data.table} block={this.props.data.block} />
//         <ShootBalloon />
//         <Score />
//       </div>);
//   }
// });

// class Main extends React.Component {
//   render() {
//     return (
//       <div className="main">
//         <Game1024 table={this.props.data.table} block={this.props.data.block} />
//         <ShootBalloon />
//         <Score />
//       </div>);
//   }
// }

function Main({ data }) {
  return (
    <div className="main">
      <Game1024 table={data.table} block={data.block} />
      <ShootBalloon />
      <Score />
    </div>);
}

Main.propTypes = propTypes;

module.exports = Main;
