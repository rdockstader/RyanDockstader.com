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
    var modal = document.getElementById('modal');
    modal.classList.add('fade-out');
    setTimeout(function() {
        document.body.removeChild(modal);
    }, 200);
    
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
        showSnackBar('Zip Saved Successfully', 3000);
    } else {
        alert('Please enter a valid zip code');
    }
    
}

function createModalForm() {
    var form = document.createElement('div');
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
    zipCodeInput.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          submitBtn.click();
        }
      });
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

// SNACKBAR FUNCTION
function removeSnackBar(snackBar, delay) {
    setTimeout(function() {
        document.body.removeChild(snackBar);
    }, delay);
}

function genSnackBar(message) {
    var snackBar = document.createElement('div');
    snackBar.id = 'snackbar';
    snackBar.classList.add('snack-bar', 'snack-bar-success');

    var snackBarRow = document.createElement('div');
    snackBarRow.classList.add('snack-bar-row', 'flex-row');
    snackBar.appendChild(snackBarRow)

    var snackBarCol = document.createElement('div');
    snackBarCol.classList.add('flex-col', 'span-1-of-1');
    snackBarRow.appendChild(snackBarCol);
    
    var snackBarMessage = document.createElement('p');
    snackBarMessage.innerHTML = message;
    snackBarMessage.classList.add('snack-bar-message', 'text-centered');
    snackBarCol.appendChild(snackBarMessage);
    snackBar.style.opacity = 1;

    return snackBar;
}

function showSnackBar(message, durationInMilliseconds) {
    var snackBar = genSnackBar(message);
    if(snackBar) {
        document.body.appendChild(snackBar);
        setTimeout(function() {
            snackBar.classList.add('bounceOutAnimation');
            removeSnackBar(snackBar, 1000);
        }, durationInMilliseconds)
    }
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
        getJSON('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial&APPID=5e7ba222cda077f67cc1fa067e2a3dfa', null, null, function(data) {
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
function generateEducationNode(title, date, tagline, projects, gitHubLink, imgPath) {
    var nodeRow = document.createElement('div');
    nodeRow.classList.add('flex-row');
    var nodeCol = document.createElement('div');
    nodeCol.classList.add('flex-col', 'span-4-of-5', 'notable-projects');
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

    var nodeImgCol = document.createElement('div');
    nodeImgCol.classList.add('flex-col', 'span-1-of-5');
    var schoolLogo = document.createElement('img');
    schoolLogo.classList.add('responsive-img');
    schoolLogo.src = imgPath;
    nodeImgCol.appendChild(schoolLogo);

    nodeRow.appendChild(nodeCol);
    nodeRow.appendChild(nodeImgCol);
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
            gitHubLink: "https://github.com/rdockstader/BYUI-CS",
            imgPath: "./img/BYU-Idaho.png"
        },
        {
            title: "ASSOCIATES OF SCIENCE, GENERAL STUDIES",
            date: "MAY 2017",
            tagline: "UTAH STATE UNIVERSITY, LOGAN, UT",
            projects: [
                "Took 2nd in a class compititon using basic AI",
                "Built a foundation of coding experience in C++"
            ],
            gitHubLink: "https://github.com/rdockstader/USU-CS",
            imgPath: "./img/usu.png"
        }
    ];
    nodes.forEach(node => {
        nodesCol.appendChild(generateEducationNode(node.title, node.date, node.tagline, node.projects, node.gitHubLink, node.imgPath));
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
    img.classList.add('responsive-img', 'img-box-shadow');
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
/************************************************/
/************PROJECTS PAGE**************/
/***********************************************/
function createStackItem(itemName, item) {
    var itemEle = document.createElement('li');
    itemEle.innerHTML = '<strong>' + itemName + ' </strong> : ' + item;

    return itemEle;
}

function genProjectDiv(project) {
    var projRow = document.createElement('div');
    projRow.classList.add('flex-row');
    var projCol = document.createElement('div');
    projCol.classList.add('flex-col', 'span-1-of-1');
    projRow.appendChild(projCol);
    // title row
    var titleRow = document.createElement('div');
    titleRow.classList.add('flex-row');
    var titleCol = document.createElement('div');
    titleCol.classList.add('flex-col', 'span-1-of-1');
    titleRow.appendChild(titleCol);
    var title = document.createElement('h3');
    title.classList.add('text-centered');
    title.innerHTML = project.title;
    titleCol.appendChild(title);
    projCol.appendChild(titleRow);
    // Description
    var descRow = document.createElement('div');
    descRow.classList.add('flex-row');
    var descCol = document.createElement('div');
    descCol.classList.add('flex-col', 'span-1-of-1');
    descRow.appendChild(descCol);
    var desc = document.createElement('p');
    desc.innerHTML = project.desc;
    descCol.appendChild(desc);
    // stack info
    var stackList = document.createElement('ul');
    stackList.appendChild(createStackItem('Back end', project.backend));
    stackList.appendChild(createStackItem('Database', project.database));
    stackList.appendChild(createStackItem('Front end', project.frontend));
    descCol.appendChild(stackList);
    projCol.appendChild(descRow);
    // view info
    var viewRow = document.createElement('div');
    viewRow.classList.add('flex-row');
    var viewCol = document.createElement('div');
    viewCol.classList.add('flex-col', 'span-1-of-1');
    viewRow.appendChild(viewCol);
    if(project.gitLink) {
        var linkInfo = document.createElement('p');
        linkInfo.innerHTML = 'Check out this projects code on ';
        var link = document.createElement('a');
        link.href = project.gitLink;
        link.target = '_BLANK';
        link.innerHTML = 'Github';
        linkInfo.appendChild(link);
        viewCol.appendChild(linkInfo);
    }
    if(project.link) {
        var linkInfo = document.createElement('p');
        linkInfo.innerHTML = 'Check out this projects on the web, ';
        var link = document.createElement('a');
        link.href = project.link;
        link.target = '_BLANK';
        link.innerHTML = 'here';
        linkInfo.appendChild(link);
        viewCol.appendChild(linkInfo);
    }
    projCol.appendChild(viewRow);
    return projRow;
}

function genProjectDivs() {
    var projects = [
        {
            "title": "Devin Dockstader Photography",
            "desc": "This is a photography site, built to showcase the work done by a photographer" + 
            ", and allow people to easily see the pricing. This was eventually going to include " + 
            "options for clients to login and see their photos, and select their favorites, and then download them.",
            "backend": "Node.js server, using express to serve the API",
            "database": "MongoDB",
            "frontend": "EJS",
            "gitLink": "https://github.com/rdockstader/DevDockPhoto"
        },
        {
            "title": "Go Track Simple",
            "desc": "A simple calorie tracker Single Page Application, built with the MEAN stack. " + 
            "This was done for a class, and the requirement was to learn something new.  " + 
            "So, I decided to learn more about angular, and the angular materials package.",
            "backend": "Node.js server, using express to serve the API",
            "database": "MongoDB",
            "frontend": "Angular 7",
            "gitLink": "https://github.com/rdockstader/GoTrackSimple",
            "link": "http://www.gotracksimple.com/"
        },
        {
            "title": "Ryan Dockstader Portolio Site",
            "desc": "A website to show off my favorite work, and skills. " + 
            "I really wanted to have some fun with this one, so I decided to build it entirely in   " + 
            "HTML, CSS, and JavaScript without any external Libraries. Feel free to click around the site! " +
            "I built it using primary JavaScript, so you shouldn't have any browser reloads. Also, feel free to " +
            "click the weather icon in the nav bar and set the zip to wherever you are, to load your own weather.",
            "backend": "No backend",
            "database": "No Database",
            "frontend": "HTML/CSS/JavaScript",
            "gitLink": "https://github.com/rdockstader/RyanDockstader.com"
        }
    ];
    // Generate primary row/col
    var projRow = document.createElement('div');
    projRow.classList.add('flex-row');
    var projCol = document.createElement('div');
    projCol.classList.add('flex-col', 'span-3-of-5');
    var spacer = document.createElement('div');
    spacer.classList.add('flex-col', 'span-1-of-5');
    projRow.appendChild(spacer);
    projRow.appendChild(projCol);
    projects.forEach(project => {
        projCol.appendChild(genProjectDiv(project));
    })

    return projRow;
}

function genProjects() {
    var SCREEN_NAME = 'projects'
    var main = getMainSection();

    clearMainSection(function() {
        main.classList.add('page', SCREEN_NAME);
        main.appendChild(genPageTitle('Projects'));
        main.appendChild(genProjectDivs());
    });
}
/***************************************/
/************ABOUT ME PAGE**************/
/***************************************/
function genAboutMeImage(imgPath, alt) {
    var imgCol = document.createElement('div');
    imgCol.classList.add('flex-col', 'span-1-of-5'); 
    var img = document.createElement('img');
    img.src = imgPath;
    img.alt = alt;
    img.classList.add('responsive-img', 'img-box-shadow');
    imgCol.appendChild(img);
    return imgCol;
}

function genAboutMeSummary() {
    var paragraphs = [
        `I'm from a small town in south eastern Idaho, called Preston. If you think you've heard of that before
        you just might be right! It was the location of the film Napoleon Dynamite. Growing up in Preston
        there were a lot of people that grew up on farms, and planned to take over the family farm when
        they grew up. However, I wasn't one of those kids. From as far back as I can remember I wanted to be
        an engineer. I didn't know what that meant, or how to spell it but I knew it was what I wanted
        to be. Somewhere between then and now, I also fell in love with all things technology. From the tech
        behind rockets to the CPUs in a home computer I wanted (and still do) to learn about it all.
        I have a passion for learning, and creating. If it's something that I love, I will spend as long as it
        takes until I know it's the best I can make it. I use that very drive to propel myself forward in learning,
        the work place, and every other facet of my life. `,
        `I love working with code. Primarily, I've worked in JavaScript, with some experience with C#. I love both 
        languages, and would really like to work in them more throughout my career as a software engineer. I also 
        enjoy running my code in the cloud, particuarly AWS. They have many technologies that I am fascinated with, 
        and as such I have worked with in my spare time, such as CloudFront, S3, Elastic Beanstalk, Route 53, Amazon
        Certificate Manager, Elastic Load Balancers, and setting up EC2 instances.`,
        `I enjoy spending the free time that I have with my family, or learning something new on Udemy. I believe that as a 
        software engineer, I will be in for a lifetime of learning since technologies are changing so fast, and that is something
        that I look forward to. I love learning, and discovering new ways to accomplish things (especially if the new way is 
        an improvement on the old)`,
        `Thanks for stopping by my site. If you want any more information about me, or questions for me feel free to shoot me
        an email at ryanldockstader@SpeechGrammarList.com. Thanks again for dropping by!`
    ];

    var summaryCol = document.createElement('div');
    summaryCol.classList.add('flex-col', 'span-3-of-5');
    paragraphs.forEach(paragraph => {
        var summary  = document.createElement('p');
        summary.classList.add('pl-3', 'pr-3');
        summary.innerHTML = paragraph;
        summaryCol.appendChild(summary);
    });
    return summaryCol;
}

function genAboutMe() {
    var SCREEN_NAME = 'aboutMe'
    var main = getMainSection();
    clearMainSection(function() {
        main.classList.add('page', SCREEN_NAME);
        main.appendChild(genPageTitle('About Me'));
        var aboutMeSection = document.createElement('div');
        aboutMeSection.classList.add('flex-row');
        main.appendChild(aboutMeSection);
        aboutMeSection.appendChild(genAboutMeImage('./img/ry.jpg', 'headshot'));
        aboutMeSection.appendChild(genAboutMeSummary());
        aboutMeSection.appendChild(genAboutMeImage('./img/8-bit.png', '8-bit Ryan'));
    });
}

genHome();
genNav();