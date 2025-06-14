<<<<<<< HEAD


var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
function openmenu(){
sidemenu.style.right = "0";
}
function closemenu(){
sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwBCHPojJJUejikmx_L_ECtdBGbsKXK-bLfEIZXOpgwu1vSC5qa293Q8eBnaR4uQdJPcA/exec'
const form = document.forms['submit-to-google-sheet']
const msg=document.getElementById("msg")
form.addEventListener('submit', e => {
e.preventDefault()
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
.then(response => {msg.innerHTML="Mesage set Successfully"
    setTimeout(function(){
        msg.innerHTML=""
    },500)
    form.reset()
})
.catch(error => console.error('Error!', error.message))
})








=======


var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
function openmenu(){
sidemenu.style.right = "0";
}
function closemenu(){
sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwBCHPojJJUejikmx_L_ECtdBGbsKXK-bLfEIZXOpgwu1vSC5qa293Q8eBnaR4uQdJPcA/exec'
const form = document.forms['submit-to-google-sheet']
const msg=document.getElementById("msg")
form.addEventListener('submit', e => {
e.preventDefault()
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
.then(response => {msg.innerHTML="Mesage set Successfully"
    setTimeout(function(){
        msg.innerHTML=""
    },500)
    form.reset()
})
.catch(error => console.error('Error!', error.message))
})








>>>>>>> 3c4534e7bd97215f93a4ec389f0cb51966357f00
