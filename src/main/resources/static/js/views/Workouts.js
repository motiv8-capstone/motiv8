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

// function showGif() {
//     console.log("in show")
//     $('.gif').style.visibility = 'visible';
// }

function setWorkoutHoverEvent() {
    // console.log($(".name"))
    // console.log($(".gif"))
    // $(".name").hover(function () {
    //     $(this).siblings(".gif").css("display", "block")
    // }, function () {
    //     $(this).siblings(".gif").css("display", "none")
    // })
    $(".gif").css("display", "block");
    const f = new Freezeframe(".gif", {trigger: "hover"});
    f.toggle()
}

function getWorkoutCard(workoutObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
    console.log(workoutObj.id);
    workoutsCard.append(
        `<div class="workout-card"><form>
      <input class="card-header body-part" value="${workoutObj.bodyPart}" readonly>${workoutObj.bodyPart}</input>
      <input class="id" value="${workoutObj.id}" readonly>${workoutObj.id}</input>
      <input class="name" value="${workoutObj.name}"  readonly>${workoutObj.name}</input>
      <input class="equipment" value="${workoutObj.equipment}" readonly>${workoutObj.equipment} </input>
      <input class="target" value="${workoutObj.target}" readonly>${workoutObj.target} </input>
      <select name="rating" class="rating">
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
      </select>
      <img alt="" data-id="${workoutObj.gifUrl}" class="gif freezeFrame" src="${workoutObj.gifUrl}" style="display:none">
      <button type="submit" class="workout-submit-btn">Select</button></form></div>
      <select name="playlists" class="selectPlaylist"></select>
      `
    )
    return workoutsCard
}


function addWorkoutEvent() {

    $('.workout-submit-btn').click(function (e) {

        let selectedWorkout = {
            bodyPart: $(".body-part").val(),
            equipment: $(".equipment").val(),
            gif_url: $(".gif").attr('src').toString(),
            name: $(".name").val(),
            primary_muscle: $(".target").val(),
            rating: $(".rating :selected").val()
        }
        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(selectedWorkout)
        }
        fetch("http://localhost:8080/api/playlists", request)
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

function getAllPlaylist(){
    fetch(`http://localhost:8080/api/playlists/`, {
        "method": "GET",
        "headers": {"Content-Type": "application/json"}
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
        $(".selectPlaylist").append(`
        <option class="playlist-choice" value={data[i].id}>${data[i].title}</option>
`)}getIDs()}

//create function that listens for click of select button
//grab id of playlist selected
//grab id of workout from which we selected playlist $(this).parent
//call function that injects workout id into playlist id

function getIDs(){
    $('.workout-submit-btn').click(function (){
        let workoutID = $(".id").val;
        console.log(workoutID);
        let playlistID = $(".playlist-choice").val();
        console.log(playlistID);
    })
}
