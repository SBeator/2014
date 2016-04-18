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
        return !!this.props.data.number;
    },

    _needAnimation: function() {
        return this.props.data.newPosition &&
            !(this.props.data.newPosition.col == this.props.data.col &&
            this.props.data.newPosition.row == this.props.data.row &&
            this.props.data.newNumber == this.props.data.number);
    },

    _getClasses: function() {
        return "block" + (this._needAnimation() ? " moving" : "");
    },

    _getStyle: function() {
        var width = this.props.size.width;
        var height = this.props.size.height;

        var style;

        if(this._needAnimation()) {
            style = {
                transition: "all " + this.props.animationTime + "s",
                zIndex: this.props.data.newPosition.zIndex,
                left: this.props.data.newPosition.col * width,
                top: this.props.data.newPosition.row * height,
                width: width,
                height: height
            };
        } else {
            style = {
                left: this.props.data.col * width,
                top: this.props.data.row * height,
                width: width,
                height: height
            };
        }

        return style;

    },

    _getDisplayStyle: function() {
        return this._needAnimation() ? { transition: "all " + this.props.animationTime + "s"} : {};
    },

    render: function() {
        return (
            <div className={this._getClasses()} style={this._getStyle()}>
                <div className="block-display" style={this._getDisplayStyle()}>{this.props.data.number}</div>
            </div>);
    }
});

module.exports = Block;