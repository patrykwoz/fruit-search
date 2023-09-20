const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const body = document.body;

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	const lowerCaseStr = str.toLowerCase();
	const results = fruit.filter(fruit => fruit.toLowerCase().includes(lowerCaseStr));
	if (lowerCaseStr === ''){
		results.length = 0;
	}
	return results;
}

function searchHandler(e) {
	showSuggestions(search(e.target.value), e.target.value);
}

function showSuggestions(results, inputVal) {
	const ulInsert = document.querySelector("#suggestions-container");
	ulInsert.innerHTML = '';
	const highlightedResults = highlightMatchingStr(results, inputVal);

	highlightedResults.forEach(result => {
		let newLi = document.createElement('li');
		newLi.innerHTML = result;
		newLi.addEventListener('mouseover', (e)=>e.target.classList.add('li-highlight'));
		newLi.addEventListener('mouseleave', (e)=>e.target.classList.remove('li-highlight'));
		newLi.addEventListener('click', useSuggestion)
		ulInsert.appendChild(newLi);
	});
}

function useSuggestion(e) {
	input.value = e.target.innerText;
	const ulInsert = document.querySelector("#suggestions-container");
	ulInsert.innerHTML = '';
}

function highlightMatchingStr(arr, searchString) {
    return arr.map(str => {
        let index = str.toLowerCase().indexOf(searchString.toLowerCase());
        if (index !== -1) {
            let before = str.substring(0, index);
            let after = str.substring(index + searchString.length);
			let insertStr = '';
			if (index>0){
				insertStr = `<span class="highlight-matching-str">${lowerCaseFirstChar(searchString)}</span>`;
			}
			else {
				insertStr = `<span class="highlight-matching-str">${capitalizeFirstChar(searchString)}</span>`;
			};
            return `${before}${insertStr}${after}`;
        }
        return str;
    });
}

function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function lowerCaseFirstChar (str){
    return str.charAt(0).toLowerCase() + str.slice(1);
}


function debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
}

input.addEventListener('keydown', debounce(searchHandler,500));
suggestions.addEventListener('click', useSuggestion);
body.addEventListener('click', (e)=>{
	const ulInsert = document.querySelector("#suggestions-container");
	ulInsert.innerHTML = '';
})