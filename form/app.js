// Форма

document.getElementById('btn').addEventListener('click', validateForm);

function validateForm(e) {
    // Добавляем элементы формы в переменные
    const name = $('#name');    
    const phone = $('#phone');
    const email = $('#email');
    const text = $('#text');

    // Создаем RegExp для валидации введенных данных
    // для поля Имя
    const reName = /^[а-яa-z]{2,15}$/i;  

    // для поля Телефон
    const rePhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

    // для поля Email
    const reEmail = /^([a-z0-9]+[\-.]?[a-z0-9]+)@[a-z]{2,10}\.[a-z]{2,5}$/i;

    // для поля Комментарий    
    const reText = /.{1,200}/i;

    //Проверка, что поля Город и Дата рождения не пустые
    const cityName = $("#myCity"); 
    const dateOfBirth = $("#date-of-birth");
    validateNotEmpty(cityName);
    validateNotEmpty(dateOfBirth);

    // Делаем проверку введенных в форму данных
    validateItem(name, reName);
    validateItem(phone, rePhone);
    validateItem(email, reEmail);
    validateItem(text, reText);

    e.preventDefault();
}

function validateNotEmpty(element) {
    if(!element[0].value) {
        element.addClass('is-invalid');
        element.effect('bounce');
        callDialog(element);
    } else {
        element.removeClass('is-invalid')
    }
}

function validateItem(field, re) {
    if (!re.test(field[0].value)) {
        field.addClass('is-invalid');
        field.effect('bounce');
        callDialog(field);       
    } else {
        field.removeClass('is-invalid')
    }
}

function callDialog (el) {
    $("#diag-" + el[0].id).dialog({
        width: 300,
        height: 110,
        show: "slide",                   
        position: {
            my: "right",
            at: "right bottom",
            of: el
        }
    })  
};

$(function() {
    $('#date-of-birth').datepicker({
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            dateFormat: "dd.mm.yy",
            duration: "slow",
            showAnim: "clip"
    });

    $.ajax({
        url: 'data.json',             
        type : 'GET',
        dataType : 'json',                     
        success: function (data) {           
            let arr = [];
            for (let i = 0; i<data.length; i++) {
                arr.push(data[i].city);
            }

            $('#myCity').autocomplete({
                source: arr,
                minLength: 2
            })
        },
        error: function(){
             console.log('Ошибка загрузки данных');
        } 
    });
})    
