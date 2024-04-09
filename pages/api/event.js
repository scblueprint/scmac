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



export { createEvent };