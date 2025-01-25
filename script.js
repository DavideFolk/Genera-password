'use strict';
let stringBase = 'abcdefghiklmnopqrstuvxyz';
let numeri = '123456789';
let stringMaiusc = 'ABCDEFGHIKLMNOPQRSTUVXYZ';
let caratteri = '!=%&$?-.,';
let password, rangeValue, stringFinale;

function generaPassword() {
	stringFinale = stringBase;
	rangeValue = $('#customRange').val();
	console.log(rangeValue);
	password = '';
	if ($('.numeri').is(':checked')) stringFinale += numeri;
	if ($('.maiusc').is(':checked')) stringFinale += stringMaiusc;
	if ($('.carattere').is(':checked')) stringFinale += caratteri;
	for (let i = 0; i < rangeValue; i++) {
		let num = Math.floor(Math.random() * stringFinale.length);
		password += stringFinale.at(num);
	}
	$('.passwordText').text(password);
	console.log(password);
}

/*
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
*/

$('.genera').click(function (e) {
	e.preventDefault();
	generaPassword();
});

// Slider dinamico
const slider = document.getElementById('customRange');
const sliderValue = document.getElementById('slider-value');
slider.addEventListener('input', (e) => {
	sliderValue.textContent = e.target.value;
});