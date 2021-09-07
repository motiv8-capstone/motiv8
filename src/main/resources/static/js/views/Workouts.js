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
<button type="submit" class="submit-btn">Submit</button>
</form>

<div id="workout-container">
	 
</div>

    `;
}


export function getBodyPart() {
	$(".submit-btn")
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
	for(let i = 0; i < data.length; i++){
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
			.append(getWeatherCard(obj))
	})
}


function getWeatherCard(weatherObj) {
	let weatherCard = $(`<div class="card col-md-2 px-3 mb-2 mt-2"></div>`);

	weatherCard.append(
		`<div class="card-header date">${weatherObj.bodyPart}</div>
		<div class="card-body">
		<div class="temp">${weatherObj.equipment} </div>`
	)
	return weatherCard
}