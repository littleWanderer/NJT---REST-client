/* LOGIN */

$(document).ready(function(){


	const URLlogin="http://localhost:9005/user/login";

	$("#login-form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var user=$('#username').val().trim();
		var pass=$('#password').val().trim();

		
		var jsonData = {};
		jsonData["username"]=user;
		jsonData["password"]=pass;
		
		console.log(jsonData);

		$.ajax({
			  headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
    		  },
			  type: "POST",
			  url: URLlogin,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

			  success: function(data){ //mora se vratiti generisani kljuc

			  	var form=document.getElementById('login-form');
			  	form.reset();


			  	sessionStorage.setItem('token', data.token);

	  			window.location.href = "home.html";
			  		
			  },
			  error: function(){
			  	alert('Error!');
			  }



		});



	});




})