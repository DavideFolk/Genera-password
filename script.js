'use strict';

let stringBase = 'abcdefghiklmnopqrstuvxyz';
let numeri = '123456789';
let stringMaiusc = 'ABCDEFGHIKLMNOPQRSTUVXYZ';
let caratteri = '!=%&$?-.,';
let password, rangeValue, stringFinale, passPrecedente;
let jsonPass = {
    saved: []
};

// Recupero file json se presente
if (localStorage.getItem("jsonFile")) {
    jsonPass = JSON.parse(localStorage.getItem("jsonFile"));
}

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

function saveFileJson() {
    localStorage.setItem("jsonFile", JSON.stringify(jsonPass));
}

function generateAlert(text) {
    $('#update-alert')
        .removeClass('invisible')
        .fadeIn()
        .find('span')
        .text(text);
        
    setTimeout(function () {
        $('#update-alert').fadeOut(function () {
            $(this).addClass('invisible');
        });
    }, 2000);
}

function refreshListModal() {
    $("#passwordList").empty();
    
    jsonPass.saved.forEach((password, index) => {
        const passwordElement = $(`
            <div class="flex items-center justify-between bg-gray-800 p-3 rounded mb-2">
                <p class="text-gray-200 text-xl password-text">${password}</p>
                <button class="text-red-500 hover:text-red-700 delete-button" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        `);
        
        // Aggiungi il click handler direttamente all'elemento
        passwordElement.find('.delete-button').on('click', function() {
            const indexToRemove = $(this).data('index');
            jsonPass.saved.splice(indexToRemove, 1);
            saveFileJson();
            refreshListModal();
            generateAlert('Password eliminata!');
        });
        
        // Aggiungi il click handler per copiare la password
        passwordElement.find('.password-text').on('click', function() {
            const passwordToCopy = $(this).text();
            navigator.clipboard.writeText(passwordToCopy)
                .then(() => generateAlert('Password copiata!'))
                .catch(err => console.error('Errore:', err));
        });
        
        $("#passwordList").append(passwordElement);
    });
}

// Event Listeners
$(document).ready(function() {
    // Slider dinamico
    $('#customRange').on('input', function() {
        $('#slider-value').text($(this).val());
    });

    // Pulsante genera
    $('#genera').click(function(e) {
        e.preventDefault();
        generaPassword();
        $('.save-btn').removeClass('invisible');
    });

    // Copia password negli appunti
    $('.passwordText').click(function(e) {
        e.preventDefault();
        const currentPassword = $(this).text();
        if (currentPassword !== '*************' && currentPassword !== passPrecedente) {
            navigator.clipboard.writeText(currentPassword)
                .then(() => generateAlert('Password copiata!'))
                .catch(err => console.error('Errore:', err));
        }
        passPrecedente = currentPassword;
    });

    // Salvataggio password
    $('.save-btn').on('click', function() {
        const passwordToSave = $('.passwordText').text();
        if (!jsonPass.saved.includes(passwordToSave)) {
            jsonPass.saved.push(passwordToSave);
            saveFileJson();
            generateAlert('Password salvata!');
        } else {
            generateAlert('Password già salvata!');
        }
    });

    // Modal
    $('#modal_button').on('click', refreshListModal);
});