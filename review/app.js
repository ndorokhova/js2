let currentMaxId = 0;

const Api = {
    load: 'http://localhost/review/review.list.json',
    // add: '', при добалении отзыва не отправляю никуда запрос
    remove: 'http://localhost/review/review.delete.json'
};

$(request(Api.load));

function request(url, data) {
    $.get({
        url: url,
        data: data,
        dataType: 'json',
        success: function (response) {
            switch (url) {
                case Api.load:
                    processLoad(response);
                    break;
                case Api.remove:
                    processRemove(response, data);
                    break;
            }
        },
        error: function (error) {
            console.log(error);
        }
    });    
};

function processLoad(data) {
    data.forEach(function (item) {
        if (item.status) {
            render(item.reviewId, item.userId, item.text);
            if (item.reviewId > currentMaxId) {
                currentMaxId = item.reviewId; 
            }
        } else {
            render(item.reviewId, '', 'Не удалось загрузить отзыв');
        }
    });    
    $('#review-list').on('click', onRemove);
};

function processRemove(response, data) {    
    if (response.status) {
        $('#' + data).remove();
    } else {
        $('#' + data).append('<p>Невозможно удалить отзыв</p>')
    }
}

function onRemove(event) {   
        if (event.target.classList.contains('remove-btn')) {         
        let currentItemId = event.target.parentElement.id;
        request(Api.remove, currentItemId);    
    } 
}

function render(id, user, text) {
    $('#review-list').append(`
        <div id = 'review-${id}'>
        <span>${id}</span>
        <span>${user}</span>
        <p>${text}</p>
        </div>
    `);
    if (user) {
        $(`#review-${id}`).append('<a href="#" class="remove-btn button">Удалить отзыв</a>')
    }
};

$('#add-review').on('click', addReview);

function addReview() {
    let name = $('#name')[0].value;
    let text = $('#text')[0].value;
    if (name && text) {
        render(++currentMaxId, name, text);
    } else {
        $('#new-review').append('<p>Заполните поля Имя и Текст</p>');
    }    
}