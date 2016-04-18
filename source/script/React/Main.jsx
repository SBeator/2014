var React = require("react");

var Game1024 = require("./Games/1024/Game1024.jsx");
var Score = require("./Score.jsx");

var Main = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Game1024 table={this.props.data.table} block={this.props.data.block} />
                <Game1024 table={this.props.data.table} block={this.props.data.block} />
                <Score />
            </div>);
    }
});

module.exports = Main;