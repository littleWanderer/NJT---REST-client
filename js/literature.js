/* LITERATURE */



function ulExists(id){
	var ul;
	if($(id).length == 0) {
	  		ul=document.createElement('ul');
		  	ul.setAttribute('class','row align-items-center');
		  	ul.setAttribute('id', 'ul-literature');
	  		$(ul).appendTo( $("#literature") );

		}

	  	else {
	  		ul=$(id);
	  	}

	  	return ul;

}


function createLiteratureElement(data, ul){

	var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 book');
	  		li.setAttribute('id','book-');
		   	li.innerHTML=`<div class="book-wrapper">
							   	<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
							   	<div class="book-upper">
							   		<img src="assets/images/cover.jpg">
									<div class="book-text">
							   			<h5>Name of book</h5>
							   			<h6>(Publication year)</h6>
									</div>
							   	</div>

							   	<div class="book-down">
						   			<h6>Authors / Name Surname</h6>
						   			<h6 class="tab">Name Surname</h6>
						   			<h6 class="tab">Name Surname</h6>
							   	</div>
								
						  	</div>

							`;
		   			
			$(li).appendTo($(ul));	
}

$(document).ready(function(){
	

	// return all literature

	const URLbooks="https://jsonplaceholder.typicode.com/users";
	//const URL="http://localhost:9000/literature/returnAll";
	$.ajax({
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

	    var ul=ulExists('#ul-literature');
	  	

		$.each(data, function( key, val ) {

	  		createLiteratureElement(data, ul);				

		}); 

	})


	//save book







})

	




