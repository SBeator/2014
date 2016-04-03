var React = require("react");

var Playground = require("./Playground.jsx");

var Main = React.createClass({
    render: function() {
        return (
            <div className="main">
                <Playground table={this.props.data.table} block={this.props.data.block} />
            </div>);
    }
});

module.exports = Main;