;(function( $, window, document, undefined ) {

	'use strict';

	var Cirro				= window.Cirro || {},
			$document   = $( document ),
			$window 		= $( window );

	$document.on('ready page:load', function(){
		globals.documentReady();
	});

	var globals = {
		documentReady: function(){
			var self = this;

			// Variables
			self.$html             = $('html');
			self.$body             = $('body');
			self.$document         = $document;
			self.$window           = $window;
			self.$navToggle        = $('#navicon-button');
			self.$modal            = $('.modal-link');
			self.$checkbox         = $('.globalCheck');
			self.$accordionBtn     = $('.accordion > dt > a');
			self.$accordionContent = $('.accordion > dd');
			self.$alert						 = $('div.alert');

			self.modalInit();
			self.accordionAutoOpen();
			self.navInit();
			//self.flashMessage();
			self.alertDismissal();

			self.$navToggle.on('click', self.navToggle);
			self.$checkbox.on('click', self.checkboxDictator);
			//self.$body.on('click', '.alert', self.closeFlashMessage);
			$('body').on('click', '.accordion > dt > a', self.accordionActivate);
		},

		alertDismissal: function() {
			$(".alert").alert();
		},

		navInit: function(){
			globals.$html.removeClass('nav-active');
		},// /navInit

		navToggle: function() {
			if ( globals.$html.hasClass('nav-active') ) {
				globals.$html.removeClass('nav-active');
				return;
			}
			globals.$html.addClass('nav-active');
		},

		// Global init for modals
		modalInit: function() {
			globals.$modal.each(function() {
				$(this).magnificPopup({
					//delegate: 'a',
				  type:'inline',
				  //midClick: true
				  alignTop: true
				});

			})
		},

		// Check or un-check all the minion checkboxes in a table
		checkboxDictator: function() {
			var $this = $(this);
			$this.closest('table').find('td input:checkbox').prop('checked', this.checked);
		},

		// Open slides that are meant to be auto opened
		accordionAutoOpen: function() {
			globals.$accordionBtn.each(function() {
				if ( $(this).hasClass('open') ) {
					$(this).parent().next().slideDown();
				}
			}) 
		},

		// Method called by click event to activate accordion actions
		accordionActivate: function(e) {
			e.preventDefault();
			var $this = $(this);

			if ( $this.hasClass('open') ) {
				$this.removeClass('open');
				$this.parent().next().slideUp(200);
				$this.parent().next().removeClass('open');
				return false;
			}

			$this.addClass('open');
	    $this.parent().next().slideDown(200);
	    $this.parent().next().addClass('open');
	    return false;
		},

		showAjaxMessage: function(msg, type){
			$("#flash-message").html("<div id='flash-#{type}'>#{msg}</div>");
  		globals.flashMessage();
		},

		flashMessage: function() {
			if( globals.$alert.length == 0 ) {return;}
			globals.$alert.addClass('visible');
			setTimeout(function() {
				globals.closeFlashMessage();
			}, 5000)
		},

		closeFlashMessage: function() {
			globals.$alert.removeClass('visible');
			setTimeout(function() {
				globals.$alert.remove();
			}, 6000)
		}

	};

	// Attach the object controller to the Cirro namespace
	Cirro.globals = globals;

})( jQuery, window, document);