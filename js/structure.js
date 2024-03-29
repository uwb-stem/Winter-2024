
/*              JS for mobile nav bar stuff                 */ 
 const dawgdropsItems = document.querySelectorAll('.dawgdrops-item');
  
  // we only want one drop down item at a time, we'll use an array of bools 
  // to keep track of any menus that are showing, so we can turn off the correct ones
 //  and only show the selected one
  const toggled = new Array(dawgdropsItems.length).fill(false);  
  
  for (let i = 0; i < dawgdropsItems.length; i++) {
        dawgdropsItems[i].addEventListener('click', function () {
            this.classList.toggle('active');
            let dawgdropsMenu = this.querySelector('.dawgdrops-menu');
            if (dawgdropsMenu.style.display === 'block') {
                dawgdropsMenu.style.display = 'none';
            	toggled[i]=false;	
	    } else {
                dawgdropsMenu.style.display = 'block';
            	toggled[i] = true;
	    }
	   //turn off the other activated menus
	   for (let j = 0; j < toggled.length; j++){
		if (j===i) continue;
		if (toggled[j] === true) {
			dawgdropsItems[j].querySelector('.dawgdrops-menu').style.display = 'none';
		}
	   }
        });
    }



/* ---------------------------- Side Navigation Bar ---------------------------- */
var navIsOpen = false;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {

    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
    document.getElementById("sideNavBtn").innerHTML = "Close Index";
    
    let projects = document.querySelectorAll(".projectUl");
    presentationMargin = window.innerWidth / 2 - 640;

    for (let i  = 0; i < projects.length; i++) {
        projects[i].style.width = "600px";
        // projects[i].style.marginLeft = "300px";
        projects[i].style.marginLeft = presentationMargin + "px";
    }
    navIsOpen = true;
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("sideNavBtn").innerHTML = "See All Projects";

    let projects = document.querySelectorAll(".projectUl");

    for (let i  = 0; i < projects.length; i++) {
        projects[i].style.width = "1000px";
        projects[i].style.margin = "auto";
    }

    navIsOpen = false;
}

function sideNavEvent(className) {
    if (navIsOpen) {
        closeNav(className);
    } else {
        openNav(className);
    }
}

function changeOpactiy(tagName, opacity) {
    let elements = document.getElementsByTagName(tagName);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.opacity = opacity;
    }
}

function dimBackground() {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    changeOpactiy("img", "0.5");
    changeOpactiy("button", "0.4");
    changeOpactiy("hr", "0.4");
}

function undimBackground() {
    changeOpactiy("img", "1");
    changeOpactiy("button", "1");
    changeOpactiy("hr", "1");
}

/* --------------------------- Multiple Rooms Implementation --------------------------- */
const zoomLinks = [
    'https://google.com',
    'https://google.com',
    'https://google.com',
    'https://google.com',
    /* 'https://google.com',
    'https://google.com',
    'https://google.com' */
]

if (typeof document.getElementById("room-1-presentations") != "undefined") {
    loadCSSEPresentations("room-1-presentations", "js/csseRoom1.json");
    loadCSSEPresentations("room-2-presentations", "js/csseRoom2.json");
    loadCSSEPresentations("room-3-presentations", "js/csseRoom3.json");
    loadCSSEPresentations("room-4-presentations", "js/csseRoom4.json");
   // loadCSSEPresentations("room-5-presentations", "js/csseRoom5.json");
   // loadCSSEPresentations("room-6-presentations", "js/csseRoom6.json");
    
   // loadCSSEPresentations("room-7-presentations", "js/csseRoom7.json"); 
  //  loadCSSEPresentations("room-8-presentations", "js/csseRoom8.json"); 
    
    loadTitleToSideNav("js/csseRoom1.json");
    loadTitleToSideNav("js/csseRoom2.json");
    loadTitleToSideNav("js/csseRoom3.json");
    loadTitleToSideNav("js/csseRoom4.json");
  //  loadTitleToSideNav("js/csseRoom5.json");
   //  loadTitleToSideNav("js/csseRoom6.json");
    //loadTitleToSideNav("js/csseRoom7.json");
 //   loadTitleToSideNav("js/csseRoom6.json");
 //   loadTitleToSideNav("js/csseRoom7.json"); 
   // loadTitleToSideNav("js/csseRoom8.json"); 

}

function printNumResults(num, searchKey) {
    let container = document.getElementById("num-result");
    let text = document.createTextNode("Found " + num + " results for '" + searchKey + "'.");
    container.appendChild(text);
}

function search(projectId) {

    let presentations;
    let isREU = false;
    let addAbstractButton = false;

    if (projectId.includes('preu')) {
        presentations = JSON.parse(readTextFile('./js/reu.json'))['preu'];
        isREU = true;
    } else if (projectId.includes('ereu')) {
        presentations = JSON.parse(readTextFile('./js/ereu.json'))['ereu'];
        isREU = true;
    } else if (projectId.includes('bio')) {
        presentations = JSON.parse(readTextFile('./js/bio.json'))['bio'];
    } else if (projectId.includes('phys')) {
        presentations = JSON.parse(readTextFile('./js/chem + phys.json'))['phys'];
    } else if (projectId.includes('chem')) {
        presentations = JSON.parse(readTextFile('./js/chem + phys.json'))['chem'];
    } else if (projectId.includes('ee')) {
        presentations = JSON.parse(readTextFile('./js/ee.json'))['ee'];
    } else if (projectId.includes('ac')) {
        presentations = JSON.parse(readTextFile('./js/ac.json'))['ac'];
    } else {
        const room = projectId[5];
        const jsonfile = './js/csseRoom' + room + '.json';
        presentations = JSON.parse(readTextFile(jsonfile))['csse'];
        addAbstractButton = true;
    }

    for (let i = 0; i < presentations.length; i++) {
        if (presentations[i].projectId === projectId) {
            createPresentationBox(presentations[i], "", isREU, addAbstractButton);
        }
    }
}

function loadCSSEPresentations(room, jsonfile) {
   
    let container = document.getElementById(room);
    let presentations = JSON.parse(readTextFile(jsonfile))['csse'];
    let zoomLinkText = document.createElement("p");
    zoomLinkText.classList.add("text");
    let zoomLink = document.createElement("a");
    zoomLink.href = zoomLinks[presentations[0].projectId[5] - 1];
    zoomLink.target = '_blank';
    //zoomLink.innerHTML = "Click here to join the live CSSE presentations in room " +  presentations[0].projectId[5];
    // zoomLinkText.innerText = "Click here to join the live CSSE presentations in room " + presentations[0].projectId[5];

    for (let i = 0; i < presentations.length; i++) {
        /*
        if (i == 0) {
            
            if (room == 'room-1-presentations') {
                let contentDiv = document.createElement("div");
                contentDiv.classList.add("info-box");

                let boxTime = document.createElement("h4");     
                boxTime.appendChild(document.createTextNode("1:05 PM - 1:30 PM"));

                let words = document.createElement("p");
                words.appendChild(document.createTextNode("Applied Computing Presentations"));

                contentDiv.appendChild(boxTime);
                contentDiv.appendChild(words);
                container.appendChild(contentDiv);
            } 
        }
*/
        createPresentationBox(presentations[i], container, false, true);
    }
    
    
}

function createPresentationBox(presentationInfo, container, isREU, addAbstractButton) {
    
    if (container === "") {
        container = document.getElementById("presentation");
        // presentationInfo = JSON.parse(presentationInfo);
    }
    
    let presentation = document.createElement("section");
    presentation.classList.add("presentation");

    // add projectId so that when user click on the project on side nav,
    // it goes to the correct presentation box
    presentation.setAttribute("id", presentationInfo.projectId);

    if (isREU) {
        presentation.classList.add("reu");
    }

    let contentUl = document.createElement("ul");
    // contentUl.classList.add("projectUl");
    let textLi = document.createElement("li");

    // time
    let time = document.createElement("p");
    time.classList.add("present-time");
    time.appendChild(document.createTextNode(presentationInfo.time));
    textLi.appendChild(time);

    // short black line
    let blackLine = document.createElement("hr");
    blackLine.classList.add("short-black-line");
    textLi.appendChild(blackLine);

    // project title
    let title = document.createElement("h3");
    title.appendChild(document.createTextNode(presentationInfo.title));
    textLi.appendChild(title);

    addStudents(presentationInfo, textLi, isREU);

    // faculty advisor
    let advisor = document.createElement("p");
    advisor.appendChild(document.createTextNode("Faculty advisor: " + presentationInfo.facultyAdvisor));
    textLi.appendChild(advisor); 

    // button to abstract page
    if (addAbstractButton) {
        let space = document.createElement("div");
        space.classList.add("small-space");
        textLi.appendChild(space);

        let abstractPageBtn = document.createElement("a");
        abstractPageBtn.href = './csse-abstract-page.html?' + presentationInfo.projectId;
        abstractPageBtn.target = '_blank';
        abstractPageBtn.classList.add("uw-btn", "btn-sm");
        abstractPageBtn.innerHTML = "Read abstract";
        textLi.appendChild(abstractPageBtn);
    }


    let splitPosters = presentationInfo.posterLink.split("\n\n");
    let posterLi = document.createElement("li");

    loadPosters(splitPosters,document, posterLi);

    contentUl.appendChild(textLi);
    contentUl.appendChild(posterLi);
    presentation.appendChild(contentUl);

    container.appendChild(presentation);
}

/**
 * 
 * @param {Array<string>} splitPosters 
 * @param {Document} document 
 * @param {HTMLElement} posterLi 
 * 
 * Loads the posters into the presentation card. If there are multiple poster links
 * in splitposters, the function will insert each poster in order they appear in splitPosters
 * 
 */
function loadPosters(splitPosters,document, posterLi){
    for(let i = 0; i<splitPosters.length; i++){
        let posterImg = document.createElement("img");
        posterImg.setAttribute('src', splitPosters[i]);
        posterLi.appendChild(posterImg);
        }
    

}

function addStudents(presentationInfo, textLi, isREU) {

    let studentDiv = document.createElement("div");

    if (presentationInfo.group) {               // if "group" exists in json, e.g. csse-room-6
        addGroup(presentationInfo, studentDiv);

    } else if (isREU) {
        studentDiv.classList.add("students-extend", "reu-student");
        let div = document.createElement("div");

        let studentName = document.createElement("h4");     // student name
        studentName.appendChild(document.createTextNode(presentationInfo.studentName));
        div.appendChild(studentName);

        let university = document.createElement("h5");           // university
        university.classList.add("university");
        university.appendChild(document.createTextNode(presentationInfo.university));
        div.appendChild(university);
        studentDiv.appendChild(div);
    } else {
        studentDiv.classList.add("students");

        let studentName = document.createElement("h4");     // student name
        let splitStudentName = presentationInfo.studentName.split("\n\n");
        //let brk = document.createElement("br");
        //let brk2 = document.createElement("br");
        for (let i = 0; i < splitStudentName.length; i++) {
            let splitText = document.createElement("h4");
            splitText.classList.add("text");
            splitText.innerText = splitStudentName[i].replace("\n\n", " ");
        }

        if (splitStudentName.length > 1) {
         //   studentName.appendChild(document.createTextNode(splitStudentName[0]));
         //   studentName.appendChild(brk);
         //   studentName.appendChild(document.createTextNode(splitStudentName[1]));
         //   studentName.appendChild(brk2);
         //   studentName.appendChild(document.createTextNode(splitStudentName[2]));
        
	for(let i = 0; i< splitStudentName.length; i++){
            studentName.appendChild(document.createTextNode(splitStudentName[i]));	   
            studentName.appendChild(document.createElement("h4"));

	}
		


	} else {
            studentName.appendChild(document.createTextNode(splitStudentName));
        }
        
        studentDiv.appendChild(studentName);

        let major = document.createElement("h5");           // major
        major.classList.add("majors");
       
        let splitMajors = presentationInfo.studentMajor.split("\n\n");
        let brk3 = document.createElement("br");
        let brk4 = document.createElement("br");

        for (let i = 0; i < splitMajors.length; i++) {
            let a2Text = document.createElement("h5");
            a2Text.classList.add("text");
            a2Text.innerText = splitMajors[i].replace("\n\n", " ");
        }

        if (splitMajors.length > 1) {
	for(let i = 0; i< splitMajors.length; i++){
            major.appendChild(document.createTextNode(splitMajors[i]));	   
            major.appendChild(document.createElement("h5"));

	}
	
	} else {
            major.appendChild(document.createTextNode(splitMajors));
        }

        studentDiv.appendChild(major);
        
    }

    textLi.appendChild(studentDiv);
    
    // Applied Computing Capstones don't have a project type, so if we are creating
    // the html for a project, dont include a project type element if its applied computing
    // For this to work, the project type field in the JSON data must be set to "Applied Computing":
    // i.e:
    /*
           "time": ...,
            "projectId": ...",
            "title": "Project Title",
            "studentName":...",
            "studentMajor": ...",
            "projectType": "Applied Conputing",  
            "facultyAdvisor": ...,
            "posterLink": "...",
            "abstract": ""
        }, 
     
     */
    if (presentationInfo.projectType !== "Applied Computing"){
    let projectType = document.createElement("p");       // project type
    projectType.appendChild(document.createTextNode("Project type: " + presentationInfo.projectType));
    textLi.appendChild(projectType);
    }
}

function addGroup(presentationInfo, studentDiv) {
    studentDiv.classList.add("students");
    let studentName = document.createElement("h4");
    let major = document.createElement("h5");
    major.classList.add("majors");

    for (let i = 0; i < presentationInfo.group.length; i++) {
        studentName.innerHTML += presentationInfo.group[i].studentName + "<br/>";
        major.innerHTML += presentationInfo.group[i].studentMajor + "<br/>";
    }

    studentDiv.appendChild(studentName);
    studentDiv.appendChild(major);
}

function loadTitleToSideNav(jsonfile) {
    let sideNav = document.getElementById('mySidenav');
    let presentations = JSON.parse(readTextFile(jsonfile))['csse'];

    let roomDiv = document.createElement("div");
    roomDiv.classList.add("side-room-number");
    roomDiv.innerHTML = "Room " + presentations[0].projectId[5];

    let ul = document.createElement("ul");

    for (let j = 0; j < presentations.length; j++) {
        let presentationLi = document.createElement("li");
        presentationLi.classList.add("sidenav-title");
        presentationLi.setAttribute("data-id", presentations[j].projectId);
        
        let aTitle = document.createElement('a');
        let studentName = document.createElement('span');
        
        if (presentations[j].group) {
            for (let k = 0; k < presentations[j].group.length; k++) {
                studentName.innerHTML += presentations[j].group[k].studentName + "<br/>";
            }
        } else {
            studentName.appendChild(document.createTextNode(presentations[j].studentName));
        }
        aTitle.innerHTML = presentations[j].title + "<br/>";
        aTitle.appendChild(studentName);
        aTitle.href = '#';

        presentationLi.appendChild(aTitle);
        ul.appendChild(presentationLi);
        presentationLi.setAttribute("data-search", presentations[j].title + " " + studentName.textContent);

    }

    sideNav.appendChild(roomDiv);
    sideNav.appendChild(ul);
}


function isFilePathValid(filePath) {
  return fetch(filePath)
    .then(response => {
      if (response.ok) {
        return true; // File exists and can be fetched
      } else {
        return false; // File doesn't exist or can't be fetched
      }
    })
    .catch(error => {
      console.error(error);
      return false; // Error occurred while fetching the file
    });
}


function readTextFile(file) {
 	
    if (!isFilePathValid(file)) return;

    let raw_file = new XMLHttpRequest();
    raw_file.open("GET", file, false);
    let file_content = "";
    raw_file.onreadystatechange = function ()
    {
        if (raw_file.readyState === 4)
        {
            if (raw_file.status === 200 || raw_file.status == 0)
            {
                file_content = raw_file.responseText;
            }
        }
    }
    raw_file.send(null);
    return file_content;
}

// Print nav bar from html template file
// document.getElementById("navb").innerHTML = readTextFile("js/navbar.html");

// console.log(navIsOpen);

// while (navisOpen == true) {
//     while (window.scrollY >= 175) {
//         document.getElementById("mySidenav").style.height = "100%";
//         document.getElementsByClassName
//     }

//     while (window.scrollY < 175) {
//         changeMargin = 175 - window.scrollY;
//         document.getElementsByClassName("sidenav").style.marginTop = changeMargin;//.toString();
//     }
// }
