import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function Profile(props) {
    return `
<main>
            <div class="container-fluid">
                    <div class="row flex-xl-nowrap">
                        <header>
                            <h1>Profile Page</h1>
                        </header>
                    </div>
                    <div class="row flex-xl-nowrap">
                        
                        <div id="all-playlist" class="col-sm bd-sidebar"></div>
                        
                    </div>
                        <div class="row flex-xl-nowrap">
                            <div class="col-6">
                            <form id="playlist-create">
                                <label for="playlist-title">Playlist Name</label>
                                <input id="playlist-title" name="playlist-title" type="text">
                                <button type="button" id="playlist-create-btn">Create Playlist</button>
                            </form>
                            </div>
                        </div>
                        <div id="playlist-title-container" class="container row justify-between"></div>
                
            </div>
        </main>
    `;
}

export function playlistEvent(){
    createPlaylist()
    getUserPlaylists()
}


function getAllPlaylistsButtons(data) {
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        $('#all-playlist')
            .append(`<button type="button" value="${data[i].id}" id="playlist-btn" class="btn btn-link">${data[i].title}</button>`)
    }
    getWorkoutsByID()
}

function getWorkoutsByID(){
    $(".btn")
        .click(function () {
            let id = $(this).val();
            $('#playlist-title-container').empty();



            fetch(`/api/playlists/${id}`, {
                "method": "GET",
                "headers": getHeaders()
            })
                .then(response => {
                    return (response.json());
                })
                .then(function (data){
                    // console.log(data)
                    appendAllPlaylistData(data)
                })
                .catch(err => {
                    console.error(err);
                });

        })}



function appendAllPlaylistData(playlist) {
    let playlistArr=[];
    $('#playlist-title-container')
        .append(playlist.title);


    for(let i = 0; i < playlist.workouts.length; i++){
        playlistArr.push(JSON.parse(playlist.workouts[i].workout));
        $('#playlist-title-container')
            .append(`
            <div class="card text-white bg-secondary col-lg-3 mb-2 mt-2 p-0">
                    <div class="card-header name text-center">${playlistArr[i].name}</div>
                    <img class="card-img-top" alt="" class="gif freezeFrame" src="${playlistArr[i].gifUrl}">    
                    <div class="bodypart text-center">Bodypart: ${playlistArr[i].bodyPart}</div>
                    <div class="equipment text-center">Equipment Needed: ${playlistArr[i].equipment}</div>
                    <div class="target text-center">Target Area: ${playlistArr[i].target}</div>
                    <button class="delete-playlist-btn btn-danger" value="${playlist.id}" data-id=${playlist.workouts[i].id}>Delete</button>
            </div>
      `);
    }
    setWorkoutHoverEvent();
    deletePlaylist();
}




// function getPlaylistCard(PlaylistObj) {
//     let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
//     // console.log(PlaylistObj);
//     workoutsCard.append(
//         `<img class="card-img-top" alt="" class="gif freezeFrame" src="${PlaylistObj.gifUrl}">
//                     <div class="name">${PlaylistObj.name}</div>
//                     <div class="bodypart">${PlaylistObj.bodyPart}</span>
//                     <div class="equipment">${PlaylistObj.equipment}</div>
//                     <div class="muscle">${PlaylistObj.target}</div>
//                     <button class="delete-playlist-btn btn-danger" data-id=${PlaylistObj.id}>Delete</button>
//       `
//     )
//     return workoutsCard
// }


function setWorkoutHoverEvent() {
    const f = new Freezeframe(".gif", {trigger: "hover"});
    f.toggle()
}


function getUserPlaylists(){
    fetch(`/api/playlists/`, {
        "method": "GET",
        "headers": getHeaders()
    })
        .then(response => {
            return (response.json());
        })
        .then(function (data){
            // console.log(data)
            getAllPlaylistsButtons(data)
        })
        .catch(err => {
            console.error(err);
        });
}

function deletePlaylist() {
    $(".delete-playlist-btn").click(function (){
        let request = {
            method: "DELETE",
            headers: getHeaders(),
        }
        let workoutId = $(this).attr("data-id");
        let playlistId = $(this).val();
        console.log("Workout Id: " + workoutId);
        console.log("Playlist Id: " + playlistId);

        fetch(`/api/playlists/${playlistId}?workoutID=${workoutId}`, request)
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

        fetch("/api/playlists", request)
            .then((response) => {
                console.log(response.status)
            })
            .catch(error => {
                console.log(error)
            })
    })
}