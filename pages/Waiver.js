import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, CheckBox, Alert } from 'react-native';
import { addWaiver } from "./api/waivers.js"
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function Waiver({route, navigation}) {
  const [lastName, setLastName] = useState('');
  const [firstInitial, setFirstInitial] = useState('');
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerPhoneCell, setVolunteerPhoneCell] = useState('');
  const [volunteerPhoneHome, setVolunteerPhoneHome] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [homeZip, setHomeZip] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [mailingCity, setMailingCity] = useState('');
  const [mailingZip, setMailingZip] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
  const [emergencyContactPhoneCell, setEmergencyContactPhoneCell] = useState('');
  const [emergencyContactPhoneHome, setEmergencyContactPhoneHome] = useState('');
  const [parentGuardianName, setParentGuardianName] = useState('');
  const [parentGuardianEmail, setParentGuardianEmail] = useState('');
  const [parentGuardianPhone, setParentGuardianPhone] = useState('');
  const [parentGuardianAddress, setParentGuardianAddress] = useState('');
  const [volunteerAgreement, setVolunteerAgreement] = useState('');
  const [volunteerSignature, setVolunteerSignature] = useState('');
  const [volunteerDate, setVolunteerDate] = useState('');
  const [parentGuardianSignature, setParentGuardianSignature] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [uid, setUid] = useState('');

  // await and async?
  const handleSubmit = () => {
    // Firebase
    if (isChecked) {
      if (lastName || firstInitial || volunteerName || volunteerEmail || volunteerPhoneCell || volunteerPhoneHome
        || homeAddress || homeCity || homeZip || mailingAddress || mailingCity || mailingZip || emergencyContactName
        || emergencyContactRelationship || emergencyContactPhoneCell || emergencyContactPhoneHome || volunteerAgreement
        || volunteerDate) {
          addWaiver(uid, emergencyContactName, emergencyContactPhoneCell, emergencyContactPhoneHome, 
            emergencyContactRelationship, firstInitial, homeAddress, homeCity, homeZip, lastName, 
            mailingAddress, mailingCity, mailingZip, parentGuardianAddress, parentGuardianEmail, 
            parentGuardianName, parentGuardianSignature, volunteerDate, volunteerEmail, volunteerName, 
            volunteerPhoneCell, volunteerPhoneHome, volunteerSignature);
          navigation.navigate("Events");
      }
    }
    else {
      Alert.alert("Please agree to the Terms and Conditions");
    }
  };

  useEffect( () => {
    async function fetchData() {
      const { item } = route.params;
      setUid(item.uid);
      console.log(item.uid);

      const userRef = await getDoc(doc(db, "users", item.uid));

      setLastName(userRef.data().lname);
      setFirstInitial(userRef.data().fname[0]);
      setVolunteerName(userRef.data().fname + " " + userRef.data().lname);
      setVolunteerEmail(userRef.data().email);
      setVolunteerPhoneCell(userRef.data().phone);

      // cpontinue doing all the fields from signup!!! slay
      // const event = item;
      // const eventData = event.data();
    }
    fetchData();
 }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/scmac-logo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name  </Text>
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>1st Initial  </Text>
            <TextInput
              style={styles.input}
              onChangeText={setFirstInitial}
              value={firstInitial}
            />
          </View>
        </View>
      </View>
      <Text style={styles.addressText}>9341 Mill Street, Ben Lomond, CA 95005  831-336-3513</Text>
      <Text style={styles.scmacEmail}>www.mountainartcenter.org</Text> 
      <Text style={styles.title}>VOLUNTEER WAIVER</Text>
      <Text style={styles.subtitle}>Release Agreement & Emergency Contact Information</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Emergency Contact Information</Text>
        <Text style={styles.formItem}>Volunteer Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerName}
          value={volunteerName}
        />
        <Text style={styles.formItem}>Volunteer contact email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerEmail}
          value={volunteerEmail}
        />
        <Text style={styles.formItem}>Volunteer phone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerPhoneCell}
          value={volunteerPhoneCell}
          placeholder="Cell"
        />
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerPhoneHome}
          value={volunteerPhoneHome}
          placeholder="Home"
        />
        <Text style={styles.formItem}>Home Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHomeAddress}
          value={homeAddress}
        />
        <Text style={styles.formItem}>City:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHomeCity}
          value={homeCity}
        />
        <Text style={styles.formItem}>Zip:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHomeZip}
          value={homeZip}
        />
        <Text style={styles.formItem}>Mailing Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMailingAddress}
          value={mailingAddress}
        />
        <Text style={styles.formItem}>City:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMailingCity}
          value={mailingCity}
        />
        <Text style={styles.formItem}>Zip:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMailingZip}
          value={mailingZip}
        />
        <Text style={styles.subtitle}>Emergency Contact</Text>
        <Text style={styles.formItem}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmergencyContactName}
          value={emergencyContactName}
        />
        <Text style={styles.formItem}>Relationship to volunteer:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmergencyContactRelationship}
          value={emergencyContactRelationship}
        />
        <Text style={styles.formItem}>Phone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmergencyContactPhoneCell}
          value={emergencyContactPhoneCell}
          placeholder="Cell"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmergencyContactPhoneHome}
          value={emergencyContactPhoneHome}
          placeholder="Home"
        />
        <Text style={styles.subtitle}>Parent or Guardian information (required only if volunteer is under 18)</Text>
        <Text style={styles.formItem}>Name of Parent/Guardian:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setParentGuardianName}
          value={parentGuardianName}
        />
        <Text style={styles.formItem}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setParentGuardianEmail}
          value={parentGuardianEmail}
        />
        <Text style={styles.formItem}>Phone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setParentGuardianPhone}
          value={parentGuardianPhone}
        />
        <Text style={styles.formItem}>Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setParentGuardianAddress}
          value={parentGuardianAddress}
        />
        <Text style={styles.formItem}>City:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMailingCity}
          value={mailingCity}
        />
        <Text style={styles.formItem}>Zip:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMailingZip}
          value={mailingZip}
        />
        <Text style={styles.subtitle}>Volunteer Agreement</Text>
        <Text style={styles.agreementText}>I have agreed to work as a volunteer for Santa Cruz Mountains Art Center and do so of my own free will. As a volunteer, I am not an employee or agent of Santa Cruz Mountains Art Center. I understand this role does not include compensation or payment of any kind. Furthermore, I acknowledge that Santa Cruz Mountains Art Center does not offer health insurance, workers’ compensation insurance, or any such employee benefit to volunteers. As a volunteer, I agree to maintain my health insurance during my time as a volunteer for Santa Cruz Mountains Art Center. (This waiver also may mandate auto liability insurance). 
        </Text>
        <Text style={styles.agreementText}>
          Risk agreement: I fully recognize and accept that volunteering has risks and unforeseen dangers (such risks could be, but are not limited to: mental/emotional stress or physical injury). I understand that I have the right to review each activity prior to my participation and choose to participate of my own free will. I have read and understand Santa Cruz Mountains Art Center's mission statement and best practice procedures. I pledge to act and perform within those expectations.
        </Text>
        <Text style={styles.agreementText}>
          Waiver, release, hold harmless, and indemnification agreement: I acknowledge that Santa Cruz Mountains Art Center does not guarantee safety. I voluntarily waive, release, and hold harmless Santa Cruz Mountains Art Center, its board, employees, agents, and other volunteers from all claims, accidents, injuries, or death that result from actions related to my volunteer activities. I understand that this document disqualifies me from recovering damages against Santa Cruz Mountains Art Center should I be injured in the course of my duties. I shall defend, hold harmless, and indemnify Santa Cruz Mountains Art Center, its board, employees, agents, and other volunteers from and against all claims, accusations, notices, judgments, rulings, liabilities, expenses, etc., that may exist as a result of my actions, inactions, errors, acts, or omissions.
        </Text>
        <Text style={styles.agreementText}>
          Acknowledgement and signatures: I have read and fully understand the above waiver. I understand that by signing this document I am giving up certain rights and accepting certain duties.
        </Text>
        <Text style={styles.formItem}>Volunteer Printed Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerName}
          value={volunteerName}
        />
        <Text style={styles.formItem}>Volunteer Signature:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerSignature}
          value={volunteerSignature}
        />
        <Text style={styles.formItem}>Date:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVolunteerDate}
          value={volunteerDate}
        />
        <Text style={styles.formItem}>If under Age 18, Parent or Guardian Signature:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setParentGuardianSignature}
          value={parentGuardianSignature}
        />
        {/* <View style={styles.agreementContainer}>
          <CheckBox 
            value={agreedToTerms}
            onValueChange={setAgreedToTerms}
          />
          <Text style={styles.agreementText}>
            I have read and agree to the terms and conditions of the waiver.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.submitButton,{ opacity: agreedToTerms ? 1 : 0.5 }]}
          onPress={handleSubmit}
          disabled={!agreedToTerms}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity> */}
      <View style = {{ flexDirection: 'row', alignItems: 'flex-start', width: '95%', height: 20, marginTop: 19, marginBottom: 20}}>
        <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            />
            <Text style={{fontSize: 14, fontWeight: 400, marginLeft: 5, marginTop: 0, width:"100%", height: 40}}>
                I have read and agree to the terms and conditions of the waiver.
            </Text>
       </View>
         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}> 
         <Text style={styles.buttonText}>Submit</Text>
         </TouchableOpacity>
       </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 20, 
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 19,
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRight: { //initial identity
    marginTop: 100,
    alignItems: 'flex-line',
    flexDirection:'row',
    marginLeft: 20,
  },
  logo: {
    marginTop: 100,
    width: 150,
    height: 50,
    marginRight: 20, //distance between logo and init identity
  },
  inputContainer: {
    // marginBottom: 10,
    width: 70,
    marginLeft: 20,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: 'normal', 
  },
  addressText: {
    fontSize: 8,
    textAlign: 'left',
    marginBottom: 10,
    marginRight: 124,
  },
  scmacEmail: {
    fontSize: 8,
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 0.05,
    marginRight: 240,
  },
  formContainer: {
    width: '80%',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  formItem: {
    marginBottom: 5,
  },
  agreementText: {
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 5,
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

