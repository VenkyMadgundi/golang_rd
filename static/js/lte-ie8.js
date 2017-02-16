$(function() {
	var curDate = new Date();
	//console.log('Patching IE... ('+curDate.toLocaleString()+')');

	$('.accordion .content').css({ 'borderWidth':'1px', 'borderStyle':'solid', 'borderColor':'rgb(155, 155, 155)' });
	$('.accordion label').css({ 'borderWidth':'1px', 'borderStyle':'solid', 'borderColor':'rgb(155, 155, 155)', 'border-bottom-width':'0px' });
	$('.accordion label').click(function(event) { event.preventDefault();		
		if ($('#' + $(this).attr('for')).attr('type') == "checkbox") {
			if ($('#' + $(this).attr('for')).is(':checked')) 
				$('#' + $(this).attr('for')).removeAttr('checked');
			else
				$('#' + $(this).attr('for')).attr('checked', 'checked');

			$(this).toggleClass('accordionChecked')
			checkboxFix($('#' + $(this).attr('for')));
		}else{
			if (!$('#' + $(this).attr('for')).attr('checked'))
				radiobuttonsFix($('#' + $(this).attr('for')));
		}
		//console.log($(this).attr('class'));
	});

	$('.accordion input[type="checkbox"], .accordion input[type="radio"]').each(function(index) {
    	if ($(this).is(":checked")) {
			var tempHeight = ($(this).parent().find('.content').css({"height" : "auto"}).height()) - 20;
	  		$(this).parent().find('.content').css({"height" : "0px"}).animate({ 'height':tempHeight+'px' }, 600);
	  		$(this).parent().find('label').addClass('accordionChecked')
	  	}
	});

	$('.accordion input[type="checkbox"]').change( checkboxFix($(this)) );
	$('.accordion input[type="radio"]').change( radiobuttonsFix($(this)) );

	curDate = new Date();
	//console.log('Now IE Compatible ('+curDate.toLocaleString()+')');
});

function checkboxFix(self) {
	if (self.is(":checked")) {
		var tempHeight = (self.parent().find('.content').css({"height" : "auto"}).height()) - 20;
		self.parent().find('.content').css({"height" : "0px"}).animate({ 'height':tempHeight+'px' }, 600);
	}else{
		self.parent().find('.content').animate({ 'height':'0px' }, 600);
	}
}

function radiobuttonsFix(self) {
	self.parent().parent().find("input[type='radio']").each(function() { 
		$(this).removeAttr('checked');
		$(this).parent().find('.content').animate({ 'height':'0px' }, 600); 
		$(this).parent().find('label').removeClass('accordionChecked');
	});
	self.attr('checked', 'checked');
	self.parent().parent().find("input[type='radio']").each(function() {
		if (self.is(":checked")) {
			var tempHeight = (self.parent().find('.content').css({"height" : "auto"}).height()) - 20;
	 		self.parent().find('.content').css({"height" : "0px"}).animate({ 'height':tempHeight+'px' }, 600, function() { self.parent().find('label').addClass('accordionChecked'); });
		}else{
			self.parent().find('.content').animate({ 'height':'0px' }, 600);
		}
	});	
}