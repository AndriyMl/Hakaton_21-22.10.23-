function openFileExplorer() {
    const fileInput = document.getElementById('photoUpload');
    fileInput.click();
}

function loadImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = ''; 
    }
}

const savedNumber = localStorage.getItem('savedNumber');
        const savedDescription = localStorage.getItem('savedDescription');
        const savedImage = localStorage.getItem('savedImage');

        if (savedNumber) {
            document.getElementById('number').value = savedNumber;
        }
        if (savedDescription) {
            document.getElementById('description').value = savedDescription;
        }
        if (savedImage) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = savedImage;
        }

        // Обробник для кнопки "Зберегти"
        document.getElementById('saveButton').addEventListener('click', function() {
            const number = document.getElementById('number').value;
            const description = document.getElementById('description').value;
            const image = document.getElementById('imagePreview').src;

            // Зберігаємо дані у локальному сховищі
            localStorage.setItem('savedNumber', number);
            localStorage.setItem('savedDescription', description);
            localStorage.setItem('savedImage', image);

            alert("Скага збереженна, дякую за співпрацю")
        });

// Перевіряємо, чи є вже дані в локальному сховищі та витягуємо їх
let savedData = JSON.parse(localStorage.getItem('savedData')) || [];

// Функція для оновлення списку збережених даних
function updateDataList() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Очищаємо список перед оновленням

    // Перебираємо всі збережені дані і виводимо їх у списку
    savedData.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${index + 1}.</strong>
            <p>Текст: ${data.text}</p>
            <p>Опис: ${data.description}</p>
            <p>Картинка: ${data.image}</p>
        `;
        dataList.appendChild(listItem);
    });
}

// Викликаємо функцію оновлення при завантаженні сторінки
updateDataList();

// Обробник для кнопки "Зберегти"
document.getElementById('saveButton').addEventListener('click', function() {
    const text = document.getElementById('number').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('imagePreview').src;

    // Додаємо дані до масиву
    savedData.push({ text, description, image });

    // Зберігаємо оновлений масив в локальному сховищі
    localStorage.setItem('savedData', JSON.stringify(savedData));

    // Оновлюємо список та поля вводу
    updateDataList();
    document.getElementById('number').value = '';
    document.getElementById('description').value = '';
    document.getElementById('imagePreview').src = '';
});


// Ваш існуючий код ...

// Оновлений код для оновлення списку збережених даних
function updateDataList(data = savedData) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Очищаємо список перед оновленням

    // Перебираємо всі збережені дані (або знайдені дані) і виводимо їх у списку
    data.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p>Текст: ${data.text}</p>
            <p>Опис: ${data.description}</p>
            <img src="${data.image}" alt="Картинка">
        `;
        dataList.appendChild(listItem);
    });
}

// Викликаємо функцію оновлення при завантаженні сторінки
updateDataList();

// Обробник для кнопки "Зберегти"
document.getElementById('saveButton').addEventListener('click', function() {
    const text = document.getElementById('number').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('imagePreview').src;

    // Додаємо дані до масиву
    savedData.push({ text, description, image });

    // Зберігаємо оновлений масив в локальному сховищі
    localStorage.setItem('savedData', JSON.stringify(savedData));

    // Оновлюємо список та поля вводу
    updateDataList();
    document.getElementById('number').value = '';
    document.getElementById('description').value = '';
    document.getElementById('imagePreview').src = '';
});

// Оновлений код для пошуку
document.getElementById('searchButton').addEventListener('click', function() {
    const searchText = document.getElementById('search').value.toLowerCase();

    // Фільтруємо дані за введеним текстом
    const filteredData = savedData.filter(data => {
        return data.text.toLowerCase().includes(searchText) || data.description.toLowerCase().includes(searchText);
    });

    // Оновлюємо список знайдених даних
    updateDataList(filteredData);
});

