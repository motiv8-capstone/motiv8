import createView from "../createView.js";


export default function Profile(props) {
    return `
        <header>
            <h1>Profile Page</h1>
        </header>
        <main>
            <div id="playlist">
                <p>
                    This is your Profile page.
                </p>    
                ${getPlaylists}
            </div>
        </main>
    `;
}

export function playlistEvent(){
    deletePlaylist();
}


function getPlaylists(playlist) {
    for (let i = 0; i < playlist.length; i++) {

        $('#playlist').append(`
      
                <div class="playlist">
                    <span class="name">${playlist.name}</span>
                    <span class="bodypart">${playlist.bodyPart}</span>
                    <span class="equipment">${playlist.equipment}</span>
                    <span class="muscle">${playlist.primary_muscle}</span>
                    <span class="gif">${playlist.gif_url}</span>
                    <span class="rating">${playlist.rating}</span>
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