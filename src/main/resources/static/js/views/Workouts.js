import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function Workouts(props) {
	return `
<h1 class="text-center mt-2">Workout Catalog</h1>
<div class="container py-5">
<div class="jumbotron text-white jumbotron-image shadow" style="background-image: url(https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80);">
</div>
</div>	

<div class="container">
  <form action="">
  <div class="input-group">
	<select class="form-select mb-3" name="bodyParts" id="bodyParts">
	  <option>Select a body part</option>
	  <option value="shoulders">Shoulders</option>
	  <option value="chest">Chest</option>
	  <option value="upper arms">Arms</option>
	  <option value="back">Back</option>
	  <option value="waist">Abs</option>
	  <option value="upper legs">Quads</option>
	  <option value="cardio">Cardio</option>
	</select>
	  <div class="input-group-prepend">
  <button type="submit" id="submit-btn" class="btn btn-dark">Submit</button>
  </div>
  
	</div>
	</form>
	
	<select name="playlists" id="playlists" class="form-select selectPlaylist">
	 <option>Select a Playlist to add workouts to</option>
	</select>
	
	
	<div id="workout-container" class="row">
		
	</div>
</div>
    `;
}

export function init() {
	getBodyPart();
	getAllPlaylist();
}


function getBodyPart() {
	$("#submit-btn")
		.click(function () {
			let selectOption = $("#bodyParts :selected")
				.val();

			console.log(selectOption)

			fetch(`/api/workouts/findByBodyPart?bodyPart=${selectOption}`, {
				"method": "GET",
				"headers": {"Content-Type": "application/json"}
			})
				.then(response => {
					return (response.json());
				})
				.then(function (data) {
					appendAllWorkoutData(filterWorkoutObject(data));
				})
				.catch(err => {
					console.error(err);
				});

		})
}

function filterWorkoutObject(data) {
	let workoutObjArr = [];
	for (let i = 0; i < data.length; i++) {
		workoutObjArr.push(JSON.parse(data[i].workout))
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
	setWorkoutHoverEvent();
}


function setWorkoutHoverEvent() {
	const f = new Freezeframe(".gif", {trigger: "hover"});
	f.toggle()
}

function getWorkoutCard(workoutObj) {
	let workoutsCard = $(`<div class="card text-white bg-secondary col-lg-3 mb-2 mt-2 p-0"></div>`);
	workoutsCard.append(
		`<div class="workout-card">
      <div class="card-header name text-center">${workoutObj.name}</div>
      <img alt="" data-id="${workoutObj.gifUrl}" class="gif freezeFrame card-img-top" src="${workoutObj.gifUrl}">
      <div class="equipment text-center">Equipment: ${workoutObj.equipment}</div>
      <div class="target text-center">Target Muscle: ${workoutObj.target}</div>
      <button type="submit" data-id="${workoutObj.id}" class="workout-submit-btn btn btn-dark form-control">Add to Playlist</button>
      </div>`
	)
	return workoutsCard
}


function getAllPlaylist() {
	fetch(`/api/playlists/`, {
		"method": "GET",
		"headers": getHeaders()
	})
		.then(response => {
			return (response.json());
		})
		.then(function (data) {
			console.log(data)
			createOptions(data)
		})
		.catch(err => {
			console.error(err);
		});
}

function createOptions(data) {

	for (let i = 0; i < data.length; i++) {
		console.log(data);
		console.log(data[i].title)
		$(".selectPlaylist")
			.append(`
        <option class="playlist-choice" value="${data[i].id}">${data[i].title}</option>
        
`)
	}
}

function addWorkoutEvent() {

	$('.workout-submit-btn')
		.click(function (e) {
			let answer = confirm("Do you want to add this workout?")
			if(answer) {
				let playlistID = $("#playlists")
					.val();

				console.log("log");
				let selectedOptions = {
					title: $('#playlists')
						.find(":selected")
						.text(),
					id: playlistID,

					workouts: [
						{
							id: $(this)
								.data("id")
						}
					]
				}

				console.log(selectedOptions);

				let request = {
					method: "PUT",
					headers: getHeaders(),
					body: JSON.stringify(selectedOptions)
				}
				fetch(`/api/playlists/${playlistID}`, request)
					.then(res => {
						console.log(res.status)
						createView("/workouts")
					})
					.catch(error => {
						console.log(error);
						createView("/workouts")
					})
			}
		})
}

