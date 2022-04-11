export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_USERTYPE = 'DASHBOARD.SET_USERTYPE';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD.SET_ACTIVE_USERS';
export const DASHBOARD_SET_GROUP_CALL_ROOMS = 'DASHBOARD.SET_GROUP_CALL_ROOMS';

export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username
  };
}
;


export const setActiveUsers = (activeUsers) => {
  return {
    type: DASHBOARD_SET_ACTIVE_USERS,
    activeUsers
  };
}
;

export const setGroupCalls = (groupCallRooms) => {
  return {
    type: DASHBOARD_SET_GROUP_CALL_ROOMS,
    groupCallRooms
  };
};

// new 

export const usertypeop = 'OPERATOR';
export const usertypemc = 'MACHINE';
export const userreasonmc = {
  a:'Not Able To Find Language',
  b:'Not Able To Find Terminal'
};


