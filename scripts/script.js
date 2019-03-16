// HELPER FUNCTIONS
var getMainSection = function() {
    return document.getElementById('main-section');
}

var clearMainSection = function() {
    var mainSection = getMainSection();

    while(mainSection.firstChild) {
        mainSection.removeChild(mainSection.firstChild);
    }
    mainSection.style = null;
    mainSection.classList = null;

    return mainSection;
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
    navList.classList.add('main-nav');
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
    wrapperDiv.appendChild(genNavList());
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
    lead.innerHTML = 'Motivated JavaScript, C# developer, and forever learner';
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