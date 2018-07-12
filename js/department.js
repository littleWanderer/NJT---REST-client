/*   DEPARTMENT    */


function ulExists(id){
	var ul;
	if($(id).length == 0) {
	  		ul=document.createElement('ul');
		  	ul.setAttribute('class','row align-items-center');
		  	ul.setAttribute('id','ul-departments');
	  		$(ul).appendTo( $("#departments") );

		}

	  	else {
	  		ul=$(id);
	  	}

	  	return ul;

}



function createDepartmentElement(key, val, ul){

	var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 department');
	  		li.setAttribute('id','department-'+key);
		   	li.innerHTML=`<div class="department-wrapper">
							   	<img src="assets/images/cover.jpg">
							   	<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
								<i class="edit_icon"></i>
								<div class="department-text">
						   			<h5>${key}</h5>
								</div>
						  
		   			</div`;
		   			
			$(li).appendTo($(ul));	
}



$(document).ready(function(){
	
	
	const URL="https://jsonplaceholder.typicode.com/users";
	//const URL="http://localhost:9000/department/returnAll";
	$.ajax({
	  url : URL,
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

	    var ul=ulExists('#ul-departments');
	  	

		$.each( data, function( key, val ) {

	  		createDepartmentElement(key, val, ul);				

		}); 

	})
	 

	// save department
	const URLsaveDepartment="http://localhost:9000/department/save";

	$("#department_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#dep_name').val();
		
		var jsonData = {};
		jsonData["departmentName"]=name;
		
		console.log(jsonData);

		$.ajax({
			  type: "POST",
			  url: URLsaveDepartment,
			  dataType: "json",
			  data: jsonData,

			  success: function(data){ //mora se vratiti generisani kljuc

			  	var form=document.getElementById('department_form');
			  	form.reset();
	  			var ul=ulExists('#ul-departments');
	  			createDepartmentElement(data.id, name, ul);
			  		
			  },
			  error: function(){
			  	console.log("error while deleting department");
			  }



		});



	});


	// delete department

	// /departement/delete/{id}


	const URLdeleteDepartment="http://localhost:9000/departement/delete/";
	$(".departments").on('click', '.delete_icon', function(){
		var id=$(this).parent.attr('id').split('-')[1];

		$.ajax({
		  type: "DELETE",
		  url: URLsaveDepartment+id,
		  data: {
		      "id": id
		    },

		  success: function(){
		  	var dep="departement-"+id;
		  	$(dep).remove();
		  },
		  error: function(){
		  	console.log("error while deleting department");
		  }

		});




	});









});

