import {
  ADMIN_SHOW_EVENT_DATE_DETAIL,
  ADMIN_EXIT_EVENT_DATE_DETAIL,
  ADMIN_FETCH_EVENT_DATE_DDAY_REQUEST,
  ADMIN_FETCH_EVENT_DATE_DDAY_SUCCESS,
  ADMIN_FETCH_EVENT_DATE_DDAY_FAILURE,
  ADMIN_SHOW_ACTION_SHEET,
  ADMIN_HIDE_ACTION_SHEET,
  API_EVENT_DATE_DDAY,
} from '../../../constants';
import { fetchPost } from '../../../utils';

export function showEventDateDetail(eventDate) {
  return {
    type: ADMIN_SHOW_EVENT_DATE_DETAIL,
    payload: {
      eventDate,
    }
  };
}

export function exitEventDateDetail() {
  return {
    type: ADMIN_EXIT_EVENT_DATE_DETAIL,
  };
}

export function fetchApiDDayRequest() {
  return {
    type: ADMIN_FETCH_EVENT_DATE_DDAY_REQUEST,
    payload: {
      fetching: true,
    }
  };
}

export function fetchApiDDaySuccess(event) {
  return {
    type: ADMIN_FETCH_EVENT_DATE_DDAY_SUCCESS,
    payload: {
      fetching: false,
      submitted: true,
      event,
    }
  };
}

export function fetchApiDDayFailure(error) {
  return {
    type: ADMIN_FETCH_EVENT_DATE_DDAY_FAILURE,
    payload: {
      fetching: false,
      error,
    }
  };
}

export function fetchApiDDay() {
  return (dispatch, getState) => {
    const adminState = getState().admin;
    const uuid = adminState.get('uuid');
    const hash = adminState.get('hash');
    const eventDateUuid = adminState.get('currentEventDate').get('uuid');
    const toPost = {
      uuid,
      hash,
      eventDateUuid,
    };

    dispatch(fetchApiDDayRequest());
    fetchPost(API_EVENT_DATE_DDAY, JSON.stringify(toPost))
      .then((data) => {
        dispatch(fetchApiDDaySuccess(data));
      })
      .catch((error) => {
        dispatch(fetchApiDDayFailure(error));
      });
  };
}

export function showActionSheet() {
  return {
    type: ADMIN_SHOW_ACTION_SHEET,
    payload: {
      showActionSheet: true,
    }
  };
}

export function hideActionSheet() {
  return {
    type: ADMIN_HIDE_ACTION_SHEET,
    payload: {
      showActionSheet: false,
    }
  };
}
