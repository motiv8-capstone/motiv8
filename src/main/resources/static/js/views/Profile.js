import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function Profile(props) {
    return `
        <header>
            <h1>Profile Page</h1>
        </header>
        <main>
        <div>
        <form id="playlist-create">
            <label for="playlist-title">Playlist Name</label>
            <input id="playlist-title" name="playlist-title" type="text">
            <button type="button" id="playlist-create-btn">Create Playlist</button>
        </form>
        </div>
        
            <div id="playlist-container" class="card col-lg-3 px-3 mb-2 mt-2">
            
            
            
        </div>

             
        </main>
    `;
}

export function playlistEvent(){
    createPlaylist()
    getUserPlaylists()
    deletePlaylist();
}


// function getPlaylists(data) {
//
//     for (let i = 0; i < data.length; i++) {
//         for(let j = 0; j < data[i].workouts.length; j++){
//         $('#playlist').append(`
//
//
//
//     `)
//             console.log(data[i].workouts[j].workout.name)
//     }}
//
// }

function filterWorkoutObject(data) {
    console.log(data)
    let playlistObjArr = [];
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        for (let j = 0; j < data[i].workouts.length; j++){
            console.log(data[i].workouts[j])
        playlistObjArr.push(JSON.parse(data[i].workouts[j].workout))
    }}
    return playlistObjArr;
}


// const iterate = (obj) => {
//     Object.keys(obj).forEach(key => {
//
//         console.log(`key: ${key}, value: ${obj[key]}`)
//
//         if (typeof obj[key] === 'object') {
//             iterate(obj[key])
//         }
//     })
// }



function appendAllPlaylistData(workoutArr) {
    workoutArr.forEach(function (obj) {
        $('#playlist-container')
            .append(getPlaylistCard(obj))
    })
}


function getPlaylistCard(PlaylistObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
    console.log(workoutsCard)
    console.log(PlaylistObj)
    workoutsCard.append(
        `<img alt="" data-id="${workoutObj.gifUrl}" class="gif freezeFrame" src="${workoutObj.gifUrl}">
         <div class="card name">${PlaylistObj.name}</div>
         <div class="card-body">
                    <span class="name">${PlaylistObj.name}</span>
                    <span class="bodypart">${PlaylistObj.bodyPart}</span>
                    <span class="equipment">${PlaylistObj.equipment}</span>
                    <span class="muscle">${PlaylistObj.target}</span>
                    <span class="gif">${PlaylistObj.gifUrl}</span>
                    <div>
                    </div>
                    <button class="delete-playlist-btn" data-id=${PlaylistObj.id}>Delete</button>
        </div>
     
      `
    )
    return workoutsCard
}

function setWorkoutHoverEvent() {
    const f = new Freezeframe(".gif", {trigger: "hover"});
    f.toggle()
}


function getUserPlaylists(){
    fetch(`http://localhost:8080/api/playlists/`, {
        "method": "GET",
        "headers": getHeaders()
    })
        .then(response => {
            return (response.json());
        })
        .then(function (data){
            console.log(data)
            appendAllPlaylistData(filterWorkoutObject(data))
        })
        .catch(err => {
            console.error(err);
        });
}

function deletePlaylist() {
    $(".delete-playlist-btn").click(function (){
        let request = {
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
        }
        let id = $(this).attr("data-id");


        fetch(`http://localhost:8080/api/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView("/profile")
            }).catch(error => {
            console.log(error);
            createView("/profile")
        });

    })
}
export function createPlaylist(){
    console.log("createPlaylist triggered")
    $("#playlist-create-btn").click(function(){

        let playlistTitle = $("#playlist-title").val();

        let playlistObj = {
            title: playlistTitle
        }

        console.log(playlistTitle)

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(playlistObj)
        };

        fetch("http://localhost:8080/api/playlists", request)
            .then((response) => {
                console.log(response.status)
            })
            .catch(error => {
                console.log(error)
            })
    })
}

