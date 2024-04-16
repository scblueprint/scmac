import { auth, db } from '../../firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc } from 'firebase/firestore';

// code to add waiver
const addWaiver = async (emergencyContactName, emergencyContactPhoneCell, emergencyContactPhoneHome, 
  emergencyContactRelationship, firstInitial, homeAddress, homeCity, homeZip, lastName, 
  mailingAddress, mailingCity, mailingZip, parentGuardianAddress, parentGuardianEmail, 
  parentGuardianName, parentGuardianSignature, volunteerDate, volunteerEmail, volunteerName, 
  volunteerPhoneCell, volunteerPhoneHome, volunteerSignature) => {
  try {
    const user = userCredential.user;
    const data = {
      uid: user.uid,
      emergencyContactName: emergencyContactName,
      emergencyContactPhoneCell: emergencyContactPhoneCell, 
      emergencyContactPhoneHome: emergencyContactPhoneHome,
      emergencyContactRelationship: emergencyContactRelationship,
      firstInitial: firstInitial,
      homeAddress: homeAddress,
      homeCity: homeCity,
      homeZip: homeZip,
      lastName: lastName,
      mailingAddress: mailingAddress,
      mailingCity: mailingCity,
      mailingZip: mailingZip,
      parentGuardianAddress: parentGuardianAddress,
      parentGuardianEmail: parentGuardianEmail,
      parentGuardianName: parentGuardianName,
      parentGuardianSignature: parentGuardianSignature,
      volunteerDate: volunteerDate,
      volunteerEmail: volunteerEmail,
      volunteerName: volunteerName,
      volunteerPhoneCell: volunteerPhoneCell,
      volunteerPhoneHome: volunteerPhoneHome,
      volunteerSignature: volunteerSignature
    };
    await setDoc(doc(db, "waivers", user.uid), data);
    return user;
    
  } catch (error) {
    console.error("Waiver submit error:", error);
    throw error;
  }
};

export { addWaiver };