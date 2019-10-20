var firebaseConfig = {
  apiKey: "AIzaSyB6H98vdtbtTe_upImcqEAe4sR4k_V-J1o",
  authDomain: "traintime-e4ad2.firebaseapp.com",
  databaseURL: "https://traintime-e4ad2.firebaseio.com",
  projectId: "traintime-e4ad2",
  storageBucket: "traintime-e4ad2.appspot.com",
  messagingSenderId: "797741278070",
  appId: "1:797741278070:web:b583e8c3354d46cebc5057",
  measurementId: "G-FTS3K4GNP4"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
console.log(trainName)
  
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm" ).format("HH:mm");
  var trainFrequency = $("#frequency-input").val().trim();

 
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

 
  database.ref().push(newTrain);


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
  	console.log(trainDestination);
  	console.log(trainTime);
  	console.log(trainFrequency);



    var tFrequency = trainFrequency;

   
    var firstTime = trainTime;

    
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  
    
    var currentTime = moment();
    
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   
    
    var tRemainder = diffTime % tFrequency;
   
    
    var tMinutesTillTrain = tFrequency - tRemainder;
    
    console.log(tMinutesTillTrain)
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    console.log(nextTrain)
    
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});