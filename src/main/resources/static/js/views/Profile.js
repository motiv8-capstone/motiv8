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
        <div id="all-playlist"></div>
        <div id="daddy-container">
            <div id="playlist-title-container">
                <div id="playlist-container" class="container row justify-between"></div>
            </div>
        </div>     
        </main>
    `;
}

export function playlistEvent(){
    createPlaylist()
    getUserPlaylists()
}


function getAllPlaylistsButtons(data) {
    console.log(data)
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
            $('#playlist-container').empty();



            fetch(`http://localhost:8080/api/playlists/${id}`, {
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

    for(let i = 0; i < playlist.workouts.length; i++){

        $('#playlist-title-container')
            .append(playlist.title);

        playlistArr.push(JSON.parse(playlist.workouts[i].workout));

        $('#playlist-container').append(
            `<img class="card-img-top" alt="" class="gif freezeFrame" src="${playlistArr[i].gifUrl}">
                    <div class="name">${playlistArr[i].name}</div>
                    <div class="bodypart">${playlistArr[i].bodyPart}</span>
                    <div class="equipment">${playlistArr[i].equipment}</div>
                    <div class="muscle">${playlistArr[i].target}</div>
                    <button class="delete-playlist-btn btn-danger" data-id=${playlistArr[i].id}>Delete</button>
      `)
    }
    setWorkoutHoverEvent();
}




function getPlaylistCard(PlaylistObj) {
    let workoutsCard = $(`<div class="card col-lg-3 px-3 mb-2 mt-2"></div>`);
    // console.log(PlaylistObj);
    workoutsCard.append(
        `<img class="card-img-top" alt="" class="gif freezeFrame" src="${PlaylistObj.gifUrl}">
                    <div class="name">${PlaylistObj.name}</div>
                    <div class="bodypart">${PlaylistObj.bodyPart}</span>
                    <div class="equipment">${PlaylistObj.equipment}</div>
                    <div class="muscle">${PlaylistObj.target}</div>
                    <button class="delete-playlist-btn btn-danger" data-id=${PlaylistObj.id}>Delete</button>
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