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
							   		<h6>Full-time Prof. </h6>
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


	





})
