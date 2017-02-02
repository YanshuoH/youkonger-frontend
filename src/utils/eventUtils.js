import { List } from 'immutable';
/**
 * Given eventDateList, should retrieve non-duplicated participant user uuid list
 * @param eventDateList {Immutable.List}
 * @returns {Array}
 */
export function retrieveParticipantUserUUIDs(eventDateList) {
  const participantUserUUIDs = [];
  for (let i = 0; i < eventDateList.size; i++) {
    const ed = eventDateList.get(i);
    for (let j = 0; j < ed.get('eventParticipantList').size; j++) {
      const ep = ed.get('eventParticipantList').get(j);
      if (participantUserUUIDs.indexOf(ep.get('participantUserUuid')) === -1) {
        participantUserUUIDs.push(ep.get('participantUserUuid'));
      }
    }
  }

  return participantUserUUIDs;
}

/**
 * Given eventDateList, should retrieve the eventDate(s) who have the most participants
 * @param eventDateList {Immutable.List}
 * @returns {Immutable.List}
 */
export function retrieveMaxParticipantEventDates(eventDateList) {
  let maxVal = 0;
  for (let i = 0; i < eventDateList.size; i++) {
    const ed = eventDateList.get(i);
    if (ed.get('eventParticipantList').size > maxVal) {
      maxVal = ed.get('eventParticipantList').size;
    }
  }

  if (maxVal === 0) {
    return List([]);
  }

  return eventDateList.filter(ed => ed.get('eventParticipantList').size === maxVal);
}

/**
 * Given eventDateList, should retrieve the D-Day
 * @param eventDateList
 * @returns {Immutable.Map|null}
 */
export function retrieveDDayFromEventDates(eventDateList) {
  for (let i = 0; i < eventDateList.size; i++) {
    if (eventDateList.get(i).get('isDDay')) {
      return eventDateList.get(i);
    }
  }

  return null;
}
