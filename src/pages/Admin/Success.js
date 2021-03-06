import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Finish from '../../components/Finish';

const mapStateToProps = state => ({
  event: state.admin,
  currentEventDate: state.admin.get('currentEventDate'),
});
class Success extends React.Component {
  render() {
    return (
      <Finish
        event={this.props.event}
        dDay={this.props.currentEventDate}
      />
    );
  }
}

Success.propTypes = {
  event: PropTypes.object,
  currentEventDate: PropTypes.object,
};

export default connect(mapStateToProps)(Success);
