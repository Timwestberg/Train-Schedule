

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAG8R2Ygx-kV4ldr2KlQ5Nya1M7rQXSRtk",
    authDomain: "train-schedule-demo.firebaseapp.com",
    databaseURL: "https://train-schedule-demo.firebaseio.com",
    projectId: "train-schedule-demo",
    storageBucket: "",
    messagingSenderId: "452970864256"
  };


  firebase.initializeApp(config);


// referenceing the fire base database
  let dataBank = firebase.database();

//   Initial values
    let tripName = "";
    let destination = "";
    let arrivalTime = "";
    let frequency = "";
    let nextArrival = "";
    let today = moment().format("L");
    console.log(today);

    let fbaseID = moment().format("MMDDYYYY");

    console.log(fbaseID);

    // Adding a trip

    $("#addButton").on("click", function (event) {

        event.preventDefault();


        // Retrieving the user input to add into a variable

        tripName = $("#nameofTrain").val();

        destination = $("#destination").val();

        arrivalTime = $("#arrivalTime").val();

        frequency = $("#frequency").val();

        // push variable to firebase to store

        dataBank.ref(fbaseID).push({

            tripName: tripName,
            destination: destination,
            arrivalTime: arrivalTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

          });  

          // $("#nameofTrain").reset();
          // $("#destination").reset();
          // $("#arrivalTime").reset();
          // $("#frequency").reset();

        });

        dataBank.ref(fbaseID).on("child_added", function(snapShot) {
          let snap = snapShot.val()

          console.log(snap.tripName);
          console.log(snap.destination);
          console.log(snap.arrivalTime);
          console.log(snap.frequency);
          console.log(snap.dateAdded);
// Variable names
          let Row = $("<tr>");

          let name = $("<td>");
          let dest = $("<td>");
          let arriv = $("<td>");
          let freq = $("<td>");
          let nextT = $("<td>");

          // Assumptions
    let trainFrequency = snap.frequency;

    // Time is 3:30 AM
    let firstTime = snap.arrivalTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    // Minute Until Train
    var minutesTillTrain = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    name =  name.text(snap.tripName);
    dest = dest.text(snap.destination);
    arriv = arriv.text(snap.arrivalTime);
    freq = freq.text(snap.frequency);
    nextT = nextT.text(minutesTillTrain);




    Row = Row.append(name).append(dest).append(arriv).append(freq).append(nextT);
          

      
          
          $("#scheduleBody").append(Row);



        });


 
