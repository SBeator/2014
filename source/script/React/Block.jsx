var React = require("react");

var Block = React.createClass({

    getDefaultProps: function() {
        return {
            size: {
                width: 50,
                height: 50
            }
        };
    },

    _showText: function() {
        return !!this.props.number;
    },

    _getStyle: function() {
        var width = this.props.size.width;
        var height = this.props.size.height;

        return {
            left: this.props.col * width,
            top: this.props.row * height,
            width: width,
            height: height
        };
    },

    render: function() {
        return (
            <div className="block" style={this._getStyle()}>
                <div className="block-display">{this.props.number}</div>
            </div>);
    }
});

module.exports = Block;