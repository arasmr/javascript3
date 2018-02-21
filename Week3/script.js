"use strict"
{
    //  API Links to Fetch
 
    const repLink = "https://api.github.com/repos/HackYourFuture/";
    const userLink = "https://api.github.com/users/";
 
    // Linked With The Html
 
    const root = document.getElementById("root");
 
    // header(logos,buttons,input label)
 
    const header = createAndAppend("div", root);
    header.setAttribute("id", "header");
    const container = createAndAppend("div", root);
    container.setAttribute("id", "container");
 
    // <img> tag for logo
 
    const gitLogo = createAndAppend("img", header);
    gitLogo.setAttribute("src", "images/github.png");
    gitLogo.setAttribute("class", "logo");

    const hyfLogo = createAndAppend("img", header);
    hyfLogo.setAttribute("src", "images/logo.png");
    hyfLogo.setAttribute("class", "logo");

    const input = createAndAppend("input", header);
    input.setAttribute("placeholder", "Type User Name or Repository Name");
    input.setAttribute("type", "text");

    const button = createAndAppend("button", header, "Search Hack Your Future Repository");
    button.addEventListener("click", repositoryClick);

    const button1 = createAndAppend("button", header, "Search User Repositories");
    button1.addEventListener("click", userClick);

    // Render Repository Button Click

    function repositoryClick() {
        const repUrl = repLink + input.value;
        getJson(repUrl).then((data) => {
            const repositoryName = createAndAppend("h1", container, data.full_name);
            repositoryName.setAttribute("id", "repositoryName");
            const repositoryUrl = createAndAppend("a", container, "Link Of Repository: " + data.html_url);
            repositoryUrl.setAttribute("id", "repositoryUrl");
            repositoryUrl.setAttribute("href", data.html_url);
            repositoryUrl.setAttribute("target", "_blank");
            const contributor= createAndAppend("h2", container, "Contributors");
            contributor.setAttribute("id", "contributors");
            const contributorsList = createAndAppend("ul", container);
            // nested Json to get contributors from the parent Json file
            getJson(data.contributors_url).then((newData) => {
                for (let i = 0; i < newData.length; i++) {
                    const li = createAndAppend("li", contributorsList);
                    contributorsList.setAttribute("id", "contributorListLi");
                    const a = createAndAppend("a", li,"<hr>" + "User Name: " + newData[i].login + "<br><br>");
                    a.setAttribute("href", newData[i].html_url);
                    a.setAttribute("target", "_blank");
                    a.setAttribute("id", "userLoginLink");
                    const userAvatar = createAndAppend("img", li);
                    userAvatar.setAttribute("src", newData[i].avatar_url + "<hr>");
                    userAvatar.setAttribute("id", "userAvatar");
                }
            })
        })
    }

    // Render User Button Click

    function userClick() {
        const userUrl = userLink + input.value + "/repos";
        getJson(userUrl).then((data) => {
            const userLogo = createAndAppend("img", container);
            userLogo.setAttribute("src", data[0].owner.avatar_url);
            userLogo.setAttribute("id", "userLogo");
            const userName = createAndAppend("h2", container, data[0].owner.login);
            userName.setAttribute("id", "userName");
            for (let i = 0; i < data.length; i++) {
                const reposName= createAndAppend("h2", container, data[i].name);
                reposName.setAttribute("id", "reposName");
                const reposLink= createAndAppend("a", container, data[i].html_url);
                reposLink.setAttribute("href", data[i].html_url);
                reposLink.setAttribute("target", "_blank");
                reposLink.setAttribute("id", "reposLink");
            }
        })
    }

    // XMLHttpRequest to Fetch Json File

    function getJson(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "json";
            xhr.send();
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(new Error(xhr.statusText));
        })
    }

    // Create and Append Function for DRY(do not repeat yourself)

    function createAndAppend(name, append, innerHTML) {
        const child = document.createElement(name);
        append.appendChild(child);
        if (innerHTML !== undefined) {
            child.innerHTML = innerHTML;
        }
        return child;
    }
}
