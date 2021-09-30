export default function Macros(props) {
	return `
      <header>
         <link rel="stylesheet" href="/style/style.css">
      </header>
     
      <section class="vh-100">
         <div class="container-fluid">
            <div class="row">
               <div class="col-sm-6 text-black">
                  <div class="px-5 ms-xl-4">
                     <i class="fas fa-crow fa-2x pt-3 mt-xl-4" style="color: #709085;"></i>
                     
                  </div>
                  <div class="d-flex align-items-start px-5 ms-xl-4 pt-5 pt-xl-0 mt-xl-n5">
                     <form style="width: 23rem;">
                        <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Track your Calories!</h3>
                      
                         <div class="form-outline mb-4">
                           <input type="text" id="age" class="form-control form-control-lg" />
                           <label class="form-label" for="age">Age</label>
                        </div>
      
                        <div class="form-outline mb-4">
                        <p>Height:</p>
                           <input type="text" id="feet" class="form-control form-control-lg" />
                           <label class="form-label" for="feet">Ft.</label>
                           <input type="text" id="inches" class="form-control form-control-lg" />
                           <label class="form-label" for="inches">In.</label>
                        </div>
      
                        <div class="form-outline mb-4">
                      	   <label class="form-label" for="weight">Weight</label>
                           <input type="text" id="weight" class="form-control form-control-lg" /><p>lbs.</p>                    
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
                              <select id="activity-level" class="form-select">
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
                              <select id="goals" class="form-select">
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
                        
                        
                     </form>
                        
                  </div>
                  
               
               </div>
               <div class="col-sm-6 px-0 d-none d-sm-block">
                           <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
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

			let feet = $('#feet').val() * 30.48;
			let inches = $('#inches').val()  * 2.54;

			let heightOption = feet + inches;

			let genderOption = $("#genderSelect")
				.val()
			let activityLevelOption = $("#activity-level :selected")
				.val()


			let weightOption = $("#weight").val() / 2.205;

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
					alert(`Proper calorie intake to reach your goal should be: ${Math.round(data.calorie)} calories per day`)
				})
				.catch(err => {
					console.log(err)
				})
		})
}

