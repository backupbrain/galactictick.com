function ContactForm() {
	this.animationSpeed_ms = 600; // 0.6s
}

ContactForm.prototype.init = function(sectionID, apiKey, apiPassword) {
	var section = $("#"+sectionID);
	var form = section.find("form");

	var transmissionError = section.find(".transmission_error");

	var defaultSection = section.find(".default");
	var thankYouSection = section.find(".message_sent");

	transmissionError.slideUp(this.animationSpeed_ms);

	form.submit(function(event) {
		event.preventDefault();

		var action = $(this).attr("action");

		var from_name = section.find("#contact_name").val();
		var from_email = section.find("#contact_email").val();
		var from_subject = section.find("#contact_subject").val();
		var from_message = section.find("#contact_message").val();

		var jsondata = {
			"name": from_name,
			"email": from_email,
			"subject": from_subject,
			"message": from_message
		}

		var data = JSON.stringify(jsondata);

		$.ajax({
			url: action,
			method: "PUT", 
			crossDomain: true,
			data: data,
			//username: apiKey,
			//password: apiPassword,
			crossDomain: true,
			success: function(response) {
				console.log(response);
				defaultSection.slideUp(this.animationSpeed_ms);
				thankYouSection.slideDown(this.animationSpeed_ms);
				/*
				console.log("message sent");
				if (data.result == "success") {
				} else {
					emailError.slideDown(this.animationSpeed_ms);
				}
				*/


			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
				transmissionError.slideDown(this.animationSpeed_ms);

  				console.log(jqXHR.getAllResponseHeaders());
			},
			dataType: "json",
			jsonp: false
		});

	});

	
}
