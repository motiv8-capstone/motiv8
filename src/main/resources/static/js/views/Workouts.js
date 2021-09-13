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


            fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectOption}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
                    "x-rapidapi-key": "0fda1c2912msh4a1299d685685e4p139959jsn8a0fbfe6c5a1"
                }
            })
                .then(response => {
                    return (response.json());
                })
                .then(function (data) {
                    console.log(data)
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
            bodyPart: data[i].bodyPart,
            equipment: data[i].equipment,
            gifUrl: data[i].gifUrl,
            id: data[i].id,
            name: data[i].name,
            target: data[i].target
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
    addWorkoutEvent();
}

function showGif() {
    console.log("in show")
    $('#gifUrl').style.visibility = 'visible';
}

function getWorkoutCard(workoutObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2" onmouseover=showGif()></div>`);

    workoutsCard.append(
        `<form>
		<input class="card-header" id="bodyPart" readonly>${workoutObj.bodyPart}</input>
		<input id="name" readonly>${workoutObj.name}</input>
		<input id="equipment" readonly>${workoutObj.equipment} </input>
		<input id="target" readonly>${workoutObj.target} </input>
		<select name="rating" id="rating">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select>
		<img  alt="" class="gif" id="gifUrl" style="visibility:hidden" src="${workoutObj.gifUrl}">
		<button type="submit" data-id="${workoutObj.id}" class="workout-submit-btn">Select</button></form>
		`
    )
    return workoutsCard
}

function addWorkoutEvent() {

    $(".workout-submit-btn").click(function () {
        $(this)
			console.log("click event has fired off")
            let selectedWorkout = {
                bodyPart: $("#bodyPart").val(),
                equipment: $("#equipment").val(),
                gif_url: $("#gifUrl").attr('src'),
                name: $("#name").val(),
                primary_muscle: $("#target").val(),
                rating: $("#rating :selected").val()
            }
            console.log(selectedWorkout.gif_url)
            console.log(selectedWorkout.bodyPart)
            let request = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(selectedWorkout)
            }
            fetch("http://localhost:8080/api/workouts", request)
                .then(res => {
                    console.log(res.status)
                    createView("/workouts")
                })
                .catch(error => {
                    console.log(error);
                    createView("/workouts")
                })

        })

}