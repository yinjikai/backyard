const server = "https://applet.i7cloud.cn";
const api = {
  getBookingList: `${server}/getBookingList`,
  getDisabledTime: `${server}/getDisabledTime`,
  addAppointment: `${server}/addAppointment`,
  cancelBooking: `${server}/cancelBooking`,
  getUserInfo: `${server}/getUserInfo`,
  getProjectList: `${server}/getProjectList`,
  getTechnicianList: `${server}/getTechnicianList`
};

export function getBookingList(user = "") {
  return `${api.getBookingList}?user=${user}`;
}

export function getDisabledTime(user = "") {
  return `${api.getDisabledTime}?user=${user}`;
}
export function addAppointment(params) {
  return api.addAppointment;
}
export function cancelBooking(id) {
  return `${api.cancelBooking}?id=${id}`;
}
export function getUserInfo(code) {
  return `${api.getUserInfo}?code=${code}`;
}

export function getTechnicianList() {
  return api.getTechnicianList;
}
export function getProjectList() {
  return api.getProjectList;
}
