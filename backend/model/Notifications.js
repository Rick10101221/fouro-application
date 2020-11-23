// Notifications file for Creating, Reading, Updating, and Deleting
// Notifications and Requests
var firebase = require("../firebase/config");
require("firebase/firestore");
require("firebase/auth");

// Firestore
const NotificationsAPI = {
    getNotifications: function () {
        // PAGINATED VERSION
        var first = db
            .doc(currUser.uid)
            .collection("notifications")
            .orderBy("date_time")
            .limit(5);
        return first.get().then(function (documentSnapshots) {
            // Get the last visible document
            var lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];
            console.log("last", lastVisible);

            // Construct a new query starting at this document,
            // get the next 25 cities.
            var next = db
                .doc(currUser.uid)
                .collection("notifications")
                .orderBy("date_time")
                .limit(5);
        });
    },

    deleteNotification: function (requestId) {
        requestId.delete().then();
    },
};

const RequestsAPI = {
    sendFriendRequest: function (userId) {},

    createHugRequest(friendId, hugId) {},
};

// Export the module
module.exports = { NotificationsAPI, RequestsAPI }; // awaiting to be filled
