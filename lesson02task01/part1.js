// 1. формируем запрос - составляем URL с правильными параметрами

var result1 = 'success';
var result2 = 'error';

var url = "http://localhost/lesson02task01/" + result2 + ".json";

// 2. отправляем запрос - выполняем асинхонных запрос к составленному URL
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.send();

// 3. работа программы продолжается
// 4. ответ на наш запрос - ловим в коллбек функции
xhr.onreadystatechange = function(){	
	if ((xhr.readyState == 4) && (xhr.status == 200)) {						
			var result = JSON.parse(xhr.responseText);
			(result.result == 'success') ? console.log('Успех') : console.log('Ошибка');
		}				
	// console.log("Результат - " + result.result);			
};

// 5. парсим ответ и обновляем страничку на клиенте с учетом новых полученных данных
