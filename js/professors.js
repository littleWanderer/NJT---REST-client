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
	  		li.setAttribute('id','professor-'+data.id);
		   	li.innerHTML=`<div class="professor-wrapper front">
							   	<img src="assets/images/cover.jpg">
							   	<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
								
								<div class="professor-text">
									<img class="profile-img" src="assets/images/cover.jpg">
						   			
						   			<h5>${data.name} ${data.surname}</h5>
						   			<h6>${data.vocationEnum}</h6>
								</div>		   			
								
						  	</div>

							<div class="professor-wrapper back">
							   	<div class="contact-info">
							   		<i class="fas fa-envelope" aria-hidden="true"></i>
						   			<h6>${data.email}</h6>
							   	</div>
							   	<div class="contact-info">
							   	<i class="fas fa-phone" aria-hidden="true"></i>
						   		<h6>${data.phone}</h6>
						   		</div>
							   	<div class="contact-info">
							   	<i class="fas fa-graduation-cap" aria-hidden="true"></i>
							   	<h6>${data.departmentEntity.departmentName}</h6>
							   	</div>
									 	   			
							</div`;
		   			
			$(li).appendTo($(ul));	
}




$(document).ready(function(){


	// return all professors

	const URL="http://localhost:9005/teacher/returnAll";
	$.ajax({
	  headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
	  url : URL,
	  type: 'GET',
      dataType: 'json',

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

	  		createProfessorElement(data[key], ul);				

		}); 

	})






	// return all departments
	// populate depatments CB


	const URLdep="http://localhost:9005/department/returnAll";
	$.ajax({
	  headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
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
		localStorage.setItem('departments', JSON.stringify(data));
		console.log("data:", data);
        console.log("status:", status);
	    console.log("xhr:", xhr);

	  	// populate cb

	  	var $dropdown = $("#departmentCB");
		$.each(data, function(key, value) {

		    $dropdown.append($("<option />").val(data[key].id).text(data[key].departmentName));
		});
	   	

	});



	// save teacher
	const URLsaveTeacher="http://localhost:9005/teacher/save";

	$("#professor_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#teacher_name').val();
		var surname=$('#teacher_surname').val();
		var email=$('#email').val();
		var phone=$('#teacher_phone').val();
		var date=$('#hiring_date').val();

		var vocation=$('#vocationCB').find(":selected").text();
		var depId=$('#departmentCB').find(":selected").val();

		var jsonData = {};
		var department={};
		jsonData["name"]=name;
		jsonData["surname"]=surname;
		jsonData["email"]=email;
		jsonData["phone"]=phone;
		jsonData["dateOfHiring"]=date;
		jsonData["vocationEnum"]=vocation;

		var data=JSON.parse(localStorage.getItem('departments'));
		console.log(data);


		for (var i=0 ; i < data.length ; i++)
		{
		    if (data[i]["id"] == depId) {
		        jsonData["departmentEntity"]=data[i];
		    }
		}

		

		
		console.log(jsonData);

		$.ajax({
			headers: { 
			    'Accept': 'application/json',
			    'Content-Type': 'application/json' 
			  },
			  type: "POST",
			  url: URLsaveTeacher,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

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

	
	const URLdeleteTeacher="http://localhost:9005/teacher/delete/";
	$(".professors").on('click', '.delete_icon', function(){
		var id=$(this).parent().parent().attr('id').split('-')[1];

		var url=URLdeleteTeacher+id;
		$.ajax({
		  headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	      },
		  type: "DELETE",
		  url: url,

		  success: function(){
		  	var prof="#professor-"+id;
		  	$(prof).remove();

		  },
		  error: function(){
		  	console.log("error while deleting teacher");
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

	




