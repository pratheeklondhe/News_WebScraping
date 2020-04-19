console.log('HI');
var udayavani = 'div.white-blk-big div.cnt-hldr h3';

const dataList = [
	{
		url: 'https://www.indiatoday.in/news.html',
		title: 'India Today',
		id: 'india_today',
		query: 'h3.news-page-feature a',
		isCorsREquired: true,
		isKannada: false,
		show: true
	},
	{
		url: 'https://www.thehindu.com/news/',
		title: 'The Hindu',
		id: 'the_hindu',
		query: 'li.media>a',
		isCorsREquired: true,
		isKannada: false,
		show: true
	} ,{
		url: 'https://vijaykarnataka.com',
		title: 'Vijaya Karnataka',
		id: 'vijaya_karnataka',
		query: 'div.leftmain>div.mainarticle1>h2>a',
		isCorsREquired: true,
		isKannada: true,
		show: true
	},
	{
		url: 'https://www.prajavani.net',
		title: 'Prajavani',
		id: 'prajavani',
		query: 'div.pj-top-trending__content-wrapper div.pj-top-thump a',
		isCorsREquired: true,
		isKannada: true,
		show: false
	},
	{
		url: 'https://news.google.com/topstories?hl=en-IN&gl=IN&ceid=IN:en',
		title: 'Google News',
		id: 'google_news',
		query: 'article.j7vNaf>h3',
		isCorsREquired: true,
		isKannada: false,
		show: true
	}
];

document.addEventListener('DOMContentLoaded', function() {

	createCardSkeletons();
	
	getAllData();
});

function createCardSkeletons() {
	var container = document.getElementById('container');
	dataList.forEach(data => {
		if (data.show) {
		const emptyCol = document.createElement('div');
		emptyCol.setAttribute('id', data.id);
		emptyCol.classList.add('col-md-6', 'custom-col', 'center-both-directions');

		createCards(emptyCol, data);

		container.appendChild(emptyCol);
		}
	});
}

function createCards(emptyCol, data) {
	const card = document.createElement('div');
	card.classList.add('card', 'card-size', 'card-scroll-behaviour');

	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');

	const cardTitle = document.createElement('h6');
	cardTitle.classList.add('card-title','headline-style', 'font-bold', 'center-both-directions');
	cardTitle.innerText = data.title;

	const paraGraph = document.createElement('div');
	paraGraph.setAttribute('id', data.id + '_display_region');
	paraGraph.classList.add('card-text', 'center-both-directions', 'height-fill-available');
	paraGraph.innerText = 'Loading...';

	cardBody.appendChild(cardTitle);
	cardBody.appendChild(paraGraph);
	card.appendChild(cardBody);
	emptyCol.appendChild(card);
}

function getCorsUrl(url) {
	return 'http://www.whateverorigin.org/get?url=' + 
	encodeURIComponent(url) + '&callback=?';
}

function getAllData() {
	dataList.forEach(data => {
		if (data.show) {
		const corsUrl = data.isCorsREquired ? getCorsUrl(data.url) : data.url;
		getSpecificData(corsUrl, data);

		}
	});
}

function getSpecificData(corsUrl, data) {	
$.getJSON(corsUrl,
function(jsonData){
	console.log('---------------------------');
	console.log(corsUrl);
	console.log((jsonData.contents));
	renderData(data, jsonData.contents);
});
}

function renderData(data, jsonData) {
	const virtual_container =  document.getElementById('virtual_container');
	const virtual_div = document.createElement('div');
	virtual_div.setAttribute('id', data.id);
	virtual_div.innerHTML = jsonData;
	// virtual_container.appendChild(virtual_div);

	filterData(data, virtual_div);
}

function filterData(data, virtual_div) {
	// const filterQuery = `div#virtual_container div#${data.id} ${data.query}`;
	const filterQuery = data.query;
	console.log("!@#$%^&*()_");
	console.log(virtual_div);
	const filteredQuery = virtual_div.querySelectorAll(filterQuery);
	console.log(filteredQuery);
	if (filteredQuery) {
		displayDataInCard(Array.from(filteredQuery).map((pattern) => (pattern.innerText).trim()), data);
	}
	// const virtual_div = document.getElementById(data.id);

}

function displayDataInCard(newsList, data) {
	var display_region = document.getElementById(data.id + '_display_region');
	display_region.innerText = '';
	display_region.classList.add('row');
	if (newsList && newsList.length) {
		newsList.forEach(news => {
			const news_card = document.createElement('div');
			news_card.classList.add('card' , 'col-md-12', 'margin-bottom-ten', 'inner-card-shadow');
			news_card.innerText = news;
			if (data.isKannada) {
				news_card.classList.add('kannada_text')
			}
			display_region.appendChild(news_card);
		});
	}
}