export default function Macros(props) {
	return `
		<header>
			<h1>Calculate Your Calories Yo!</h1>
			<link rel="stylesheet" href="/style/style.css">
		</header>
		
		</br>
		
		<section class="vh-100">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-6 text-black">
						<div class="px-5 ms-xl-4">
							<i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
							<span class="h1 fw-bold mb-0"><img src="https://i.pinimg.com/564x/32/ee/9d/32ee9dbc5df08a254e90bbefe2a9d194.jpg" alt="Logo" width="100" height="100"> </span>
						</div>
						<div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
							<form style="width: 23rem;">
								<h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Track your Calories!</h3>
							 
								 <div class="form-outline mb-4">
									<input type="text" id="age" class="form-control form-control-lg" />
									<label class="form-label" for="age">Age</label>
								</div>
		
								<div class="form-outline mb-4">
									<input type="text" id="height" class="form-control form-control-lg" />
									<label class="form-label" for="height">Height</label>
								</div>
		
								<div class="form-outline mb-4">
									<input type="text" id="weight" class="form-control form-control-lg" />
									<label class="form-label" for="weight">Weight</label>
								</div>
								
								<div class="form-group col-md-12">
									<label for="inputState">Gender</label>
										<select id="genderSelect" class="form-control">
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
								</div>
								
								<div class="form-group col-md-12">
									<label for="inputState">Activity Level</label>
										<select id="activity-level" class="form-control">
											<option value="1">1: BMR</option>
											<option value="2">2: Sedentary: little to no exercise</option>
											<option value="3">3: Exercise 1-3 times/week</option>
											<option value="4">4: Exercise 4-5 times/week</option>
											<option value="5">5: Daily Exercise or intense exercise 3-4 times/week </option>
											<option value="6">6: Intense exercise 6-7 times/week </option>
											<option value="7">7: Very intense exercise daily, or physical job </option>
										</select>
								</div>
								
								<div class="form-group col-md-12">
									<label for="inputState">Goals</label>
										<select id="goals" class="form-control">
											<option value="maintain">Maintain Weight</option>
											<option value="mildlose">Mild Weight Loss</option>
											<option value="weightlose">Weight Loss</option>
											<option value="extremelose">Extreme Weight Loss</option>
											<option value="mildgain">Mild Weight Gain</option>	
											<option value="weightgain">Weight gain</option>
											<option value="extremegain">Extreme Weight Gain</option>
										</select>
								</div>
								
								<div class="pt-1 mb-4">
									<button id="submit-calorie-btn" class="btn btn-info btn-lg btn-block" type="button">Calculate Calories!</button>
								</div>
								
								<div class="col-sm-6 px-0 d-none d-sm-block">
									<img src="https://media.istockphoto.com/photos/gym-in-focus-picture-id1130504588?k=20&m=1130504588&s=612x612&w=0&h=RqbNHvdcXJpLozUbgnj5RJkfw7rVw_lb6CarG2ZrjEw=" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>   
`
}

		export function getCalories() {
			$("#submit-calorie-btn")
				.click(function () {
					let ageOption = $("#age")
						.val();
					let heightOption = $("#height")
						.val()
					let genderOption = $("#genderSelect")
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