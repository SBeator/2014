var React = require("react");

var Playground = require("./Playground.jsx");
var Score = require("./Score.jsx");

var Main = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Playground table={this.props.data.table} block={this.props.data.block} />
                <Score />
            </div>);
    }
});

module.exports = Main;