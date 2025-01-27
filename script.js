'use strict';
let stringBase = 'abcdefghiklmnopqrstuvxyz';
let numeri = '123456789';
let stringMaiusc = 'ABCDEFGHIKLMNOPQRSTUVXYZ';
let caratteri = '!=%&$?-.,';
let password, rangeValue, stringFinale, passPrecedente;
let savedPass = [];

function generaPassword() {
	stringFinale = stringBase;
	rangeValue = $('#customRange').val();
	password = '';
	if ($('.numeri').is(':checked')) stringFinale += numeri;
	if ($('.maiusc').is(':checked')) stringFinale += stringMaiusc;
	if ($('.carattere').is(':checked')) stringFinale += caratteri;
	for (let i = 0; i < rangeValue; i++) {
		let num = Math.floor(Math.random() * stringFinale.length);
		password += stringFinale.at(num);
	}

	$('.passwordText').text(password);
}

// Slider dinamico
$(document).on('input', '#customRange', function () {
	rangeValue = $('#customRange').val();
	$('#slider-value').text(rangeValue);
});

// pulsante genera
$('.genera').click(function (e) {
	e.preventDefault();
	generaPassword();
	$('.save-btn').removeClass('invisible');
});

// copia pass appunti
$('.passwordText').click(function (e) {
	e.preventDefault();

	password = $('.passwordText').text();
	if (password !== '*************' && password != passPrecedente) {

		// Usa l'API Clipboard per copiare il testo
		navigator.clipboard.writeText(password)
			.catch((err) => {
				console.error('Errore:', err);
			});

		// Mostra l'alert con effetto di fade-in
		$('#update-alert')
			.removeClass('invisible')
			.fadeIn()
			.find('span')
			.text('Password copiata!');

		// Nascondi l'alert dopo 2 secondi
		setTimeout(function () {
			$('#update-alert').fadeOut(function () {
				$(this).addClass('invisible');
			});
		}, 2000);
	}

	passPrecedente = password;
});

// Gestione click sull'icona di salvataggio
$('.save-btn').on('click', function () {
	password = $('.passwordText').text();
	if (!savedPass.includes(password)) savedPass.push(password);

	// Mostra l'alert
	$('#update-alert')
		.removeClass('invisible')
		.fadeIn()
		.find('span')
		.text('Password salvata!');

	// Nascondi l'alert dopo 2 secondi
	setTimeout(function () {
		$('#update-alert').fadeOut(function () {
			$(this).addClass('invisible');
		});
	}, 2000);
});

$('#modal_button').on('click', function () {

	// Svuota il contenitore per evitare duplicati
	$("#passwordList").empty();

	// Aggiungi ogni password come elemento <p>
	savedPass.forEach(password => {
		$("#passwordList").append(`<p class="text-gray-200">${password}</p>`);
	});
});

