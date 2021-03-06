import { Map } from 'immutable';
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
  API_PARTICIPANT_USER_UPSERT,
  PARTICIPATION_GO_BACK_AND_EDIT,
  UserUUIDCookieKey,
} from '../../../constants';
import {
  fetchPost,
  isCheckedDate,
  setCookie,
  getCookie,
} from '../../../utils';

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
 * Find in eventParticipantList, if the specified user exists, toggle the removed property,
 * otherwise, create it
 * @param eventDate {Immutable.Map}
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

    const { idx, checked } = isCheckedDate(getState().participate.get('participantUserUuid'), eventDate);
    // when not checked, find or create eventParticipant object
    let modifiedEventDate;
    if (!checked) {
      if (idx === -1) {
        // create it
        const eventParticipant = {
          name: getState().participate.get('name'),
          eventDateUuid: eventDate.get('uuid'),
          participantUserUuid: getState().participate.get('participantUserUuid'),
          remove: false,
        };
        modifiedEventDate = eventDate.set('eventParticipantList', eventDate.get('eventParticipantList').push(Map(eventParticipant)));
      } else {
        // set removed to false
        modifiedEventDate = eventDate.setIn(['eventParticipantList', idx, 'remove'], false);
      }

      dispatch({
        type: PARTICIPATION_CHECK_DATE,
        payload: {
          eventDate: modifiedEventDate,
          eventDateIdx,
        }
      });
      return;
    }

    // is checked, set to removed
    modifiedEventDate = eventDate.setIn(['eventParticipantList', idx, 'remove'], true);
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
  setCookie(UserUUIDCookieKey, event.userUuid, 30);
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
    const participantUserUuid = participateState.get('participantUserUuid');
    let userUuid = participateState.get('userUuid');
    if (userUuid === '') {
      userUuid = getCookie(UserUUIDCookieKey);
    }

    const eventDates = participateState.get('eventDateList');
    const eventParticipantsToPost = [];

    for (let i = 0; i < eventDates.size; i++) {
      const d = eventDates.get(i);
      for (let j = 0; j < d.get('eventParticipantList').size; j++) {
        const p = d.get('eventParticipantList').get(j);
        if (participantUserUuid === p.get('participantUserUuid')) {
          eventParticipantsToPost.push({
            participantUserUuid,
            userUuid,
            uuid: p.get('uuid'),
            eventDateUuid: d.get('uuid'),
            remove: p.get('remove'),
          });
          break;
        }
      }
    }
    const data = {
      name: participateState.get('name'),
      participantUserUuid,
      userUuid,
      eventParticipantList: eventParticipantsToPost,
      eventUuid: participateState.get('uuid'),
    };
    console.log('Post data:', data);
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

export function fetchParticipantUserUpsertApi(unavailable = true) {
  return (dispatch, getState) => {
    const participateState = getState().participate;
    const participantUserUuid = participateState.get('participantUserUuid');
    let userUuid = participateState.get('userUuid');
    if (userUuid === '') {
      userUuid = getCookie(UserUUIDCookieKey);
    }
    const data = {
      name: participateState.get('name'),
      participantUserUuid,
      userUuid,
      eventUuid: participateState.get('uuid'),
      unavailable,
    };

    dispatch(fetchEventParticipantUpsertRequest());
    fetchPost(API_PARTICIPANT_USER_UPSERT, JSON.stringify(data))
      .then((resp) => {
        dispatch(fetchEventParticipantUpsertSuccess(resp));
      })
      .catch((error) => {
        dispatch(fetchEventParticipantUpsertFailure(error));
      });
  };
}

export function goBackAndEdit() {
  return {
    type: PARTICIPATION_GO_BACK_AND_EDIT,
  };
}
