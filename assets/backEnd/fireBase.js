

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
    let today = new Date();
    console.log(today);


    // Adding a trip

    $("#addButton").on("click", function (event) {

        event.preventDefault();


        // Retrieving the user input to add into a variable

        tripName = $("#tripName").val().trim();
        destination = $("#destination").val().trim();
        arrivalTime = $("#arrivalTime").val().trim();
        frequency = $("#frequency").val().trim();

        // push variable to firebase to store

        dataBank.ref(today).push({

            tripName: tripName,
            destination: destination,
            arrivalTime: arrivalTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

            
        });


    });
