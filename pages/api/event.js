import { auth, db } from '../../firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc } from 'firebase/firestore';


const createEvent = async (date, eventDesc, materials, shifts, title, location ) => {
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
      description: eventDesc,
      location: location,
      materials: materialsObj,
      shifts: shiftIDS,
      title: title,
      
    };
    await addDoc(collection(db, "events"), data);
  } catch (error) {
    console.error("Event Creation Error:", error);
    throw error;
  }
};


const editEvent = async (eventId, date, eventDesc, materials, shifts, title, location) => {
  try {
    var materialsObj = [];
    var shiftIDS = [];
    materials.forEach(mat => {
      materialsObj.push({item: mat["name"], user: ""});
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
      date: date,
      description: eventDesc,
      location: location,
      materials: materialsObj,
      shifts: shiftIDS,
      title: title,
    };
    const eventRef = doc(db, "events", eventId); // Now using a document reference
    await updateDoc(eventRef, data);
  } catch (error) {
    console.error("Event Update Error:", error);
    throw error;
  }
};


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