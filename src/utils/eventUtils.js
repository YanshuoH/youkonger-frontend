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
