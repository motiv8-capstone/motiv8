import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function Workouts(props) {
    return `
        <header>
            <h1>Workout Page</h1>
        </header>
 
  <form action="">
  <label for="body parts" class="font">Choose what you are looking to workout:</label>

<select name="bodyParts" id="bodyParts">
  <option value="shoulders">Shoulders</option>
  <option value="chest">Chest</option>
  <option value="upper arms">Arms</option>
  <option value="back">Back</option>
  <option value="abs">Abs</option>
  <option value="quads">Quads</option>
</select>
<button type="submit" id="submit-btn">Submit</button>
</form>
<select name="playlists" id="playlists" class="selectPlaylist"></select>
<div id="workout-container" class="row">
    
</div>

    `;
}

export function init() {
    getBodyPart();
}


function getBodyPart() {
    $("#submit-btn")
        .click(function () {
            let selectOption = $("#bodyParts :selected")
                .val();

            console.log(selectOption)

            fetch(`http://localhost:8080/api/workouts/findByBodyPart?bodyPart=${selectOption}`, {
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
    getAllPlaylist();
}


function setWorkoutHoverEvent() {
    const f = new Freezeframe(".gif", {trigger: "hover"});
    f.toggle()
}

function getWorkoutCard(workoutObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
    workoutsCard.append(
        `<div class="workout-card"><form>
      <input class="card-header body-part" value="${workoutObj.bodyPart}" readonly>${workoutObj.bodyPart}</input>
      <input class="id" value="${workoutObj.id}" readonly>${workoutObj.id}</input>
      <input class="name" value="${workoutObj.name}"  readonly>${workoutObj.name}</input>
      <input class="equipment" value="${workoutObj.equipment}" readonly>${workoutObj.equipment} </input>
      <input class="target" value="${workoutObj.target}" readonly>${workoutObj.target} </input>
      <img alt="" data-id="${workoutObj.gifUrl}" class="gif freezeFrame" src="${workoutObj.gifUrl}">
      <button type="submit" data-id="${workoutObj.id}" class="workout-submit-btn">Select</button></form></div>
     
      `
    )
    return workoutsCard
}


function getAllPlaylist(){
    fetch(`http://localhost:8080/api/playlists/`, {
        "method": "GET",
        "headers": getHeaders()
    })
        .then(response => {
            return (response.json());
        })
        .then(function (data){
            console.log(data)
            createOptions(data)
        })
        .catch(err => {
            console.error(err);
        });
}

function createOptions(data){

    for (let i = 0; i < data.length; i++){
        console.log(data);
        console.log(data[i].title)
        $(".selectPlaylist").append(`
        <option class="playlist-choice" value=${data[i].id}>${data[i].title}</option>
        
`)}}

function addWorkoutEvent() {

    $('.workout-submit-btn')
        .click(function (e) {
            // let workoutID = $(this).data("id");
            // console.log(workoutID);

            let playlistID = $("#playlists").val();

            let selectedOptions = {
                title: $('#playlists').find(":selected").text(),
                id: playlistID,

                workouts: [
                    {
                        id: $(this).data("id")
                    }
                ]
            }

            console.log(selectedOptions);

            let request = {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(selectedOptions)
            }
            fetch(`http://localhost:8080/api/playlists`, request)
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


