var galacticTickWebsite;
$(document).ready(function() {
	galacticTickWebsite = new GalacticTickWebsite();
    mailChimpForm = new MailChimpForm();
    mailChimpForm.init("stayinformed");


    contactForm = new ContactForm();
    contactForm.init("contact", "","");

});




$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
