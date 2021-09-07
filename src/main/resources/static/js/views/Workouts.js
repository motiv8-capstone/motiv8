export default function Workouts(props) {
	return `
        <header>
            <h1>Workout Page</h1>
        </header>
        <main>
            <div>
               <form action="">
  <label for="body parts">Choose what you are looking to workout:</label>

<select name="bodyParts" id="bodyParts">
  <option value=“shoulders">Shoulders</option>
  <option value=“chest">Chest</option>
  <option value=“biceps">Biceps</option>
  <option value=“triceps">Triceps</option>
  <option value=“back">Back</option>
  <option value=“abs">Abs</option>
  <option value=“quads">Quads</option>
  <option value=“hammies">Hammies</option>
  <option value=“ass">Ass</option>
  <option value=“caffs">Caffs</option>
</select>
<button id="submit-btn">Submit</button>
</form>
            </div>
        </main>
    `;
}

export function PostEvent() {
	getBodyPart();
}





function getBodyPart() {
	$("#submit-btn").click(function () {
			let selectOption = $("#bodyParts :selected")
				.val();


			fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectOption}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "exercisedb.p.rapidapi.com",
					"x-rapidapi-key": "0fda1c2912msh4a1299d685685e4p139959jsn8a0fbfe6c5a1"
				}
			})
				.then(response => {
					console.log(response);
				})
				.catch(err => {
					console.error(err);
				});

		})


}