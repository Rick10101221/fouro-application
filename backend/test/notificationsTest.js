let Notifications = require("../model/Notifications");
let Users = require("../model/Users");
async function testGetNotifications() {
  let test = await Notifications.NotificationsAPI.getNotifications(
    //"example@email.com"
    //"D3ExthKFKOf1D0gOrDqka0Y34Ik1"
    "GZm198LsAbSEYRK040xGTaD383B3"
  );
  console.log(test);
}
async function testSendNotifications() {
  let test = await Notifications.RequestsAPI.sendFriendRequest(
    "example@email.com",
    "D3ExthKFKOf1D0gOrDqka0Y34Ik1"
  );
  console.log(test);
}
async function testSendNotifications2() {
  let test = await Notifications.RequestsAPI.sendHugRequest(
    "example@email.com",
    "D3ExthKFKOf1D0gOrDqka0Y34Ik1",
    "hug2"
  );
  console.log(test);
}
async function testDeleteNotifications() {
  let test = await Notifications.NotificationsAPI.deleteNotification(
    "otherguy@email.com",
    "CNmpPDEeOGUGXsYXn29y"
  );
  console.log(test);
}
async function testDeleteNotifications2wHug() {
  let test = await Notifications.NotificationsAPI.deleteNotification(
    "otherguy@email.com",
    "pnwCrlrZTycbgC1LA7wI"
  );
  console.log(test);
}

//testSendNotifications();
//testSendNotifications2();
testGetNotifications();
