// Данные
const FLASK_CHILDREN_COUNT = 4,
    flaskContainer = document.querySelector('main'),
    resetButton = document.querySelector('.reset'),
    modal = document.querySelector('.modal');

let isFirstClick = true,
    preFlask,
    elementsToTransfer = [],
    includes = document.querySelectorAll('.include'),
    flasks = document.querySelectorAll('.flask'),
    colors = [
        'red', 'yellow', 'blue', 'green', 'pink',
        'red', 'yellow', 'blue', 'green', 'pink',
        'red', 'yellow', 'blue', 'green', 'pink',
        'red', 'yellow', 'blue', 'green', 'pink'
    ];

// Функция заполнения колб
function Completion() {
    includes.forEach(item => {
        Array.from(item.children).forEach(i => {
            let index = Math.floor(Math.random() * colors.length);
            while (colors[index] === 0) {
                index = Math.floor(Math.random() * colors.length);
            }
            i.style.backgroundColor = colors[index];
            colors.splice(index, 1);
        });
    });
}

// Логика переливания из первой коблы во вторую
const flaskContainerClickHandler = (e) => {
    const flask = e.target.closest('.flask');
    if (!flask) {
        return;
    }
    if (isFirstClick) {
        if (flask.children.length === 0) {
            isFirstClick = true;
            return;
        }
        flask.classList.add('active');
        flask.classList.remove('inactive');
        preFlask = flask;
        isFirstClick = !isFirstClick;
        elementsToTransfer = [];
        elementsToTransfer.push(flask.children[0]);
        Array.from(flask.children).forEach((i, index, arr) => {
            if (i.style.backgroundColor === arr[index - 1]?.style.backgroundColor && i.style.backgroundColor === arr[0].style.backgroundColor) {
                elementsToTransfer = arr.slice(0, index + 1);
            }
        });
    } else {
        if (preFlask.children.length === 0) {
            isFirstClick = true;
            return;
        }
        if (preFlask === flask) {
            preFlask.classList.add('inactive');
            preFlask.classList.remove('active');
            isFirstClick = !isFirstClick;
        }
        if (preFlask !== flask) {
            if (flask.children.length === 0 || flask.firstElementChild.style.backgroundColor === preFlask.firstElementChild.style.backgroundColor) {
                preFlask.classList.add('inactive');
                preFlask.classList.remove('active');
                isFirstClick = !isFirstClick;
                if (flask.children.length < FLASK_CHILDREN_COUNT) {
                    const placesToInsertCount = FLASK_CHILDREN_COUNT - flask.children.length;
                    elementsToTransfer = elementsToTransfer.slice(0, placesToInsertCount);
                    for (let i of elementsToTransfer) {
                        flask.insertAdjacentElement("afterbegin", i);
                    }
                }
                const isAllColbsComlited = Array.from(flasks)
                    .every(i => Array.from(i.children)
                        .every((i, index, arr) =>
                            i.style.backgroundColor === arr[0].style.backgroundColor && arr.length === FLASK_CHILDREN_COUNT));
                if (isAllColbsComlited) {
                    modal.classList.add('active');
                    setTimeout(() => {
                        modal.classList.remove('active');
                    }, 1000);
                }
            }
        }
    }
}
// Логика начала новой игры (Перезаполнение колб, сброс переменных и игрового поля)
const resetButtonClickHandler = () => {
    flaskContainer.innerHTML = `
        <div class="wrapper">
            <div class="flask include">
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
            </div>
            <div class="flask include">
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
            </div>
            <div class="flask include">
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
            </div>
            <div class="flask include">
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
            </div>
            <div class="flask include">
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
            </div>
            <div class="flask">

            </div>
            <div class="flask">

            </div>
        </div>`;
    includes = document.querySelectorAll('.include');
    flasks = document.querySelectorAll('.flask');
    isFirstClick = true;
    preFlask = null;
    elementsToTransfer = [];
    colors = [
        'red', 'yellow', 'blue', 'green', 'pink',
        'red', 'yellow', 'blue', 'green', 'pink',
        'red', 'yellow', 'blue', 'green', 'pink',
        'red', 'yellow', 'blue', 'green', 'pink'
    ];
    Completion();
}
// Функция инициализации (привязка обработчиков, вызов функции заполнение колб)
const init = () => {
    Completion();
    flaskContainer.addEventListener('click', flaskContainerClickHandler);
    resetButton.addEventListener('click', resetButtonClickHandler);
}

init();
