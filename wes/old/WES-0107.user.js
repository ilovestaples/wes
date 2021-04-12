// ==UserScript==
// @name         WES
// @namespace    none
// @version      0.1.0.7
// @description  .win enhancement suite - stable version
// @author       melvin
// @include      https://communities.win/*
// @include      https://consumeproduct.win/*
// @include      https://gavinmcinnes.win/*
// @include      https://kotakuinaction.win/*
// @include      https://kotakuinaction2.win/*
// @include      https://omegacanada.win/*
// @include      https://thedonald.win/*
// @include      https://weekendgunnit.win/*
// @grant        GM.setValue
// @grant        GM.getValue
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @downloadURL  https://github.com/ilovestaples/wes/raw/master/wes/WES.user.js
// @updateURL    https://github.com/ilovestaples/wes/raw/master/wes/WES.user.js
// ==/UserScript==

(function() {
    'use strict';


    console.log("WES " + GM.info.script.version);

    /************************ 1. Setup ************************/

    var wes = {
        params: {
            expandMedia : false
        },

        expandMedia : function(media){
            if(media && media.hasAttribute("data-action")){
                media.click();
            }

            $(media).closest('.post').find('.content').first().removeAttr('data-opened');
        }
    }

        /************************ 2. Create navigation bar ************************/

        var topBarCss = '.tool-bar-link {text-decoration: none;color: white;font-family: sans-serif;font-size: 13px;}.tool-bar-link {color:#fff;-moz-transition: all 0.1s ease-in;-o-transition: all 0.1s ease-in;-webkit-transition: all 0.1s ease-in;transition: all 0.1s ease-in;}.tool-bar-link:hover { color: #ff9d07; text-shadow: 0px 0px 8px #ff9d07;-moz-transition: all 0.1s ease-in;-o-transition: all 0.1s ease-in;-webkit-transition: all 0.1s ease-in; transition: all 0.1s ease-in;}.tool-bar-link:active {color: #ff9d07; text-shadow: 0px 0px 3px #ff9d07;-moz-transition: all 0.1s ease-in;-o-transition: all 0.1s ease-in;-webkit-transition: all 0.1s ease-in; transition: all 0.1s ease-in;}.bar-link{ font-family: sans-serif;font-size: 13px; color: white; text-decoration: none; position: relative;}.bar-link::after{ content: ""; background: white;mix-blend-mode: exclusion; width: calc(90% + 20px); height: 0; position: absolute; bottom: -3px; left: -6px;transition: all .3s cubic-bezier(0.445, 0.05, 0.55, 0.95);}.bar-link:hover::after{height: calc(100% + 8px)}';

        var topBarStyle = document.createElement('style');
        topBarStyle.className = "style-tag";
        document.body.appendChild(topBarStyle);

        var appendedTopBarStyle = document.querySelector(".style-tag");
        if(appendedTopBarStyle){
            appendedTopBarStyle.innerHTML = topBarCss;
        }



        const winsitesArray = ["thedonald", "consumeproduct", "omegacanada", "kotakuinaction", "kotakuinaction2", "gavinmcinnes", "weekendgunnit", "communities"];

        var topBar = document.createElement('div');
        topBar.className = "top-bar"
        topBar.style.height = "30px";
        topBar.style.backgroundColor = "black";
        topBar.style.width = "auto";
        topBar.style.opacity = 0.5;
        topBar.style.display = "flex";
        topBar.style.alignItems = "center";
        topBar.style.position = "absolute";

        var linklist = document.createElement('ul');
        linklist.style.listStyle = "none";

        for (var i = 0; i < winsitesArray.length; i++) {

            addWhiteSpaceToList(linklist);

            var newli = document.createElement('li');
            newli.style.display = "inline";
            newli.style.color = "white";
            newli.style.padding = "5px";

            var newlink = document.createElement('a');
            newlink.href = "https://" + winsitesArray[i] + ".win/";
            newlink.innerHTML = winsitesArray[i];
            newlink.className = "bar-link";
            newlink.padding = "10px"

            newli.appendChild(newlink);
            linklist.appendChild(newli);

            addWhiteSpaceToList(linklist);

            if (i < winsitesArray.length - 1) {
                addDividerToList(linklist)
            }
        }

        topBar.appendChild(linklist);

        var wrapper = document.getElementsByClassName("wrapper");
        var header = document.getElementsByClassName("header");

        if(wrapper[0] && header[0]){
            wrapper[0].insertBefore(topBar, header[0]);
        }

        var themeSwitcher = document.querySelector(".theme-switcher");
        if(themeSwitcher){
            themeSwitcher.style.zIndex =1;
        }

    /************************ 3. Create tools bar ************************/



    var container = document.querySelector(".container");
    var wrapperHome = document.querySelector(".wrapper.home");

    if(wrapperHome && container){

        var tools_bar = document.createElement('div');
        tools_bar.className = "top-bar"
        tools_bar.style.height = "30px";
        tools_bar.style.backgroundColor = "black";
        tools_bar.style.width = "auto";
        tools_bar.style.opacity = 0.5;
        tools_bar.style.display = "flex";
        tools_bar.style.alignItems = "center";
        tools_bar.style.justifyContent = "center"

        var toolslist = document.createElement('ul');
        toolslist.style.listStyle = "none";

        newli = document.createElement('li');
        newli.style.display = "inline";
        newli.style.color = "white";

        newlink = document.createElement('a');
        newlink.href = "#";

        newlink.innerHTML = "expand content";
        newlink.className = "tool-bar-link";
        newlink.padding = "10px";
        newlink.id = "expand-media";

        newli.appendChild(newlink);
        toolslist.appendChild(newli);
        tools_bar.appendChild(toolslist);

        wrapperHome.insertBefore(tools_bar, container);


        /************************ 3.1. expand media ************************/

        var expandMediaButton = document.getElementById('expand-media');

        expandMediaButton.onclick = function(){

            console.log('Expanding thumbnails');

            var thu = document.getElementsByClassName("thumb");
            var len = thu.length;

            for(i = 0; i < len /*- 1*/ ; i++){
                wes.expandMedia(thu[i]);
            }

            wes.params.expandMedia = !wes.params.expandMedia;
        }
    }


    /************************ 4. post/comment point redirection ************************/

        var navuser = document.querySelector(".nav-user.active");
        if(navuser){

          var username = navuser.children[0].children[0].text;
          var postKarma = document.createElement('a');
          var commentKarma = document.createElement('a');

          postKarma.href = "https://" + window.location.hostname +"/u/" + username + "/?type=post";
          commentKarma.href = "https://" + window.location.hostname +"/u/" + username + "/?type=comment";

          var pointsText = navuser.children[0].childNodes[2];
          var pointsTextContent = pointsText.textContent;

          var postKarmaText = pointsTextContent.substring(pointsTextContent.indexOf("(") + 1, pointsTextContent.indexOf("•") - 1);
          var commentKarmaText = pointsTextContent.substring(pointsTextContent.indexOf("•") + 2, pointsTextContent.indexOf(")"));

          postKarma.innerHTML = postKarmaText;
          postKarma.title = "submitted"
          commentKarma.innerHTML = commentKarmaText;
          commentKarma.title = "comments";

          var sp = document.createElement('span');
          var text1 = document.createElement('text');
          var text2 = document.createElement('text');
          var text3 = document.createElement('text');

          text1.textContent = "(";
          text2.textContent = " • ";
          text3.textContent = ")";

          sp.appendChild(text1);
          sp.appendChild(postKarma);
          sp.appendChild(text2);
          sp.appendChild(commentKarma);
          sp.appendChild(text3);

          navuser.children[0].insertBefore(sp, pointsText);
          navuser.children[0].removeChild(pointsText);
        }



    /************************ 5. Automatic Quotes ************************/

    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        text = text.split("\r\n");
        while(text.indexOf("") > -1){
            text.splice(text.indexOf(""), 1);
        }
        return text;
    }

    //if im viewing a post:
    if(document.location.href.search("/p/") > 0){

        //save selected text before replying
        var selectedText = "";
        document.body.onmouseup = function(){
            selectedText = getSelectionText();
        }

        //make a MutationObserver for comments
        const moConfig = { attributes: true, childList: true, subtree: true };
        const moCallback = function(mutationsList, observer) {
            for(let mutation of mutationsList){

                var commentLines = "";
                var textarea = "";
                var replyFormAdded = mutation.target.className && (!mutation.target.className.toString().localeCompare("body")) && mutation.type === 'childList';
                var replyFormShown = mutation.target.className && (!mutation.target.className.toString().localeCompare("form reply active")) && mutation.type === 'attributes';

                //if its the first time the reply button was clicked:
                if(replyFormAdded){
                    commentLines = mutation.target.querySelector('.rendered').children;
                }

                //if im expanding the reply form
                if(replyFormShown){
                    commentLines = mutation.target.parentElement.querySelector('.rendered').children;
                }

                if(replyFormAdded || replyFormShown){

                    textarea = mutation.target.querySelector("textarea");
                    for(let line of selectedText){
                        for(let commentLine of commentLines){

                            if(commentLine.innerText.includes(line)){
                                textarea.value += "> " + line + "\n\n";
                            }
                        }
                    }

                    //keep this functionality in the 'reply' button for as long as the comment box is being displayed
                    mutation.target.parentElement.querySelector('a[data-action="reply"]').onclick = function(){

                        var selectedTextReplyOnClick = getSelectionText();
                        var textareaReplyOnClick = this.parentElement.parentElement.querySelector("textarea");
                        var commentLinesReplyOnClick = this.parentElement.parentElement.querySelector('.rendered').children;

                        try {
                            for(let line of selectedTextReplyOnClick){
                                for(let commentLine of commentLinesReplyOnClick){

                                    if(commentLine.innerText.includes(line)){
                                        textareaReplyOnClick.value += "> " + line + "\n\n";
                                    }
                                }
                            }
                        }
                        catch (error){
                            console.log(error);
                        }
                    }
                }

                //if im hitting cancel
                if(mutation.target.className && (!mutation.target.className.toString().localeCompare("form reply")) && mutation.type === 'attributes'){
                    textarea = mutation.target.querySelector("textarea");
                    textarea.value = "";

                    mutation.target.parentElement.querySelector('a[data-action="reply"]').onclick = "";

                }
            }
        };

        const commentsObserver = new MutationObserver(moCallback);

        var comments = document.getElementsByClassName("comment");
        for (var j = 0; j < comments.length; j++) {
            comments[j].onmousedown = function(){
                commentsObserver.observe(this, moConfig);
                //console.log("Observing " + this);
            }
        }
    }




    /************************ 6. Automatically expand content ************************/

    //if im on a main page, expand (or not) content in next pages automatically
    var postList = document.querySelector(".post-list");//maybe find another way of checking if im on a main page
    if(postList){

        const plmoConfig = { attributes: false, childList: true, subtree: false };
        const plmoCallback = function(mutationsList, observer) {
            if(wes.params.expandMedia){
                for(let mutation of mutationsList){

                    for(let node of mutation.addedNodes){
                        var media = node.querySelector(".thumb");
                        wes.expandMedia(media);
                    }
                }
            }
        }

        const postListObserver = new MutationObserver(plmoCallback);
        postListObserver.observe(postList, plmoConfig);
    }

    /************************ 7. Update notification ************************/


    //Thank you: https://codepen.io/takaneichinose/pen/eZoZxv

    class MessageBox {
        constructor(id, option) {
            this.id = id;
            this.option = option;
        }

        show(msg, label = "Close", callback = null) {
            if (this.id === null || typeof this.id === "undefined") {
                // if the ID is not set or if the ID is undefined

                throw "Please set the 'ID' of the message box container.";
            }

            if (msg === "" || typeof msg === "undefined" || msg === null) {
                // If the 'msg' parameter is not set, throw an error

                throw "The 'msg' parameter is empty.";
            }

            if (typeof label === "undefined" || label === null) {
                // Of the label is undefined, or if it is null

                label = "Close";
            }

            let option = this.option;

            let msgboxArea = document.querySelector(this.id);
            let msgboxBox = document.createElement("DIV");
            let msgboxContent = document.createElement("DIV");
            let msgboxClose = document.createElement("A");

            if (msgboxArea === null) {
                // If there is no Message Box container found.

                throw "The Message Box container is not found.";
            }

            // Content area of the message box
            msgboxContent.classList.add("msgbox-content");
            msgboxContent.innerHTML = msg;

            // Close button of the message box
            msgboxClose.classList.add("msgbox-close");
            msgboxClose.setAttribute("href", "#");
            msgboxClose.innerText = label;

            // Container of the Message Box element
            msgboxBox.classList.add("msgbox-box");
            msgboxBox.appendChild(msgboxContent);

            if (option.hideCloseButton === false
                || typeof option.hideCloseButton === "undefined") {
                // If the hideCloseButton flag is false, or if it is undefined

                // Append the close button to the container
                msgboxBox.appendChild(msgboxClose);
            }

            msgboxArea.appendChild(msgboxBox);

            msgboxClose.addEventListener("click", (evt) => {
                evt.preventDefault();

                if (msgboxBox.classList.contains("msgbox-box-hide")) {
                    // If the message box already have 'msgbox-box-hide' class
                    // This is to avoid the appearance of exception if the close
                    // button is clicked multiple times or clicked while hiding.

                    return;
                }

                this.hide(msgboxBox, callback);
            });

            if (option.closeTime > 0) {
                this.msgboxTimeout = setTimeout(() => {
                    this.hide(msgboxBox, callback);
                }, option.closeTime);
            }
        }

        hide(msgboxBox, callback) {
            if (msgboxBox !== null) {
                // If the Message Box is not yet closed

                msgboxBox.classList.add("msgbox-box-hide");
            }

            msgboxBox.addEventListener("transitionend", () => {
                if (msgboxBox !== null) {
                    // If the Message Box is not yet closed

                    msgboxBox.parentNode.removeChild(msgboxBox);

                    clearTimeout(this.msgboxTimeout);

                    if (callback !== null) {
                        // If the callback parameter is not null
                        callback();
                    }
                }
            });
        }
    }

    // Creation of Message Box class
    let msgboxbox = new MessageBox("#msgbox-area", {
        closeTime: 7000,
        hideCloseButton: false
    });


    var version = GM.getValue("wes_version");
    version.then(function(result) {

        if(result === undefined){
            GM.setValue("wes_version",GM.info.script.version);
            return;
        }


        var compareVersions = GM.info.script.version.localeCompare(result);

        if(compareVersions){

            var notificationCss = '@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");.msgbox-area { max-height: 100%; position: fixed; bottom: 15px; left: 20px; right: 20px;}.msgbox-area .msgbox-box { font-size: inherit; color: #ffffff; background-color: rgba(0, 0, 0, 0.8); padding: 18px 20px; margin: 0 0 15px; display: flex; align-items: center; position: relative; justify-content: space-between; border-radius: 12px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.65); transition: opacity 300ms ease-in;}.msgbox-area .msgbox-box.msgbox-box-hide { opacity: 0;}.msgbox-area .msgbox-box:last-child { margin: 0;}.msgbox-area .msgbox-content { flex-shrink: 1;}.msgbox-area .msgbox-close { color: #ffffff; font-weight: bold; text-decoration: none; margin: 0 0 0 20px; flex-grow: 0; flex-shrink: 0; position: relative; transition: text-shadow 225ms ease-out;}.msgbox-area .msgbox-close:hover { text-shadow: 0 0 3px #efefef;}@media (min-width: 481px) and (max-width: 767px) { .msgbox-area { left: 80px; right: 80px; }}@media (min-width: 768px) { .msgbox-area { width: 480px; height: 0; top: 15px; left: auto; right: 15px; }}.msgbox-area { font-size: 16px;}.msgbox-message-container { text-align: center; width: 100vw; height: 100vh; padding: 20px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; flex-direction: column;}.msgbox-message-container h1, .msgbox-message-container h3 { margin: 10px 20px;}.msgbox-message-container p { margin: 5px 20px;}.msgbox-message-button { font-size: 18px; font-weight: bold; font-family: inherit; color: white; background-color: #1476ff; width: 250px; border: solid 2px #005de0; padding: 10px 20px; cursor: pointer; outline: none; box-shadow: 0 5px #005de0; transition: background-color 100ms ease-out, box-shadow 100ms ease-out, transform 100ms ease-out;}.msgbox-message-button:hover, .msgbox-message-button:focus, .msgbox-message-button:active { background-color: #2e85ff;}.msgbox-message-button:active { background-color: #0068fa; box-shadow: 0 0 #005de0; transform: translateY(5px);} .msgbox-link { color: #007BA7; text-decoration: none;}.msgbox-link:hover { text-decoration: underline;}.msgbox-link:active { color: black;}.msgbox-link:visited { color: #007BA7;}';

            var notificationStyle = document.createElement("style");
            notificationStyle.id = "notification-style";
            document.body.appendChild(notificationStyle);

            var appendedNotificationStyle = document.getElementById("notification-style");
            if(appendedNotificationStyle){
                appendedNotificationStyle.innerHTML = notificationCss;
            }

            var messageBoxArea = document.createElement("div");
            messageBoxArea.id = "msgbox-area";
            messageBoxArea.className = "msgbox-area";

            document.body.appendChild(messageBoxArea);


            var message = "WES has been updated to <a class=\"msgbox-link\" href=\"https://github.com/ilovestaples/wes/blob/master/CHANGELOG.md\" target=\"_blank\">version " + GM.info.script.version + "</a>";
            msgboxbox.show(message, null);

            GM.setValue("wes_version",GM.info.script.version);
        }
    });


    /*new stuff here*/



    /************************ 8.2 Misc functions ************************/


    //appends a white space to a list
    function addWhiteSpaceToList(list){
        var space = document.createElement('li');
        space.style.display = "inline";
        space.style.color = "white";
        space.innerHTML = "&nbsp"
        list.appendChild(space);
    }

    //appends a pipe '|' to a list
    function addDividerToList(list){
        var divider = document.createElement('li');
        divider.style.display = "inline";
        divider.style.color = "white";
        divider.innerHTML = "|";
        list.appendChild(divider);
    }


})();
