import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function Profile(props) {
    return `
        <header>
            <h1 class="text-center mb-5 mt-3">Profile Page</h1>
        </header>
        <main>
        <div class="container-fluid">
        <div class="input-group-lg">
        <form id="playlist-create">
        <input id="playlist-title" class="form-control" name="playlist-title" placeholder="Create a Playlist" type="text">  
        <div class="input-group-prepend">
        <button type="submit" id="playlist-create-btn" class="btn btn-dark">Create</button>
        </div>
        </form>
        </div>
       
         <div id="playlist-container" class="container row justify-between">
         
         </div>

              </div>
        </main>
    `;
}

export function playlistEvent(){
    createPlaylist()
    getUserPlaylists()
    deletePlaylist();
}


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


function appendAllPlaylistData(workoutArr) {
    workoutArr.forEach(function (obj) {
        $('#playlist-container')
            .append(getPlaylistCard(obj))
    })
    setWorkoutHoverEvent();
}


function getPlaylistCard(PlaylistObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
    console.log(workoutsCard)
    console.log(PlaylistObj)
    workoutsCard.append(
        `<img class="card-img-top" alt="" class="gif freezeFrame" src="${PlaylistObj.gifUrl}">
                    <div class="name">${PlaylistObj.name}</div>
                    <div class="bodypart">${PlaylistObj.bodyPart}</span>
                    <div class="equipment">${PlaylistObj.equipment}</div>
                    <div class="muscle">${PlaylistObj.target}</div>
                    <button class="delete-playlist-btn form-control btn-danger" data-id=${PlaylistObj.id}>Delete</button>
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

