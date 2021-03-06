// ==UserScript==
// @name         WES
// @namespace    none
// @version      0.1.0.5
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
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @downloadURL  https://github.com/ilovestaples/wes/raw/master/wes/WES.user.js
// @updateURL    https://github.com/ilovestaples/wes/raw/master/wes/WES.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("WES 0.1.0.5");

        function whiteSpace(obj){
            var space = document.createElement('li');
            space.style.display = "inline";
            space.style.color = "white";
            space.innerHTML = "&nbsp"
            obj.appendChild(space);
        }

        var css = '.bar-link {text-decoration: none;color: white;font-family: sans-serif;font-size: 13px;}.bar-link { color:#fff; -moz-transition: all 0.1s ease-in; -o-transition: all 0.1s ease-in; -webkit-transition: all 0.1s ease-in; transition: all 0.1s ease-in;}.bar-link:hover { color: #fff; text-shadow:0px 0px 40px #fff; -moz-transition: all 0.1s ease-in; -o-transition: all 0.1s ease-in; -webkit-transition: all 0.1s ease-in; transition: all 0.1s ease-in;}';

        var st = document.createElement('style');
        st.className = "style-tag";
        document.body.appendChild(st);

        var ap_st = document.getElementsByClassName('style-tag');
        if(ap_st[0]){
            ap_st[0].innerHTML = css;
        }

        /************************create navigation bar************************/


        const winsites_array = ["thedonald", "consumeproduct", "omegacanada", "kotakuinaction", "kotakuinaction2", "gavinmcinnes", "weekendgunnit", "communities"];

        var top_bar = document.createElement('div');
        top_bar.className = "top-bar"
        top_bar.style.height = "30px";
        top_bar.style.backgroundColor = "black";
        top_bar.style.width = "auto";
        top_bar.style.opacity = 0.5;
        top_bar.style.display = "flex";
        top_bar.style.alignItems = "center";
        top_bar.style.position = "absolute";

        var linklist = document.createElement('ul');
        linklist.style.listStyle = "none";

        for (var i = 0; i < winsites_array.length; i++) {

            whiteSpace(linklist);

            var newli = document.createElement('li');
            newli.style.display = "inline";
            newli.style.color = "white";

            var newlink = document.createElement('a');
            newlink.href = "https://" + winsites_array[i] + ".win/";
            newlink.innerHTML = winsites_array[i];
            newlink.className = "bar-link";
            newlink.padding = "10px"

            newli.appendChild(newlink);
            linklist.appendChild(newli);

            whiteSpace(linklist);

            if (i < winsites_array.length - 1) {
                var splitter = document.createElement('li');
                splitter.style.display = "inline";
                splitter.style.color = "white";
                splitter.innerHTML = "|";
                linklist.appendChild(splitter);
            }
        }

        top_bar.appendChild(linklist);

        var wrapper = document.getElementsByClassName("wrapper");
        var header = document.getElementsByClassName("header");

        if(wrapper[0] && header[0]){
            wrapper[0].insertBefore(top_bar, header[0]);
        }

        var ts = document.getElementsByClassName("theme-switcher");
        if(ts[0]){
            ts[0].style.zIndex =1;
        }

        /************************create tools bar************************/

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

        newlink.innerHTML = "expand images";
        newlink.className = "bar-link";
        newlink.padding = "10px";
        newlink.id = "expt";

        newli.appendChild(newlink);
        toolslist.appendChild(newli);
        tools_bar.appendChild(toolslist);

        var container = document.getElementsByClassName("container");
        var wh = document.getElementsByClassName("wrapper home");

        if(wh[0] && container[0]){
            wh[0].insertBefore(tools_bar, container[0]);
        }

        var expt = document.getElementById('expt');
        if(expt){
            expt.onclick = function(){


                /************************expand thumbnails************************/
                console.log('Expanding thumbnails');

                var thu = document.getElementsByClassName("thumb");
                var len = thu.length;

                for(i = 0; i < len - 1 ; i++){

                    if(thu[i].hasAttribute("data-action")){
                        thu[i].click();
                    }

                    $(thu[i]).closest('.post').find('.content').first().removeAttr('data-opened');

                }
                console.log("Done.");
            };
        };



        /************************post/comment point redirection************************/

        var navuser = document.getElementsByClassName("nav-user");
        if(navuser){

          var username = navuser[0].children[0].children[0].text;
          var postKarma = document.createElement('a');
          var commentKarma = document.createElement('a');

          postKarma.href = "https://" + window.location.hostname +"/u/" + username + "/?type=post";
          commentKarma.href = "https://" + window.location.hostname +"/u/" + username + "/?type=comment";

          var pointsText = navuser[0].children[0].childNodes[2];
          var pointsTextContent = pointsText.textContent;

          var postKarmaText = pointsTextContent.substring(pointsTextContent.indexOf("(") + 1, pointsTextContent.indexOf("???") - 1);
          var commentKarmaText = pointsTextContent.substring(pointsTextContent.indexOf("???") + 2, pointsTextContent.indexOf(")"));

          postKarma.innerHTML = postKarmaText;
          postKarma.title = "submitted"
          commentKarma.innerHTML = commentKarmaText;
          commentKarma.title = "comments";

          var sp = document.createElement('span');
          var text1 = document.createElement('text');
          var text2 = document.createElement('text');
          var text3 = document.createElement('text');

          text1.textContent = "(";
          text2.textContent = " ??? ";
          text3.textContent = ")";

          sp.appendChild(text1);
          sp.appendChild(postKarma);
          sp.appendChild(text2);
          sp.appendChild(commentKarma);
          sp.appendChild(text3);

          navuser[0].children[0].insertBefore(sp, pointsText);
          navuser[0].children[0].removeChild(pointsText);
        }

    /*new stuff here*/

    /************************quote reply************************/

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

        //make a MutationObserver
        const moConfig = { attributes: true, childList: true, subtree: true };
        const moCallback = function(mutationsList, observer) {
            console.log("callback invoked");
            for(let mutation of mutationsList){


                var commentLines = "";
                var textarea = "";
                var replyFormAdded = mutation.target.className && (!mutation.target.className.toString().localeCompare("body")) && mutation.type === 'childList';
                var replyFormShown = mutation.target.className && (!mutation.target.className.toString().localeCompare("form reply active")) && mutation.type === 'attributes';

                //if its the first time the reply button was clicked
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
                }

                //if im hitting cancel
                if(mutation.target.className && (!mutation.target.className.toString().localeCompare("form reply")) && mutation.type === 'attributes'){
                    textarea = mutation.target.querySelector("textarea");
                    textarea.value = "";
                }
            }
        };

        const commentsObserver = new MutationObserver(moCallback);

        var comments = document.getElementsByClassName("comment");
        for (var j = 0; j < comments.length; j++) {
            comments[j].onmousedown = function(){
                commentsObserver.observe(this, moConfig);
            }
        }
    }

})();
