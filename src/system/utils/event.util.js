import EventEmitter from "events";

const myEmmiter = new EventEmitter();

export const knownEvents = {
  projectCreated: "projectCreated",
  addUserToProject: "addUserToProject",
  addLeadToProject: "addLeadToProject",
};

export const subscribe = (eventName, callback) => {
  myEmmiter.on(eventName, callback);
};

export const eventEmit = (eventName, data) => {
  myEmmiter.emit(eventName, data);
};
