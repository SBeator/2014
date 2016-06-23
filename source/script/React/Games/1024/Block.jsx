const React = require('react');

const propTypes = {
  data: React.PropTypes.object,
  size: React.PropTypes.object,
  animationTime: React.PropTypes.number
};

const defaultProps = {
  size: {
    width: 50,
    height: 50
  }
};

class Block extends React.Component {
  getShowText() {
    return !!this.props.data.number;
  }

  getNeedAnimation() {
    return this.props.data.newPosition &&
      !(this.props.data.newPosition.col === this.props.data.col &&
        this.props.data.newPosition.row === this.props.data.row &&
        this.props.data.newNumber === this.props.data.number);
  }

  getClasses() {
    return `block ${this.getNeedAnimation() ? ' moving' : ''}`;
  }

  getStyle() {
    const width = this.props.size.width;
    const height = this.props.size.height;

    let style;

    if (this.getNeedAnimation()) {
      style = {
        transition: `all ${this.props.animationTime}s`,
        zIndex: this.props.data.newPosition.zIndex,
        left: this.props.data.newPosition.col * width,
        top: this.props.data.newPosition.row * height,
        width,
        height
      };
    } else {
      style = {
        left: this.props.data.col * width,
        top: this.props.data.row * height,
        width,
        height
      };
    }

    return style;
  }

  getDisplayStyle() {
    return this.getNeedAnimation() ? { transition: `all ${this.props.animationTime}s` } : {};
  }

  render() {
    return (
      <div className={this.getClasses()} style={this.getStyle()}>
        <div className="block-display" style={this.getDisplayStyle()}>{this.props.data.number}</div>
      </div>);
  }
}

Block.propTypes = propTypes;
Block.defaultProps = defaultProps;

module.exports = Block;
