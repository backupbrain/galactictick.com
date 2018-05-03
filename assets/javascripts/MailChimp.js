function MailChimpForm() {
	this.animationSpeed_ms = 600; // 0.6s
}

MailChimpForm.prototype.init = function(sectionID) {
	var section = $("#"+sectionID);
	var form = section.find("form");

	var emailError = section.find(".email_error");
	var transmissionError = section.find(".transmission_error");

	var defaultSection = section.find(".default");
	var thankYouSection = section.find(".message_sent");

	emailError.slideUp(this.animationSpeed_ms);
	transmissionError.slideUp(this.animationSpeed_ms);


	form.submit(function(event) {
		event.preventDefault();

		transmissionError.slideUp(this.animationSpeed_ms);
		emailError.slideUp(this.animationSpeed_ms);
		
		var action = $(this).attr("json-action");

		var data = form.serialize();

		console.log(action);
		console.log(data);

		$.ajax({
			url: action,
			method: "GET", 
			data: data,
			crossDomain: true,
			success: function(response) {
				console.log(response);
				console.log("newsletter subscribed");
				if (response.result == "success") {
					defaultSection.slideUp(this.animationSpeed_ms);
					thankYouSection.slideDown(this.animationSpeed_ms);
				} else {
					emailError.slideDown(this.animationSpeed_ms);
				}

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus+": "+errorThrown);
				transmissionError.slideDown(this.animationSpeed_ms);
			},
			dataType: "json"
		});
		

	});


	
}
