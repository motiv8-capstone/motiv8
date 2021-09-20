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
        
            <div id="playlist">

                
            </div>
        </main>
    `;
}

function playlistEvent(){
    getPlaylists();
    deletePlaylist();
    createPlaylist()
}


function getPlaylists(playlist) {
    for (let i = 0; i < playlist.length; i++) {

        $('#playlist').append(`
      
                <div class="playlist">
                    <span class="name">${playlist[i].name}</span>
                    <span class="bodypart">${playlist[i].bodyPart}</span>
                    <span class="equipment">${playlist[i].equipment}</span>
                    <span class="muscle">${playlist[i].primary_muscle}</span>
                    <span class="gif">${playlist[i].gif_url}</span>
                    <span class="rating">${playlist[i].rating}</span>
                    <div>
                    </div>
                    <button class="delete-playlist-btn" data-id=${playlist.id}>Delete</button>
        </div>
                
    `)
    }
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

