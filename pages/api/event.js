import { auth, db } from '../../firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc } from 'firebase/firestore';


const createEvent = async (date, endDate, eventDesc, materials, shifts, title, location, category ) => {
    try {
    var materialsObj = []
    var shiftIDS = []
    materials.forEach(mat => {
        materialsObj.push({item: mat["name"], user: ""});
    });
    for (let i = 0; i < shifts.length; i++) {
        const shift = shifts[i];
        if (shift["end"] && shift["start"]) {
            const docRef = await addDoc(collection(db, "shifts"), {
                endTime: parseInt(shift["end"]),
                startTime: parseInt(shift["start"]),
                user: []
            });
            console.log(docRef.id);
            shiftIDS.push(docRef.id);
        }
    }
    console.log(shiftIDS)
    const data = {
      date: date,
      endDate: endDate == "End Day, Date" ? "null": endDate,
      description: eventDesc,
      location: location,
      materials: materialsObj,
      shifts: shiftIDS,
      title: title,
      category: category
    };
    const doc = await addDoc(collection(db, "events"), data);
    return doc;
  } catch (error) {
    console.error("Event Creation Error:", error);
    throw error;
  }
};


const editEvent = async (eventId, eventStart, eventEnd, eventDesc, materials, shifts, title, location, category) => {
  try {
    var materialsObj = [];
    var shiftIDS = [];
    materials.forEach(mat => {
      materialsObj.push({ item: mat["name"], user: "" });
    });
    for (let i = 0; i < shifts.length; i++) {
      const shift = shifts[i];
      if (shift["endTime"] && shift["startTime"]) {
        const docRef = await addDoc(collection(db, "shifts"), {
          endTime: parseInt(shift["endTime"]),
          startTime: parseInt(shift["startTime"]),
          user: []
        });
        console.log(docRef.id);
        shiftIDS.push(docRef.id);
      }
    }
    const data = {
      date: eventStart,
      endDate: eventEnd,
      description: eventDesc,
      location: location,
      materials: materialsObj,
      shifts: shiftIDS,
      title: title,
      category: category
    };
    const eventRef = doc(db, "events", eventId);
    await getUserNotifTokens((await getDoc(eventRef)).data().shifts, title);
    await updateDoc(eventRef, data);

  } catch (error) {
    console.error("Event Update Error:", error);
    throw error;
  }
};

const getUserNotifTokens = async (shiftIds, title) => {
  try {
    for (const shiftId of shiftIds) {
      const shiftDocRef = doc(db, "shifts", shiftId);
      const shiftDocSnap = await getDoc(shiftDocRef);

      if (!shiftDocSnap.exists()) {
        console.log("No such document!");
        continue;
      }

      const shiftData = shiftDocSnap.data();
      const userId = shiftData.user;

      if (userId && userId.length > 0) {
        for (const uid of userId) {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            console.log("No such document!");
            continue;
          }

          const userData = userDocSnap.data();
          const notifToken = userData.notifToken;
          sendPushNotification(notifToken, title)
          console.log(`User ID: ${uid}, Notification Token: ${notifToken}`);
        }
      }
    }
  } catch (error) {
    console.error("Error getting user notification tokens: ", error);
  }
};
async function sendPushNotification(notiToken, eventName) {
  const url = "https://exp.host/--/api/v2/push/send";
  const payload = {
    to: notiToken,
    title: "Event Update",
    body: "an event you are signed up for has been updated: "+ eventName 
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Push notification sent successfully:", data);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}
const getShiftData = async (shiftList) => {
  try {

    var shiftData = []
  for (let i = 0; i < shiftList.length; i++) {
      const docRef = doc(db, "shifts", shiftList[i]);
      const docSnap = await getDoc(docRef);
      shiftData.push(docSnap.data());
  }
  console.log("hi my name is anirudh")
    console.log(shiftData)
    return(shiftData);
} catch (error) {
  console.error("Event Creation Error:", error);
  throw error;
}
};

export { createEvent, editEvent, getShiftData };