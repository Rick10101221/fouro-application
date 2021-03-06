const express = require("express");
const router = express.Router();
const { HugsAPI, UpdateHugAPI, ViewHugAPI } = require("../model/Hugs");

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(express.json());

function checkBody(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send("Missing JSON request body");
    return;
  }
  next();
}

async function retrieveUserData(req, res, uid) {
  const userRef = usersCollection.doc(uid);
  const user = await userRef.get();
  if (!user.exists) {
    res.status(400).send("No user with the provided UID was found");
    return undefined;
  }
  req.body.userRef = userRef;
  return user.data();
}

// const response = HugsAPI.createHug(uid, friend_id, message, blobs);

// Routes
// TODO: BROKEN. CREATE HUG IS NOT WORKING.
router.post("/createHug/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { friendId, message, base64 } = req.body;

  console.log(friendId, message, base64.length);
  if (!friendId || !message || !base64) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      const response = await HugsAPI.createHug(uid, friendId, message, base64);
      console.log("response:", response);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: BROKEN (SEE ABOVE)
router.post("/respondToHug/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { hugId, message, base64 } = req.body;

  if (!hugId || !message || !base64) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    const response = 
      await UpdateHugAPI.respondToHug(uid, hugId, message, base64);
    console.log("response:", response);
    res.status(200).json(response);
    try {
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: BROKEN (SEE ABOVE)
router.delete("/dropAHug/:id", checkBody, async (req, res) => {
  const uid = req.params.id;
  const { requestId, hugId } = req.body;

  if (!requestId || !hugId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      console.log('here now');
      const response = await HugsAPI.dropHug(uid, requestId, hugId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

// TODO: BROKEN (SEE ABOVE)
router.get("/getUserHugs/:id", async (req, res) => {
  const uid = req.params.id;
  // console.log(uid);
  try {
    const response = await ViewHugAPI.getUserHugs(uid);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(`An error occurred: ${err}`);
  }
});

// TODO: BROKEN (SEE ABOVE)
router.get("/getHugById/:id,:hugId", async (req, res) => {
  const uid = req.params.id;
  const hugId = req.params.hugId;

  if (!hugId) {
    res.status(400).send("Request has missing fields");
    return;
  } else {
    try {
      const response = await ViewHugAPI.getHugById(hugId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(`An error occurred: ${err}`);
    }
  }
});

module.exports = router;
