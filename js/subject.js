/* SUBJECTS */

function ulExists(id){
	var ul;
	if($(id).length == 0) {
	  		ul=document.createElement('ul');
		  	ul.setAttribute('class','row align-items-center');
		  	ul.setAttribute('id', 'ul-subject');
	  		$(ul).appendTo( $("#subjects") );

		}

	  	else {
	  		ul=$(id);
	  	}

	  	return ul;

}


function createSubjectElement(data, ul){

	var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 subject');
	  		li.setAttribute('id','book-'+data.id);
		   	li.innerHTML=`<div class="subject-wrapper">
							   	<div class="subject-upper">
							   		<i class="fas fa-graduation-cap fa-3x" aria-hidden="true" ></i>
							   		<h5>${data.name}</h5>
							   	</div>

							   	<div class="subject-down">
						   			<h6>ECTS: ${data.ects}</h6>
						   			
							   	</div>
								
						  	</div>

							`;
		   			
			$(li).appendTo($(ul));	
}

$(document).ready(function(){
	
	// return all literature 

	const URLbooks="http://localhost:9005/literature/returnAll";
	$.ajax({
	  headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	  },
	  url : URLbooks,
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

	    localStorage.setItem('literature', JSON.stringify(data));


	  	var $dropdown = $(".literatureCB");
		$.each(data, function(key, value) {

		    $dropdown.append($("<option />").val(data[key].id).text(data[key].name));
		});

	})



	//return all professors

	 

	const URLprofs="http://localhost:9005/teacher/returnAll";
	$.ajax({
	  headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	  },
	  url : URLprofs,
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

	    localStorage.setItem('professors-subj', JSON.stringify(data));


	  	var $dropdown = $(".professorCB");
		$.each(data, function(key, value) {

		    $dropdown.append($("<option />").val(data[key].id).text(data[key].name+" "+data[key].surname));
		});

	})


	// return all subjects

	const URLsubjects="http://localhost:9005/subject/returnAll";
	$.ajax({
	   headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
	  },
	  url : URLsubjects,
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

	    var ul=ulExists('#ul-subject');
	  	
		$.each(data, function( key, val ) {

	  		createSubjectElement(data[key], ul);				

		}); 

	});


	//save subject


	const URLsaveSubj="http://localhost:9005/subject/save";

	$("#subject_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#subject_name').val();
		var ects=$('#ects').val();

		
		

		var jsonData = {};
		var profs=[];
		var lit=[];

		jsonData["name"]=name;
		jsonData["ects"]=ects;

		
		

		jsonData["teacherEntities"]=profs;
		jsonData["literatureEntities"]=lit;



		console.log(jsonData);

		$.ajax({
			headers: { 
			    'Accept': 'application/json',
			    'Content-Type': 'application/json' 
			  },
			  type: "POST",
			  url: URLsaveSubj,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

			  success: function(data){ //mora se vratiti generisani kljuc

			  	var form=document.getElementById('subject_form');
			  	form.reset();

	  			var ul=ulExists('#ul-subjects');
	  			createLiteratureElement(data, ul);
			  		
			  },
			  error: function(){
			  	console.log("error while saving literature");
			  }



		});



	});





})
