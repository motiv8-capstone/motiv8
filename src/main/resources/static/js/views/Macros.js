export default function Macros(props) {
    return `
    <header>
    <h1>Calculate Your Calories Yo!</h1>
</header>

<br>

    <form action="">
    <label for="Calorie Calculator">Track your Calorie!</label>
    
    <label for="age">Age</label>
    <input type="text" id="age" name="age">
    <label for="height">Height</label>
    <input type="text" id="height" name="height"
    <label for="weight">Weight</label>
    <input type="text" id="weight" name="weight">
    <select id="calorie-parameters" name="calorie-parameters"
        <option value="gender">Gender</option>
        <option value="activity level">Activity Level</option>
        <option value="goal">Goal</option>
    </select>    
 
 <button type="submit" class="submit-calorie-btn">Calculate Calories!</button>
</form>

<div id="calorie-calculator" class="row"></div>
    `
}


export function getCalories() {
    $(".submit-calorie-btn")
        .click(function () {
            let selectOption = $(".age :selected")
                .val();

            console.log(selectOption)

            fetch(`fitness-calculator.p.rapidapi.com/${selectOption}`,{
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
                "x-rapidapi-key": "14c61813b9msh668ee17878a077bp13699ejsn8ba42420bfe2"
            }
            })
                .then(response => {
                    return (response.json());
                })
                .then(function (data)){
                console.log(data)

            }
        })
}