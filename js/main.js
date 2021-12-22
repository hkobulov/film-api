let elForm = document.querySelector('.form');
let elFilmWrapper = document.querySelector('.film-list')
let filmAlert = document.querySelector('.film-alert');
let filmAlertText = document.querySelector('.alert-text');
let elFilmTemplate = document.querySelector('.film-item-temp').content;
let elFilmInput = document.querySelector('.film-input');

function renderFilms(array, wrapper){
    
    if(array){
        let filmItem = document.createDocumentFragment();
        
        array.forEach(item => {
            let filmClone = elFilmTemplate.cloneNode(true)
            console.log(item);
            filmClone.querySelector('.card-image').src = item.Poster;
            filmClone.querySelector('.card-title').textContent = item.Title;
            filmClone.querySelector('.card-year').textContent = item.Year;
            
            filmItem.appendChild(filmClone);
            filmAlert.classList.add('d-none')
        })
        
        wrapper.innerHTML = null;
        wrapper.appendChild(filmItem)
    } else {
        wrapper.innerHTML = null
        filmAlert.classList.remove('d-none')
    }
}



elForm.addEventListener('submit', evt => {
    evt.preventDefault()
    
    let inputValue = elFilmInput.value.trim()
    
    filmAlertText.textContent = inputValue
    
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=452845b8&s=${inputValue}`)
    .then(response => response.json())
    .then(json => renderFilms(json.Search, elFilmWrapper))
})
