/* PROFESSORS */


function ulExists(id){
	var ul;
	if($(id).length == 0) {
	  		ul=document.createElement('ul');
		  	ul.setAttribute('class','row align-items-center');
		  	ul.setAttribute('id', 'ul-professors');
	  		$(ul).appendTo( $("#professors") );

		}

	  	else {
	  		ul=$(id);
	  	}

	  	return ul;

}



function createProfessorElement(data, ul){

	var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 professor');
	  		li.setAttribute('id','professor-');
		   	li.innerHTML=`<div class="professor-wrapper front">
							   	<img src="assets/images/cover.jpg">
							   	<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
								
								<div class="professor-text">
									<img class="profile-img" src="assets/images/cover.jpg">
						   			
						   			<h5>Name Surname</h5>
						   			<h6>Vocation</h6>
								</div>		   			
								
						  	</div>

							<div class="professor-wrapper back">
							   	<div class="contact-info">
							   		<i class="fas fa-envelope" aria-hidden="true"></i>
						   			<h6>Email</h6>
							   	</div>
							   	<div class="contact-info">
							   	<i class="fas fa-phone" aria-hidden="true"></i>
						   		<h6>Phone</h6>
						   		</div>
							   	<div class="contact-info">
							   	<i class="fas fa-graduation-cap" aria-hidden="true"></i>
							   	<h6>Department</h6>
							   	</div>
									 	   			
							</div`;
		   			
			$(li).appendTo($(ul));	
}




$(document).ready(function(){


	// return all professors

	const URLprof="https://jsonplaceholder.typicode.com/users";
	//const URL="http://localhost:9000/teacher/returnAll";
	$.ajax({
	  url : URLprof,
	  type: 'GET',
      dataType: 'json',
      crossOrigin: true,
      crossDomain: true,

	   error: function(xhr, status, errorThrown){
	            console.log("xhr:", xhr);
	            console.log("status:", status);
	            console.log("error:", errorThrown);
	    }
	})
	.then(function(data, status, xhr){
		console.log("data:", data);
        console.log("status:", status);
	    console.log("xhr:", xhr);

	    var ul=ulExists('#ul-professors');
	  	

		$.each( data, function( key, val ) {

	  		createProfessorElement(data, ul);				

		}); 

	})


	// return all departments
	// populate depatments CB


	const URLdep="https://jsonplaceholder.typicode.com/users";
	//const URL="http://localhost:9000/department/returnAll";
	$.ajax({
	  url : URLdep,
	  type: 'GET',
      dataType: 'json',
      crossOrigin: true,
      crossDomain: true,

	   error: function(xhr, status, errorThrown){
	            console.log("xhr:", xhr);
	            console.log("status:", status);
	            console.log("error:", errorThrown);


	    }


	})
	.then(function(data, status, xhr){
		console.log("data:", data);
        console.log("status:", status);
	    console.log("xhr:", xhr);

	  	// populate cb

	  	var $dropdown = $("#departmentCB");
		$.each(data, function() {
			//value should be department id
		    $dropdown.append($("<option />").val(1).text("kk"));
		});
	   	

	});



	// save department
	const URLsaveTeacher="http://localhost:9000/teacher/save";

	$("#professor_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#teacher_name').val();
		var surname=$('#teacher_surname').val();
		var email=$('#email').val();
		var phone=$('#teacher_phone').val();
		var date=$('#hiring_date').val();

		var vocation=$('#vocationCB').find(":selected").text();
		var dep=$('#departmentCB').find(":selected").val();

		
		var jsonData = {};
		jsonData["name"]=name;
		jsonData["surname"]=surname;
		jsonData["email"]=email;
		jsonData["phone"]=phone;
		jsonData["dateOfHiring"]=date;
		jsonData["vocation"]=vocation;
		jsonData["department_Id"]=dep;


		console.log(jsonData);

		$.ajax({
			  type: "POST",
			  url: URLsaveDepartment,
			  dataType: "json",
			  data: jsonData,

			  success: function(data){ //mora se vratiti generisani kljuc

			  	var form=document.getElementById('professor_form');
			  	form.reset();
	  			var ul=ulExists('#ul-professors');
	  			createProfessorElement(data, ul);
			  		
			  },
			  error: function(){
			  	console.log("error while deleting department");
			  }



		});



	});


	// delete teacher

	
	const URLdeleteTeacher="http://localhost:9000/teacher/delete/";
	$(".professors").on('click', '.delete_icon', function(){
		var id=$(this).parent.attr('id').split('-')[1];

		$.ajax({
		  type: "DELETE",
		  url: URLdeleteTeacher+id,
		  data: {
		      "id": id
		    },

		  success: function(){
		  	var prof="professor-"+id;
		  	$(prof).remove();
		  },
		  error: function(){
		  	console.log("error while deleting department");
		  }

		});




	});



	// flipping professor card

	$(".professors").on('click','.professor', function(){

		console.log('clicked');
		var $card = $(this);
	    if ($card.hasClass("professor-flipped")) {
	    	$(this).find('.front').css('display', 'block');
	    	$(this).find('.back').css('display', 'none');
	        $card.removeClass('professor-flipped');
	    } else {
	    	$(this).find('.front').css('display', 'none');
	    	$(this).find('.back').css('display', 'block');
	        $card.addClass('professor-flipped');
	    }

	});



})

	




