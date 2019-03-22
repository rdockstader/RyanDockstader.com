// HELPER FUNCTIONS
function getMainSection() {
    return document.getElementById('main-section');
}

function clearMainSection() {
    var mainSection = getMainSection();

    while(mainSection.firstChild) {
        mainSection.removeChild(mainSection.firstChild);
    }
    mainSection.style = null;
    mainSection.classList = null;

    return mainSection;
}

function getJSON(url, method, isAsync, callback)
{
	// Verify there is a URL, if not exit function
    if(url == null) {
        console.error('URL CANNOT BE NULL');
        return;
    }
    // Verify there is a callback, if not exit the function
    if(callback == null) {
        console.error('CALLBACK CANNOT BE NULL');
        return;
    }
    // default to GET
    if(method == null) {
        method = 'GET';
    }
    // default to true (false is depreciated)
    if(isAsync == null) {
        isAsync = true;
    }
    // setup and send request
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()	
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                } 
					
			}
	xmlhttp.open(method, url, isAsync);
	xmlhttp.send();
}
// MODAL FUNCTIONS
function closeModal() {
    document.body.removeChild(document.getElementById('modal'));
}

function submitZip(event) {
    var newzip = document.getElementById('zip-code').value;
    if(newzip > 10000 && newzip <= 99999) {
        closeModal();
        console.log(newzip);
    } else {
        alert('Please enter a valid zip code');
    }
    
}

function createModalForm() {
    var form = document.createElement('form');
    // zip code input
    var zipCodeInputWrapper = document.createElement('div');
    zipCodeInputWrapper.classList.add('flex-row');
    var zipCodeInputLabel = document.createElement('label');
    zipCodeInputLabel.for = 'zip-code';
    zipCodeInputLabel.innerHTML = 'Zip Code';
    zipCodeInputLabel.classList.add('flex-col');
    zipCodeInputLabel.classList.add('span-1-of-2');
    var zipCodeInput = document.createElement('input');
    zipCodeInput.id = 'zip-code';
    zipCodeInput.name = 'zip-code';
    zipCodeInput.classList.add('flex-col');
    zipCodeInput.classList.add('span-1-of-2');
    zipCodeInput.placeholder = '55555';
    zipCodeInput.type = 'number';
    zipCodeInputWrapper.appendChild(zipCodeInputLabel);
    zipCodeInputWrapper.appendChild(zipCodeInput);
    form.appendChild(zipCodeInputWrapper);
    // submit button
    var btnRow = document.createElement('div');
    btnRow.classList.add('flex-row');
    var btnCol = document.createElement('div');
    btnCol.classList.add('flex-col');
    btnCol.classList.add('span-1-of-1');
    btnCol.classList.add('flex-align-right');
    var submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.innerHTML = 'Submit';
    submitBtn.classList.add('btn');
    submitBtn.classList.add('btn-success');
    submitBtn.classList.add('flex-align-right');
    submitBtn.onclick = submitZip;
    btnCol.appendChild(submitBtn);
    btnRow.appendChild(btnCol);
    form.appendChild(btnRow);
    return form;
}

function createModalCloseBtn () {
    var btnRow = document.createElement('div');
    btnRow.classList.add('flex-row');
    var btnCol = document.createElement('div');
    btnCol.classList.add('flex-col');
    btnCol.classList.add('span-1-of-1');
    btnCol.classList.add('flex-align-right');
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'X';
    closeBtn.classList.add('modal-close-btn');
    closeBtn.classList.add('btn');
    closeBtn.classList.add('btn-danger');
    closeBtn.classList.add('flex-align-right');
    closeBtn.onclick = closeModal;
    btnCol.appendChild(closeBtn);
    btnRow.appendChild(btnCol);

    return btnRow;
}

function createModal() {
    if(!document.getElementById('modal')) {
        var modal = document.createElement('div');
        modal.id = 'modal';
        modal.classList.add('modal');
        
        modal.appendChild(createModalCloseBtn());
        modal.appendChild(createModalForm());
        return modal;
    }


    return null;
}

// WEATHER FUNCTIONS
function onWeatherIconClick(event) {
    var modal = createModal();
    if(modal) {
        document.body.appendChild(modal);
    }
    
}

function genWeatherMenu() {
    var navList = document.createElement('ul');
    navList.classList.add('nav-list');
    navList.classList.add('nav-list-right');
    var iconItem = document.createElement('li');
    var iconClick = document.createElement('a');
    iconClick.id = 'weather-icon';
    iconClick.onclick = onWeatherIconClick;
    var icon = document.createElement('img');
    icon.classList.add('nav-icon');
    icon.src = './img/Weather-icon.png';
    iconClick.appendChild(icon);
    iconItem.append(iconClick);
    navList.appendChild(iconItem);
    getJSON('http://api.openweathermap.org/data/2.5/weather?zip=84321,us&units=imperial&APPID=5e7ba222cda077f67cc1fa067e2a3dfa', null, null, function(data) {
        weather = JSON.parse(data);
        var weatherInfo = document.createElement('li');
        weatherInfo.classList.add('row-end-right');
        console.log(weather);
        weatherInfo.innerHTML = weather.name + ": " + weather.weather[0].main + ', Temp: ' + weather.main.temp + '&#xb0; F';
        navList.appendChild(weatherInfo);
    } )
    return navList;
}
// NAV FUNCTIONS
function navItemClick(event) {
    console.log(this.innerHTML);
    clearMainSection();

    switch(this.innerHTML) {
        case('Education'):
            genEducation();
            break;
        case('Projects'):
            genProjects();
            break;
        case('About Me'):
            genAboutMe();
            break;
        default:
            genHome();
            break;
    }
}

function genNavList() {
    var navList = document.createElement('ul');
    navList.classList.add('nav-list');
    navList.classList.add('nav-list-left');
    var navItems = [
        {name: 'Home'},
        {name: 'Education'},
        {name: 'Projects'},
        {name: 'About Me'}
    ];
    navItems.forEach(item => {
        var navItem = document.createElement('li');
        var navBtn = document.createElement('a');
        navBtn.innerHTML = item.name;
        navBtn.onclick = navItemClick;
        navItem.appendChild(navBtn);
        navList.appendChild(navItem);
    })
    return navList;
}

function GenNav() {
    var nav = document.createElement('nav');
    var wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('main-nav');
    wrapperDiv.appendChild(genNavList());
    wrapperDiv.appendChild(genWeatherMenu());
    nav.appendChild(wrapperDiv);
    


    return nav;
}

// Generates the title within the header section
function genTitle() {
    var titleDiv = document.createElement('div');
    titleDiv.id = 'title-div';
    titleDiv.classList.add('main-title-wrapper');
    var title = document.createElement('h1');
    title.classList.add('main-title');
    title.innerHTML = 'Ryan Dockstader';
    var lead = document.createElement('p');
    lead.classList.add('lead');
    lead.innerHTML = 'Motivated JavaScript developer, C# developer, and life long learner';
    titleDiv.appendChild(title);
    titleDiv.appendChild(lead);
    return titleDiv;
}
// PAGE FUNCTIONS

// Generates the header section of the web page
function genHome() {
    var main = getMainSection();
    main.classList.add('home');
    main.appendChild(GenNav());
    main.appendChild(genTitle());
    
}

function genEducation() {
    var main = getMainSection();
    main.classList.add('education');
    main.appendChild(GenNav());
}

function genProjects() {
    var main = getMainSection();
    main.classList.add('projects');
    main.appendChild(GenNav());
}

function genAboutMe() {
    var main = getMainSection();
    main.classList.add('aboutMe');
    main.appendChild(GenNav());
}

genHome();