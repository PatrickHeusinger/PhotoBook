async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}




let images = ['images/home_1.png', 'images/home_2.jpg', 'images/home_3.gif', 'images/home_4.jpg', 'images/home_5.jpg', 'images/home_6.jpg', 'images/home_7.jpg', 'images/home_8.jpg', 'images/home_9.gif', 'images/home_10.jpg', 'images/home_11.gif', 'images/home_12.png'];
let trash = ['images/home_11.gif'];

function render() {
    let photoCube = document.getElementById('photoCube');
    photoCube.innerHTML = '';
    for (let i = 0; i < images.length; i++) {

        photoCube.innerHTML += `
        <div class="photoBox">
        <a onclick="renderPicture(${i})" href="#">
        <img  src="${images[i]}" ></a> <br>
        </div>
        `;
    }
}

function renderPicture(i) {
    let photoContainer = document.getElementById('photoCube');

    photoContainer.innerHTML = `
    
    <button onclick="openNextBackwards(${i})" type="button" class="btn btn-dark"><</button>
    <button onclick="moveToTrash(${i})" type="button" class="btn btn-dark">Delete</button>
    <button onclick="renderTrash(${i})" type="button" class="btn btn-dark">Trash</button>
    <button onclick="render()" type="button" class="btn btn-dark">Back</button> 
    <button onclick="openNext(${i})" type="button" class="btn btn-dark">></button>
    
    <div class ="photoContainer">
    <img class="sizing" src ="${images[i]}">
    </div>
    
    `;
}

function renderTrash() {
    let photoCube = document.getElementById('photoCube');
    photoCube.innerHTML = '';
    for (let i = 0; i < trash.length; i++) {

        photoCube.innerHTML += `
        
        <div class="column"> 
        <button onclick="render()" type="button" class="btn btn-dark">Back</button> 
        <button onclick="deleteImage(${i})" type="button" class="btn btn-dark">Delete</button>
        <button onclick="moveToRender(${i})" type="button" class="btn btn-dark">Save</button>
        </div>
        <div class="photoBox">
        <img  src="${trash[i]}" ></a> <br>
        </div>
        `;
    }
}

function moveToTrash(i) {
    trash.push(images[i]);
    images.splice(i, 1);
    if (i < images.length) {
        openNext();
    } else {
        render();
    }
    save();
    saveTrash();
}

function moveToRender(i) {
    images.push(trash[i]);
    trash.splice(i, 1);
    if (i < trash.length) {
        renderTrash();
    } else {
        render();
    }
    save();
    saveTrash();
}

function save() {
    let imagesAsText = JSON.stringify(images);
    localStorage.setItem('images', imagesAsText);
}

function saveTrash() {
    let trashAsText = JSON.stringify(trash);
    localStorage.setItem('trash', trashAsText);
}

function load() {
    let imagesAsText = localStorage.getItem('images');
    if (imagesAsText) {
        images = JSON.parse(headlineAsText);

    }
}

function loadTrash() {
    let trashAsText = localStorage.getItem('trash');
    if (trashAsText) {
        trash = JSON.parse(trashAsText);

    }
}

function deleteImage(i) {
    trash.splice(i, 1);
    if (i < trash.length) {
        renderTrash();
    } else {
        render();
    }

}

function openNext(i) {
    if (i < images.length - 1) {
        renderPicture(i + 1);
    } else {
        renderPicture(0);
    }
}

function openNextBackwards(i) {
    if (i > 0) {
        renderPicture(i - 1);
    } else {
        renderPicture(images.length - 1);
    }
}