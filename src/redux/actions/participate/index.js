import {
  PARTICIPATION_NAME_ONCHANGE,
  PARTICIPATION_NAME_ONBLUR,
  PARTICIPATION_SHOW_DATE_DETAIL,
  PARTICIPATION_EXIT_DATE_DETAIL,
  PARTICIPATION_CHECK_DATE,
  PARTICIPATION_NAME_CHECK,
} from '../../../constants';

export function onChangeNameInput(value) {
  return {
    type: PARTICIPATION_NAME_ONCHANGE,
    payload: {
      value,
    }
  };
}

export function onBlurNameInput(value) {
  return {
    type: PARTICIPATION_NAME_ONBLUR,
    payload: {
      nameErr: value === '',
      value,
    }
  };
}

export function checkNameInput() {
  return {
    type: PARTICIPATION_NAME_CHECK
  };
}

export function showEventDateDetail(eventDate) {
  return {
    type: PARTICIPATION_SHOW_DATE_DETAIL,
    payload: {
      eventDate,
    },
  };
}

export function exitEventDateDetail() {
  return {
    type: PARTICIPATION_EXIT_DATE_DETAIL,
  };
}

/**
 * Toggle the eventDate's checked property, will find eventDateIdx by eventDate if not provided
 * @param eventDate {object}
 * @param eventDateIdx {number}
 * @returns {function()}
 */
export function checkEventDate(eventDate, eventDateIdx = -1) {
  return (dispatch, getState) => {
    if (eventDateIdx === -1) {
      eventDateIdx = getState().participate
        .get('eventDateList')
        .findIndex(ed => ed.get('uuid') === eventDate.get('uuid'));
    }
    // still not found
    if (eventDateIdx === -1) {
      console.warn('Unable to find eventDate index');
    }
    let modifiedEventDate;
    if (eventDate.get('checked')) {
      // set to unchecked (remove the flag)
      modifiedEventDate = eventDate.set('checked', false);
    } else {
      modifiedEventDate = eventDate.set('checked', true);
    }
    dispatch({
      type: PARTICIPATION_CHECK_DATE,
      payload: {
        eventDate: modifiedEventDate,
        eventDateIdx,
      }
    });
  };
}
