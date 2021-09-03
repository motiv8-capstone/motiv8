export default function Workouts(props) {
    return `
        <header>
            <h1>Workout Page</h1>
        </header>
        <main>
            <div>
               <form>
  <label for="body parts">Choose what you are looking to workout:</label>

<select name=“bodyParts" id=“bodyParts”>
  <option value=“shoulders">Shoulders</option>
  <option value=“chest">Chest/option>
  <option value=“biceps">Biceps</option>
  <option value=“triceps">Triceps</option>
  <option value=“back">Back</option>
  <option value=“abs">Abs</option>
  <option value=“quads">Quads</option>
  <option value=“hammies">Hammies</option>
  <option value=“ass">Ass</option>
  <option value=“caffs">Caffs</option>
</select>
</form>
            </div>
        </main>
    `;
}

// function getBodyPart() {
//     $('.submit-btn').click(function () {
//         let bodyPart = {bodyPart: $(this).siblings(())}
//     })
// }