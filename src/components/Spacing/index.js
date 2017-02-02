import React, { PropTypes } from 'react';

class Spacing extends React.PureComponent {
  render() {
    let style;
    if (this.props.px) {
      style = { marginTop: this.props.px };
    }
    return (
      <div className="yk-top-margin" style={style} />
    );
  }
}

Spacing.propTypes = {
  px: PropTypes.number,
};

export default Spacing;
