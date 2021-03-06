import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function Profile(props) {
	return `
<main>
                  <header>
                            <h1 class="text-center mt-2">Profile</h1>
                        </header>
         <div class="container py-5">
         <div class="jumbotron text-white jumbotron-image shadow" style="background-image: url(https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80);">
         </div>
         </div>
            <div class="container">
                    <div class="row flex-xl-nowrap">
                       
                    </div>
                    <div class="row flex-xl-nowrap">
                        
                       
                        
                    </div>
                    <div class="input-group mb-3">                   
                            <input id="playlist-title" class="form-control" name="playlist-title" type="text">                 
                               <div class="input-group-prepend">
                           <button type="submit" id="playlist-create-btn" class="btn btn-dark">Create Playlist</button>
                            </div>                        
                    </div>
                    <div class="input-group mb-3">
                            <select name="playlistDelete" id="playlistsDelete" class="form-select selectPlaylist">
                           </select>
                           <div class="input-group-prepend">
                           <button type="submit" id="playlist-to-delete" class="btn btn-dark">Delete Playlist</button>
                            </div>
                  </div>
                  <h2>Your Playlists:</h2>
                  <br>
                  <div id="all-playlist" class="row">
                        
               </div>
                  <div id="playlist-title-container" class="container-fluid row justify-between">
                  
               </div>
               
                
         </div>
        </main>
    `;
}

export function playlistEvent() {
	createPlaylist()
	getUserPlaylists()
}


function getAllPlaylistsButtons(data) {
	for (let i = 0; i < data.length; i++) {
		// console.log(data[i])
		$('#all-playlist')
			.append(`<button type="button" value="${data[i].id}" id="playlist-btn" class="btn btn-dark text-white col-3">${data[i].title}</button>`)
	}
	getWorkoutsByID()
}

function getWorkoutsByID() {
	$(".btn")
		.click(function () {
			let id = $(this)
				.val();
			$('#playlist-title-container')
				.empty();


			fetch(`/api/playlists/${id}`, {
				"method": "GET",
				"headers": getHeaders()
			})
				.then(response => {
					return (response.json());
				})
				.then(function (data) {
					// console.log(data)
					appendAllPlaylistData(data)
				})
				.catch(err => {
					console.error(err);
				});

		})
}


function appendAllPlaylistData(playlist) {
	let playlistArr = [];
	for (let i = 0; i < playlist.workouts.length; i++) {
		playlistArr.push(JSON.parse(playlist.workouts[i].workout));
		$('#playlist-title-container')
			.append(`
            <div class="card text-white bg-secondary col-lg-3 mb-2 mt-2 p-0">
                    <div class="card-header name text-center">${playlistArr[i].name}</div>
                    <img class="card-img-top" alt="" class="gif freezeFrame" src="${playlistArr[i].gifUrl}">    
                    <div class="bodypart text-center">Bodypart: ${playlistArr[i].bodyPart}</div>
                    <div class="equipment text-center">Equipment Needed: ${playlistArr[i].equipment}</div>
                    <div class="target text-center">Target Area: ${playlistArr[i].target}</div>
                    <button class="delete-workout-btn btn btn-danger" value="${playlist.id}" data-id="${playlist.workouts[i].id}">Remove from Playlist</button>
            </div>
      `);
	}
	setWorkoutHoverEvent();
	deleteWorkout();
}

function setWorkoutHoverEvent() {
	const f = new Freezeframe(".gif", {trigger: "hover"});
	f.toggle()
}


function getUserPlaylists() {
	fetch(`/api/playlists/`, {
		"method": "GET",
		"headers": getHeaders()
	})
		.then(response => {
			return (response.json());
		})
		.then(function (data) {
			getAllPlaylistsButtons(data);
			playlistOptions(data);
		})
		.catch(err => {
			console.error(err);
		});
}

function deleteWorkout() {
	$(".delete-workout-btn")
		.click(function () {
			let request = {
				method: "DELETE",
				headers: getHeaders(),
			}
			let workoutId = $(this)
				.attr("data-id");
			let playlistId = $(this)
				.val();
			console.log("Workout Id: " + workoutId);
			console.log("Playlist Id: " + playlistId);

			fetch(`/api/workouts/${playlistId}?workoutID=${workoutId}`, request)
				.then(res => {
					console.log(res.status);
					createView("/profile")
				})
				.catch(error => {
					console.log(error);
					createView("/profile")
				});

		})
}

export function createPlaylist() {
	$("#playlist-create-btn")
		.click(function () {
			console.log("log");

			let playlistTitle = $("#playlist-title")
				.val();

			let playlistObj = {
				title: playlistTitle
			}

			console.log(playlistTitle)

			let request = {
				method: "POST",
				headers: getHeaders(),
				body: JSON.stringify(playlistObj)
			};

			fetch("/api/playlists", request)
				.then((response) => {
					console.log(response.status)
				})
				.catch(error => {
					console.log(error)
				})
		})
}

function playlistOptions(data) {

	for (let i = 0; i < data.length; i++) {
		$(".selectPlaylist")
			.append(`
        <option class="playlist-delete" value="${data[i].id}">${data[i].title}</option>
        
`)
	}
	deletePlaylist();
}

function deletePlaylist() {
	$("#playlist-to-delete")
		.click(function () {
			let request = {
				method: "DELETE",
				headers: getHeaders(),
			}
			let selectedOption = $('#playlistsDelete')
				.find(":selected")
				.val();

			fetch(`/api/playlists/${selectedOption}`, request)
				.then(res => {
					console.log(res.status);
					createView("/profile")
				})
				.catch(error => {
					console.log(error);
					createView("/profile")
				});

		})
}