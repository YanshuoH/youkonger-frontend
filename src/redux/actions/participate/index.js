import {
  PARTICIPATION_NAME_ONCHANGE,
  PARTICIPATION_NAME_ONBLUR,
  PARTICIPATION_SHOW_DATE_DETAIL,
  PARTICIPATION_EXIT_DATE_DETAIL,
  PARTICIPATION_CHECK_DATE,
  PARTICIPATION_NAME_CHECK,
  PARTICIPATION_UPSERT_REQUEST,
  PARTICIPATION_UPSERT_SUCCESS,
  PARTICIPATION_UPSERT_FAILURE,
  API_EVENT_PARTICIPANT_UPSERT,
} from '../../../constants';
import { fetchPost } from '../../../utils/fetchUtils';

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

export function fetchEventParticipantUpsertRequest() {
  return {
    type: PARTICIPATION_UPSERT_REQUEST,
    payload: {
      fetching: true,
    }
  };
}

export function fetchEventParticipantUpsertSuccess(event) {
  return {
    type: PARTICIPATION_UPSERT_SUCCESS,
    payload: {
      fetching: false,
      submitted: true,
      event,
    }
  };
}

export function fetchEventParticipantUpsertFailure(error) {
  return {
    type: PARTICIPATION_UPSERT_FAILURE,
    payload: {
      fetching: false,
      error,
    }
  };
}

export function fetchEventParticipantUpsertApi() {
  return (dispatch, getState) => {
    const participateState = getState().participate;
    const eventDates = participateState.get('eventDateList');
    const datesToPost = []
    for (let i = 0; i < eventDates.size; i++) {
      const d = eventDates.get(i);
      if (d.get('checked')) {
        datesToPost.push({
          eventDateUuid: d.get('uuid'),
        });
      }
    }
    const data = {
      name: participateState.get('name'),
      eventParticipantList: datesToPost,
    }
    dispatch(fetchEventParticipantUpsertRequest());
    fetchPost(API_EVENT_PARTICIPANT_UPSERT, JSON.stringify(data))
      .then((resp) => {
        dispatch(fetchEventParticipantUpsertSuccess(resp));
      })
      .catch((error) => {
        dispatch(fetchEventParticipantUpsertFailure(error));
      });
  };
}
