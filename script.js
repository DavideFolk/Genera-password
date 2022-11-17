'use strict';
let stringBase = 'abcdefghiklmnopqrstuvxyz';
let numeri = '123456789';
let stringMaiusc = 'ABCDEFGHIKLMNOPQRSTUVXYZ';
let caratteri = '!=%&$?-.,';
let rangeValue = $('#customRange').val();
let password;

function generaPassword() {
	let stringFinale = stringBase;
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

$(document).on('input', '#customRange', function () {
	rangeValue = $('#customRange').val();
	let rangeExample = ''.padStart(rangeValue, '*');
	$('.passwordText').text(rangeExample);
	$('#testoOpzioni').text(`${rangeValue} caratteri`);
	$('#testoOpzioni').show();
	setTimeout(() => {
		$('#testoOpzioni').fadeOut(1000);
	}, 2000);
});

$('.genera').click(function (e) {
	e.preventDefault();
	generaPassword();
});
