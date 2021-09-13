import createView from "../createView.js";

export default function Workouts(props) {
    return `
        <header>
            <h1>Workout Page</h1>
        </header>
 
  <form action="">
  <label for="body parts">Choose what you are looking to workout:</label>

<select name="bodyParts" id="bodyParts">
  <option value="shoulders">Shoulders</option>
  <option value="chest">Chest</option>
  <option value="biceps">Biceps</option>
  <option value="triceps">Triceps</option>
  <option value="back">Back</option>
  <option value="abs">Abs</option>
  <option value="quads">Quads</option>
  <option value="hammies">Hammies</option>
  <option value="ass">Ass</option>
  <option value="caffs">Caffs</option>
</select>
<button type="submit" id="submit-btn">Submit</button>
</form>

<div id="workout-container" class="row">
	 
</div>

    `;
}

export function init(){
	getBodyPart();
}



function getBodyPart() {
    $("#submit-btn")
        .click(function () {
            let selectOption = $("#bodyParts :selected")
                .val();


            console.log(selectOption)


            fetch(`http://localhost:8080/api/workouts/findByBodyPart?bodypart=${selectOption}`, {
                "method": "GET",
                "headers": {"Content-Type": "application/json"}
            })
                .then(response => {
                    return (response.json());
                })
                .then(function (data) {
                    console.log(JSON.parse(data[0].workout.bodyPart))
                    appendAllWorkoutData(filterWorkoutObject(data))
                })
                .catch(err => {
                    console.error(err);
                });

        })
}

function filterWorkoutObject(data) {
    let workoutObjArr = [];
    for (let i = 0; i < data.length; i++) {
        workoutObjArr.push({
            id: data[i].workout.id,
            name: data[i].workout.name,
            bodyPart: data[i].workout.bodyPart,
            equipment: data[i].workout.equipment,
            gifUrl: data[i].workout.gifUrl,
            target: data[i].workout.target
        })
    }
    return workoutObjArr;
}

function appendAllWorkoutData(workoutArr) {
    $('#workout-container')
        .empty()
    workoutArr.forEach(function (obj) {
        $('#workout-container')
            .append(getWorkoutCard(obj))
    })
}


function getWorkoutCard(workoutObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
    workoutsCard.append(
        `<div class="workout-card"><form>
		<input class="card-header" id="bodyPart" value="${workoutObj.bodyPart}" readonly>${workoutObj.bodyPart}</input>
		<input id="name" value="${workoutObj.name}"  readonly>${workoutObj.name}</input>
		<input id="equipment" value="${workoutObj.equipment}" readonly>${workoutObj.equipment} </input>
		<input id="target" value="${workoutObj.target}" readonly>${workoutObj.target} </input>
		<select name="rating" id="rating">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select>
		<img alt="" data-id="${workoutObj.gifUrl}" class="gif" id="gifUrl" src="${workoutObj.gifUrl}">
		<button type="submit" class="workout-submit-btn">Select</button></form></div>
		`
    )
    return workoutsCard
}

//
// function addWorkoutEvent() {
//
//    $('.workout-submit-btn').click(function (e) {
//
// 			console.log("click event has fired off")
//             let selectedWorkout = {
//                 bodyPart: $("#bodyPart").val(),
//                 equipment: $("#equipment").val(),
//                 gif_url: $("#gifUrl").attr('src').toString(),
//                 name: $("#name").val(),
//                 primary_muscle: $("#target").val(),
//                 rating: $("#rating :selected").val()
//             }
//             console.log(selectedWorkout.gif_url)
//             console.log(selectedWorkout.bodyPart)
//             console.log(selectedWorkout.name)
//             console.log(selectedWorkout.primary_muscle)
//             console.log(selectedWorkout.equipment)
//             let request = {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(selectedWorkout)
//             }
//             fetch("http://localhost:8080/api/workouts", request)
//                 .then(res => {
//                     console.log(res.status)
//                     createView("/workouts")
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     createView("/workouts")
//                 })
//
//         })
//
// }