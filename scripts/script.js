/***************************************/
/**************ALL PAGES****************/
/***************************************/
// HELPER FUNCTIONS
function getMainSection() {
    return document.getElementById('main-section');
}

function clearMainSection(cb) {
    var mainSection = getMainSection();
    mainSection.style.opacity = 0;
    setTimeout(function() {
        while(mainSection.firstChild) {
            mainSection.removeChild(mainSection.firstChild);
        }
        mainSection.style = '';
        mainSection.classList = '';
        cb();
    }, 300);
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

function genPageTitle(titleText) {
    var headerRow = document.createElement('div');
    headerRow.classList.add('flex-row');
    var headerCol = document.createElement('div');
    headerCol.classList.add('flex-col', 'span-1-of-1', 'text-centered');
    var title = document.createElement('h2');
    title.innerHTML = titleText;
    headerCol.appendChild(title);
    headerRow.appendChild(headerCol);

    return headerRow;
}

// MODAL FUNCTIONS
function closeModal() {
    document.body.removeChild(document.getElementById('modal'));
}

function regenCurrentPage() {
    var main = getMainSection();
    if(main.classList.contains('education')) {
        genEducation();
    } else if (main.classList.contains('projects')) {
        genProjects();
    } else if (main.classList.contains('aboutMe')) {
        genAboutMe();
    } else {
        genHome();
    }
}

function submitZip(event) {
    var newzip = document.getElementById('zip-code').value;
    if(newzip > 10000 && newzip <= 99999) {
        closeModal();
        var weatherData = new Object();
        weatherData.zipCode = newzip;
        weatherData.syncDate = null;
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
        //regenCurrentPage();
        genNav();
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
    // check if zip code is in local storage
    var weatherDataText = localStorage.getItem('weatherData');
    if(weatherDataText) {
        weatherData = JSON.parse(weatherDataText);
        zipCodeInput.value = weatherData.zipCode;
    }
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
function getWeather(cb) {
    var TEN_MINUTES = 10 * 60 * 1000;
    var zip = 84321;
    var now = new Date();
    var tenMinutesAgo = new Date(now - TEN_MINUTES);
    var weatherData = new Object();
    var weatherDataText = localStorage.getItem('weatherData');
    if(weatherDataText) {
        weatherData = JSON.parse(weatherDataText);
        zip = weatherData.zipCode;
    }
    console.log('Sync Date: ',
                weatherData.syncDate,
                ' Resynced? ',
                (!weatherData.syncDate || (weatherData.syncDate && weatherData.syncDate < tenMinutesAgo)));
    if(!weatherData.syncDate || (weatherData.syncDate && weatherData.syncDate < tenMinutesAgo)) {
        getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial&APPID=5e7ba222cda077f67cc1fa067e2a3dfa', null, null, function(data) {
        weather = JSON.parse(data);
        weatherData.name = weather.name;
        weatherData.state = weather.weather[0].main;
        weatherData.temp = weather.main.temp;
        weatherData.syncDate = now;
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
        cb(weatherData);
        
    } );
    } else {
        cb(weatherData);
    }
    
}

function onWeatherIconClick(event) {
    var modal = createModal();
    if(modal) {
        document.body.appendChild(modal);
    }
    
}

function genWeatherMenu() {
    
    var navList = document.createElement('ul');
    navList.id = 'weather-menu';
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
    getWeather(function(data) {
        var weatherInfo = document.createElement('li');
        weatherInfo.classList.add('row-end-right');
        weatherInfo.innerHTML = data.name + ": " + data.state + ', Temp: ' + data.temp + '&#xb0; F';
        navList.appendChild(weatherInfo);
    })
    return navList;
}
// NAV FUNCTIONS
function navItemClick(event) {
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

function genNav() {
    console.log('called');
    var oldnav = document.getElementById('main-nav');
    if(oldnav) {
        oldnav.parentNode.removeChild(oldnav);
    }
    var nav = document.createElement('nav');
    nav.id = 'main-nav';
    var wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('main-nav');
    wrapperDiv.appendChild(genNavList());
    wrapperDiv.appendChild(genWeatherMenu());
    nav.appendChild(wrapperDiv);

    document.body.insertBefore(nav, document.body.firstChild);
}
/***************************************/
/**************HOME PAGE****************/
/***************************************/
// GENERATE THE TITLE DIV
function genTitle() {
    var titleDiv = document.createElement('div');
    titleDiv.id = 'title-div';
    titleDiv.classList.add('main-title-wrapper');
    var title = document.createElement('h1');
    title.classList.add('main-title');
    title.innerHTML = 'Ryan Dockstader';
    var lead = document.createElement('p');
    lead.classList.add('lead');
    lead.innerHTML = 'Motivated JavaScript developer, C# developer, life-long learner';
    titleDiv.appendChild(title);
    titleDiv.appendChild(lead);
    return titleDiv;
}
// GENERATE THE HOME PAGE
function genHome() {
    var SCREEN_NAME = 'home'
    var main = getMainSection();
    clearMainSection(function() {
        main.classList.add(SCREEN_NAME);
    main.appendChild(genTitle());
    });
}
/***************************************/
/************EDUCATION PAGE*************/
/***************************************/

// GENERATE EDUCATION NODE
function generateEducationNode(title, date, tagline, projects, gitHubLink) {
    var nodeRow = document.createElement('div');
    nodeRow.classList.add('flex-row');
    var nodeCol = document.createElement('div');
    nodeCol.classList.add('flex-col', 'span-1-of-1', 'notable-projects');
    var nodeTitle = document.createElement('h3');
    nodeTitle.innerHTML = title + ' &mdash; ' + date;
    var nodeTagline = document.createElement('h5');
    nodeTagline.innerHTML = tagline;
    var projectsTitle = document.createElement('h4');
    projectsTitle.innerHTML = 'Notable Projects';
    var nodeProjects = document.createElement('ul');
    projects.forEach(projectText => {
        var project = document.createElement('li');
        project.innerHTML = projectText;
        nodeProjects.appendChild(project);
    })
    var gitLink = document.createElement('p');
    gitLink.innerHTML = 'Checkout my code on GitHub ';
    var link = document.createElement('a');
    link.target = "_BLANK";
    link.href = gitHubLink;
    link.innerHTML = 'here';
    gitLink.appendChild(link);

    nodeCol.appendChild(nodeTitle);
    nodeCol.appendChild(nodeTagline);
    nodeCol.appendChild(projectsTitle);
    nodeCol.appendChild(nodeProjects);
    nodeCol.appendChild(gitLink);
    nodeRow.appendChild(nodeCol);
    return nodeRow;
}
// GENERATE CERTS NODE
function generateCertNode(certs) {
    var certsRowMain = document.createElement('div');
    certsRowMain.classList.add('flex-row');

    var certsColMain = document.createElement('div');
    certsColMain.classList.add('flex-col', 'span-1-of-1');
    certsRowMain.appendChild(certsColMain);

    var certsTitle = document.createElement('h3');
    certsTitle.innerHTML = 'Certifications';
    certsColMain.appendChild(certsTitle);

    var certsRow = document.createElement('div');
    certsRow.classList.add('flex-row');
    certsColMain.appendChild(certsRow);

    var certsCol1 = document.createElement('div');
    certsCol1.classList.add('flex-col', 'span-1-of-3');
    var certsCol1List = document.createElement('ul');
    certsCol1.appendChild(certsCol1List);
    certsRow.appendChild(certsCol1);

    var certsCol2 = document.createElement('div');
    certsCol2.classList.add('flex-col', 'span-1-of-3');
    var certsCol2List = document.createElement('ul');
    certsCol2.appendChild(certsCol2List);
    certsRow.appendChild(certsCol2);

    var certsCol3 = document.createElement('div');
    certsCol3.classList.add('flex-col', 'span-1-of-3');
    var certsCol3List = document.createElement('ul');
    certsCol3.appendChild(certsCol3List);
    certsRow.appendChild(certsCol3);
    
    var index = 1;
    certs.forEach(cert => {
        var listItem = document.createElement('li');
        listItem.innerHTML = cert;
        if(index % 2) {
            certsCol1List.appendChild(listItem);
        } else if (index % 3) {
            certsCol2List.appendChild(listItem);
        } else {
            certsCol3List.appendChild(listItem);
        }
        index = index + 1;
    })
    return certsRowMain;
}
// GENERATE EDUCATION NODES
function genEducationNodes() {
    var nodesRow = document.createElement('div');
    nodesRow.classList.add('flex-row');
    var nodesCol = document.createElement('div');
    nodesCol.classList.add('flex-col', 'span-1-of-1');
    var nodes = [
        {
            title: "BACHELORS OF SCIENCE, SOFTWARE ENGINEERING",
            date: "MAY 2020",
            tagline: "BRIGHAM YOUNG UNIVERSITY IDAHO (ONLINE), REXBURG, IDAHO",
            projects: [
                "Built a version of the original Astroids game",
                "Developed an android application with a team of developers",
                "Worked with a large team to review requirements and create a development plan for a iOS app"
            ],
            gitHubLink: "https://github.com/rdockstader/BYUI-CS"
        },
        {
            title: "ASSOCIATES OF SCIENCE, GENERAL STUDIES",
            date: "MAY 2017",
            tagline: "UTAH STATE UNIVERSITY, LOGAN, UT",
            projects: [
                "Took 2nd in a class compititon using basic AI",
                "Built a foundation of coding experience in C++"
            ],
            gitHubLink: "https://github.com/rdockstader/USU-CS"
        }
    ];
    nodes.forEach(node => {
        nodesCol.appendChild(generateEducationNode(node.title, node.date, node.tagline, node.projects, node.gitHubLink));
        nodesCol.appendChild(document.createElement('hr'));
    })
    var certs = ['CompTIA A+'];
    nodesCol.appendChild(generateCertNode(certs));
    nodesRow.appendChild(nodesCol);
    return nodesRow;
}
// GENERATE IMAGE NODE
function genEducationImg() {
    var imgRow = document.createElement('div');
    imgRow.classList.add('flex-row', 'pt-3');
    var imgCol = document.createElement('div');
    imgCol.classList.add('flex-col', 'span-1-of-1', 'img-wrapper');
    var img = document.createElement('img');
    img.classList.add('responsive-img');
    img.src = './img/hero2.jpeg';
    imgCol.appendChild(img);
    imgRow.appendChild(imgCol);

    return imgRow;
}
// GENERATE THE EDUCATION PAGE
function genEducation() {
    var SCREEN_NAME = 'education'
    var main = getMainSection();
    clearMainSection(function() {
        main.classList.add('page', SCREEN_NAME);
        main.appendChild(genPageTitle('Education'));
        var eduRow = document.createElement('div');
        eduRow.classList.add('flex-row');
        var eduCol1 = document.createElement('div');
        eduCol1.classList.add('flex-col', 'span-2-of-5');
        eduCol1.appendChild(genEducationImg());
        var eduCol2 = document.createElement('div');
        eduCol2.classList.add('flex-col', 'span-3-of-5');
        eduCol2.appendChild(genEducationNodes());
        eduRow.appendChild(eduCol1);
        eduRow.appendChild(eduCol2);
        main.appendChild(eduRow);
    });
}
/***************************************/
/************PROJECTS PAGE**************/
/***************************************/
function genProjects() {
    var SCREEN_NAME = 'projects'
    var main = getMainSection();
    clearMainSection(function() {
        main.classList.add('page', SCREEN_NAME);
        main.appendChild(genPageTitle('Projects'));
    });
    
}
/***************************************/
/************ABOUT ME PAGE**************/
/***************************************/
function genAboutMe() {
    var SCREEN_NAME = 'aboutMe'
    var main = getMainSection();
    clearMainSection(function() {
        main.classList.add('page', SCREEN_NAME);
        main.appendChild(genPageTitle('About Me'));
    });
}

genHome();
genNav();