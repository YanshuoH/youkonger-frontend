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
 * Toggle the eventDate's checked property
 * @param eventDateIdx {number}
 * @returns {function()}
 */
export function checkEventDate(eventDateIdx) {
  return (dispatch, getState) => {
    const eventDate = getState().participate.get('eventDateList').get(eventDateIdx);
    let modifiedEventDate;
    if (eventDate.get('checked')) {
      // set to unchecked (remove the flag)
      modifiedEventDate = eventDate.delete('checked');
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
