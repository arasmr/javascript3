"use strict"

const url = "https://api.github.com/repos/HackYourFuture/";
const currentLink = "https://api.github.com/users/";
const repLink = "https://api.github.com/orgs/HackYourFuture/repos";

const root = document.getElementById("root");

const div = createAndAppend("div", root);
div.setAttribute("id", "container");

const gitLogo = createAndAppend("img", div);
gitLogo.setAttribute("src", "images/github.png");
gitLogo.setAttribute("id", "gitLogo");

const hyfLogo = createAndAppend("img", div);
hyfLogo.setAttribute("src", "images/logo.png");
hyfLogo.setAttribute("id", "hyfLogo");


const input = createAndAppend("input", div);
input.setAttribute("placeholder", "Type User Name or Repository Name");
input.setAttribute("type", "text");

const button = createAndAppend("button", div, "Search Hack Your Future Repository");
button.addEventListener("click", repositoryClick);

const button1 = createAndAppend("button", div, "Search User Repositories");
button1.addEventListener("click", userClick); 

//Button Click Event for Repositories= search type name of repositories
function repositoryClick() {
    console.log("You clicked me!");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + input.value);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function () {
        const output = xhr.response;
        renderRepositoryClick(output);
    }
    xhr.onerror = function () {
        xhr.statusText;
    }
}

// render repository button click
function renderRepositoryClick(data) {
    const h1 = createAndAppend("h1", root, data.full_name);
    const ul = createAndAppend("ul", root);
        const li = createAndAppend("li", ul);
        const a = createAndAppend("a", li, data.html_url);
        a.setAttribute("href", data.html_url);
    a.setAttribute("target", "_blank");
    const xhrCont = new XMLHttpRequest();
    xhrCont.open("GET", data.contributors_url);
    xhrCont.send();
    xhrCont.responseType = "json";
    xhrCont.onload = function () {
        const output = xhrCont.response;
        getContributors(output);
    }
}

function getContributors(data) {
    for (let i = 0; i < data.length; i++){
        const ul = createAndAppend("ul", root);
        const li = createAndAppend("li", ul);
        // const p = createAndAppend("p", li, data.html_url);
        const a = createAndAppend("a", li,"<hr><br>"+ data[i].login + "<br><br>");
        a.setAttribute("href", data[i].html_url);
        a.setAttribute("target", "_blank");
        const img = createAndAppend("img", li);
        img.setAttribute("src", data[i].avatar_url);

    }
}



//Button Click Event For Repository= searching type by user name
function userClick() {
    console.log("You clicked me!");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", currentLink + input.value + "/repos");
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function () {
        const output = xhr.response;
        renderUserClick(output);
    }
    xhr.onerror = function () {
        console.log(xhr.statusText);
    }
}

// render user button click
function renderUserClick(data) {
    console.log("You clicked me!");
    for (let i = 0; i < data.length; i++){
        const h1 = createAndAppend("h1", root, data[i].name);
        h1.setAttribute("id", "reposName");
        const p = createAndAppend("p", root);
        const a = createAndAppend("a", p, data[i].html_url);
        a.setAttribute("href", data[i].html_url);
        a.setAttribute("target", "_blank");
    }
}

// create and append function
function createAndAppend(name, append,innerHTML) {
    const child = document.createElement(name);
    append.appendChild(child);
    if (innerHTML !== undefined) {
        child.innerHTML = innerHTML;
    }
    return child;
}