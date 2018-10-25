const imgBig = document.querySelector('.img-big');
const imgPreview = document.querySelector('.img-preview');

// Получаем с сервера данные из json файла
parseConfigFile();

function parseConfigFile() {
    let xhr = new XMLHttpRequest();     
    let resultArr; 

    xhr.open('GET', "http://localhost/lesson02task02/gallery.json");    
        
    // onload или onreadystatechange    
    xhr.onload = function() {
        if(this.status === 200) {
            resultArr = JSON.parse(this.responseText);

            // Загружаем превьюшки
            loadPreview(resultArr);

        } else {
            console.log('Failed')
        }        
    }
    xhr.send();    
}

function loadPreview(data) {
    // console.log(data);    
    for(let i = 0; i<data.length; i++) {
        let img = document.createElement('img');
        img.classList.add('img-small');

        // Задаем атрибут src
        img.src = data[i].preview;

        // Сохраняем в свой атрибут full-img данные пути для большой картинки (full)
        img.setAttribute('full-img', data[i].full);

        // Добавляем маленькие картинки на страницу
        imgPreview.appendChild(img);  
       
        // Добавляем событие клик на маленькие картинки
        img.addEventListener('click', openFullImg);        
    }    
}

function openFullImg(e) {
    // Вытаскиваем из атрибута full-img данные пути для большой картинки
    let fullImgURL = e.target.getAttribute('full-img');

    let img = document.createElement('img');
    img.src = fullImgURL;
    
    // Очищаем div для большой картинки
    imgBig.innerHTML = '';
    imgBig.appendChild(img);    
}

