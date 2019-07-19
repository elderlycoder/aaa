document.querySelectorAll('.modal-show').forEach(function(element){
    element.onclick = showModal;
});
function showModal(){ // показать модальное окно
    // <button class="modal-show" data-modal="#sign-in">Выберете город</button>
    let modalId = this.dataset.modal; // modalId присваивается значение - #sign-in
    // обращение к атрибуту data в JavaScript это делается через метод dataset. 
    //Само имя атрибута преобразовывается в переменную по следующим правилам: data- отбрасывается; 
    // любой дефис идущий перед буквой отбрасывается, а буква за ним становится заглавной.
    
    document.querySelector(modalId).classList.remove('hide'); //получаем элемент - модальное окно (по селектору #sign-id), затем удаляем стиль класс "hide" из списка классов модального окна
    document.querySelector(modalId).parentElement.classList.remove('hide'); // удаляем класс hide из списка стилей родителя модального окна (у обертки wrap)
    }

    document.querySelectorAll('.modal-close').forEach(function(element){
        element.onclick = closeModal;
    });
   
function closeModal(){ // скрыть модальное окно
    let modalId = this.dataset.modal;
    document.querySelectorAll(modalId).forEach(function(element){
        element.classList.add('hide');
        element.parentElement.classList.add('hide');
    });
//     document.querySelector(modalId).classList.add('hide'); // добавляем класс hide у модального окна
//     document.querySelector(modalId).parentElement.classList.add('hide'); // добавляем класс hide у родителя модального окна (у обертки wrap)
}
    // закрыть все модальные окна по нажатию Escape
    document.onkeydown = function (event){ // событие onkeypress на функциональных клавишах не работает
            if(event.keyCode == 27){
                document.querySelectorAll('.modal-wrap').forEach(function(element){
                    element.classList.add('hide');
                    element.children[0].classList.add('hide');
                })
            }
    }
 window.onclick = closeModal;
//function(e) {
//     if(e.target.classList.contains('modal-wrap')){
//         e.target.style.display = 'none';
//     }
// }
// ф-ия скрывает все блоки с чек-боксами
function init(){
    let tabBody = document.querySelectorAll('.tab-body')
    for (let i = 0; i<tabBody.length; i++){
        tabBody[i].style.display = 'none';
    }
}
init();

let tabs = document.querySelectorAll('.tab')
tabs.forEach(function(element){
    element.onclick = showTab;
});

function showTab(){
    let data = this.getAttribute('data');
    
    let tabBody = document.querySelectorAll('.tab-body')
    for (let i = 0; i<tabBody.length; i++){
        tabBody[i].style.display = 'none'; // снова делает блок не видимым после выбора другого
    };
    
    document.querySelector(`.tab-body[data="${data}"]`).style.display = 'block';
    //document.querySelector('.tab-body[data="'+data+'"').style.display = 'block';
}

let to = document.querySelector('.tab[data="1"]');
to.addEventListener('click', function(){
    document.querySelector('#vyvod').innerHTML = 'здесь сервисы по ТО';
})