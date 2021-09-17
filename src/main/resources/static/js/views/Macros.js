export default function Macros(props) {
	return `
    <header>
    <h1>Calorie Calculator</h1>
    <link rel="stylesheet" href="/style/style.css">
</header>

<br>

    <form action="">
    <label for="Calorie Calculator">Calorie Calculator</label>
    
    <label for="age">Age</label>
    <input type="text" id="age" name="age">
    <label for="height">Height(cm)</label>
    <input type="text" id="height" name="height"
    <label for="weight">Weight(kg)</label>
    <input type="text" id="weight" name="weight">
    <select id="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>
    <select id="activity-level" name="activity-level">
        <option value="1">1: BMR</option>
        <option value="2">2: Sedentary: little to no exercise</option>
        <option value="3">3: Exercise 1-3 times/week</option>
        <option value="4">4: Exercise 4-5 times/week</option>
        <option value="5">5: Daily Exercise or intense exercise 3-4 times/week </option>
        <option value="6">6: Intense exercise 6-7 times/week </option>
        <option value="7">7: Very intense exercise daily, or physical job </option>
    </select>    
 	<select id="goals" name="goals">
 		<option value="maintain">Maintain Weight</option>
 		<option value="mildlose">Mild Weight Loss</option>
 		<option value="weightlose">Weight Loss</option>
 		<option value="extremelose">Extreme Weight Loss</option>
 		<option value="mildgain">Mild Weight Gain</option>	
 		<option value="weightgain">Weight gain</option>
 		<option value="extremegain">Extreme Weight Gain</option>
	</select>
 <button type="submit" class="submit-calorie-btn">Calculate Calories!</button>
</form>

<div id="macro-container" class="row">

</div>
    `
}


export function getCalories() {
	$(".submit-calorie-btn")
		.click(function () {
			let ageOption = $("#age")
				.val();
			let heightOption = $("#height")
				.val()
			let genderOption = $("#gender :selected")
				.val()
			let activityLevelOption = $("#activity-level :selected")
				.val()
			let weightOption = $("#weight")
				.val()
			let goalOption = $("#goals")
				.val()


			fetch(`https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${ageOption}&gender=${genderOption}&height=${heightOption}&weight=${weightOption}&activitylevel=${activityLevelOption}&goal=${goalOption}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
					"x-rapidapi-key": "14c61813b9msh668ee17878a077bp13699ejsn8ba42420bfe2"
				}
			})
				.then(response => {
					return (response.json());
				})
				.then(function (data) {
					console.log(data)
					alert(`Proper calorie intake should be: ${data.calorie} calories`)
				})
				.catch(err => {
					console.log(err)
				})

		})

}


