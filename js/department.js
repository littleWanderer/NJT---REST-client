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



function createDepartmentElement(data, name, ul){
	
	if(name==""){
		name=data.departmentName;
	}

	var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 department');
	  		li.setAttribute('id', "department-"+data.id);
		   	li.innerHTML=`<div class="department-wrapper">
							   	<img src="assets/images/cover.jpg">
							   	<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
								<i class="edit_icon far fa-edit" id=${data.id} data-toggle="modal" data-target="#add_department_modal"></i>
								<div class="department-text" >
						   			<h5 id="department-name-${data.id}" class="dep-name">${name}</h5>
								</div>
						  
		   			</div`;
		   			
			$(li).appendTo($(ul));	
}



$(document).ready(function(){

	var token=sessionStorage.getItem('token');
	console.log(token);
	
	// returnAll

	const URL="http://localhost:9005/department/returnAll";
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
	  
		$.each(data, function( key, val ) {
	  		createDepartmentElement(data[key], "", ul);				

		}); 

	})
	 



	// get invoker of modal

	
	$(document).on('shown.bs.modal','.modal', function (e) {
	  	var invoker = $(e.relatedTarget);
	  	if(invoker.is("i")){
	  		var id= invoker.attr('id');
			console.log(id);
		    $(".label-name").attr('id', id);
		    $("#dep_name").val($(".dep-name").text());
	  	}
		
    });


	// save/update department

	const URLsaveDepartment="http://localhost:9005/department/save";

	$("#department_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#dep_name').val();
		
		var jsonData = {};
		jsonData["departmentName"]=name;
		jsonData["token"]=token;
		
		var $update = $('.label-name[id]');
		var length=$update.length;
		if(length) {
			jsonData["id"]=$update.attr('id');
		}

		console.log(jsonData);

		$.ajax({
			  headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
    		  },
			  type: "POST",
			  url: URLsaveDepartment,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

			  success: function(data){ //mora se vratiti generisani kljuc

			  	
			  	if(!length){
			  		var ul=ulExists('#ul-departments');
	  				createDepartmentElement(data, name, ul);
			  		
			  	}

			  	else{
			  		$('.dep-name').text($('#dep_name').val());
			  	}
	  			

	  			var form=document.getElementById('department_form');
			  	form.reset();

			  },
			  error: function(){
			  	console.log("error while saving department");
			  }



		});



	});


	// delete department

	const URLdeleteDepartment="http://localhost:9005/department/delete/";
	$(".departments").on('click', '.delete_icon', function(){
		var id=$(this).parent().parent().attr('id').split('-')[1];

		
		var url=URLdeleteDepartment+id;
		console.log(url);

		$.ajax({
		  headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
    	  },
		  type: "DELETE",
		  url: url,

		  success: function(){
		  	var dep="#department-"+id;
		  	$(dep).remove();
		  },
		  error: function(){
		  	console.log("error while deleting department");
		  }

		});




	});


});




