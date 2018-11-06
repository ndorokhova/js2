// Форма

document.getElementById('btn').addEventListener('click', validateForm);

function validateForm(e) {
    // Добавляем элементы формы в переменные
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const text = document.getElementById('text');

    // Создаем RegExp для валидации введенных данных
    // для поля Имя
    const reName = /^[а-яa-z]{2,15}$/i;  

    // для поля Телефон
    const rePhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

    // для поля Email
    const reEmail = /^([a-z0-9]+[\-.]?[a-z0-9]+)@[a-z]{2,10}\.[a-z]{2,5}$/i;

    // для поля Комментарий    
    const reText = /.{1,200}/i;

    // Делаем проверку введенных в форму данных
    validateItem(name, reName);
    validateItem(phone, rePhone);
    validateItem(email, reEmail);
    validateItem(text, reText);

    e.preventDefault();
}

function validateItem(field, re) {
    if (!re.test(field.value)) {
        field.classList.add('is-invalid');
    } else {
        field.classList.remove('is-invalid')
    }
}

$.ajax({
    url: 'data.json',             
    type : 'GET',
    dataType : 'json',                     
    success: function (data) {      
        for (let i = 0; i<data.length; i++) {
            $('#city').append('<option>' + data[i].city + '</option>');
        }    	
	},
	error: function(){
		console.log('Ошибка загрузки данных');
	} 
    });  