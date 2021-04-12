// ==UserScript==
// @name         WES
// @namespace    none
// @version      0.1.1.0
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
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @downloadURL  https://github.com/ilovestaples/wes/raw/master/wes/WES.user.js
// @updateURL    https://github.com/ilovestaples/wes/raw/master/wes/WES.user.js
// @connect      api.imgur.com
// ==/UserScript==

(function() {
    'use strict';

    console.log("WES-dev " + GM.info.script.version);

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

    /************************ 1. General Enhancers ************************/

    /************************ 1.1. Create navigation bar ************************/

    function generalEnhancerAddNavigationBar() {
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
            themeSwitcher.style.zIndex = 1;
        }

    }

    /************************ 1.2 Post/comment point redirection ************************/

    function generalEnhancerAddPointRedirection(){
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
    }

    /************************ 2. Main Page Enhancers ************************/

    /************************ 2.1. Create tools bar ************************/

    function mainPageEnhancerAddToolBar(){

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

            var newli = document.createElement('li');
            newli.style.display = "inline";
            newli.style.color = "white";

            var newlink = document.createElement('a');
            newlink.href = "#";

            newlink.innerHTML = "expand content";
            newlink.className = "tool-bar-link";
            newlink.padding = "10px";
            newlink.id = "expand-media";

            newli.appendChild(newlink);
            toolslist.appendChild(newli);
            tools_bar.appendChild(toolslist);

            wrapperHome.insertBefore(tools_bar, container);


            /************************ 2.1.1 expand media ************************/

            var expandMediaButton = document.getElementById('expand-media');

            expandMediaButton.onclick = function(){

                var thu = document.getElementsByClassName("thumb");
                var len = thu.length;

                for(var i = 0; i < len /*- 1*/ ; i++){
                    wes.expandMedia(thu[i]);
                }

                wes.params.expandMedia = !wes.params.expandMedia;
            }
        }
    }


    /************************ 2.2 Automatically expand content ************************/

    function mainPageEnhancerAutoExpandMedia(){

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
    }

    /************************ 3. Comments Enhancers ************************/

    /************************ 3.1. Automatic Quotes ************************/

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








    function commentsEnhancerAddAutomaticQuotes(){



        //save selected text before replying
        var selectedText = "";
        document.body.onmouseup = function(){
            selectedText = getSelectionText();
        }

        //make a MutationObserver for comments
        const moConfig = { attributes: true, childList: true, subtree: true };
        const moCallback = function(mutationsList, observer) {
            for(let mutation of mutationsList){

                var contentMutated = mutation.target.className && (!mutation.target.className.toString().localeCompare("content")) && mutation.type === 'childList';

                if(contentMutated){
                    if(!mutation.target.querySelector(".inline-expand-content-button")){
                        singleCommentExpandMedia(mutation.target);
                    }
                }



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

    /************************ 3.2. Expand Content in Comments ************************/
/*
    class MediaClassifier{

        classify(string){

        }
    }

    class NothingHandler{

    }

    class TwitterHandler{
    }

    class VideoFileHandler{
    }



    class YoutubeVideoHandler{

    }

    class ImageFileHandler{

    }
*/

    var mediaLinkDictionary = {};

    function isExpandable(link){
        return isImage(link.href) || isVideoFile(link.href) || isTweet(link.href) || isYoutubeLink(link.href) || isImgurAlbum(link.href) || isImgurGallery(link.href);
    }

    function isImage(url){
        var imageExtensions = [".jpg",".jpeg",".png",".gif",".webp"];
        var length = imageExtensions.length;
        for(var i = 0; i < length; i++){
            if(url.includes(imageExtensions[i])){
                return true;
            }
        }
        return false;
    }

    function isVideoFile(url){
        var videoExtensions = [".mp4",".webm"];
        var length = videoExtensions.length;
        for(var i = 0; i < length; i++){
            if(url.includes(videoExtensions[i])){
                return true;
            }
        }
        return false;
    }

    function isTweet(url){
        return !url.search("(https:\/\/twitter.com\/.*?\/(status)\/)");
    }

    function isYoutubeLink(url){
        var ytregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
        return url.search(ytregexp) >= 0;
    }

    function isImgurAlbum(url){
        var imgurAlbumRegExp = /imgur.com\/a\/.{0,20}/;
        return url.search(imgurAlbumRegExp) >= 0;
    }

    function isImgurGallery(url){
        var imgurGalleryRegExp = /imgur.com\/gallery\/.{0,20}/;
        return url.search(imgurGalleryRegExp) >= 0;
    }

    function getYoutubeId(url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }

    function alterImgurAlbumInterface(imgurAlbumMain, albumData) {

        console.log(albumData);
        if(albumData.data.title){imgurAlbumMain.querySelector(".expando-imgur-album-title").innerHTML = '\"' + albumData.data.title + '\"';}
        imgurAlbumMain.querySelector(".expando-imgur-album-size").innerHTML = albumData.data.images_count;
        imgurAlbumMain.querySelector(".expando-imgur-album-image-number").innerHTML = 1;


        var imgurAlbumImageLinks = [];
        for(var media of albumData.data.images){
          imgurAlbumImageLinks.push(media.link);
        }


        var imgurAlbumContent = imgurAlbumMain.querySelector(".expando-imgur-album-content");

        if(isImage(imgurAlbumImageLinks[0])){
            imgurAlbumContent.appendChild(createImageElement(imgurAlbumImageLinks[0]));
        }
        else if(isVideoFile(imgurAlbumImageLinks[0])){
            imgurAlbumContent.appendChild(createVideoElement(imgurAlbumImageLinks[0]));
        }


        var index = 0;
        var buttons = imgurAlbumMain.querySelectorAll("button");

        buttons[0].onclick = function(){
          if(index > 0){
            var link = imgurAlbumImageLinks[--index];
          }
          else{
            index = imgurAlbumImageLinks.length-1;
            link = imgurAlbumImageLinks[index];
            this.innerHTML = "Previous";
            buttons[1].innerHTML = "First";
          }
            if(index < imgurAlbumImageLinks.length-1){buttons[1].innerHTML = "Next";}

            var media = undefined;
            if(isImage(link)){media = createImageElement(link);}
            else if(isVideoFile(link)){media = createVideoElement(link);}

            imgurAlbumMain.querySelector(".expando-imgur-album-image-number").innerHTML = index + 1;

            imgurAlbumContent.removeChild(imgurAlbumContent.firstElementChild);
            imgurAlbumMain.querySelector(".expando-imgur-album-content").appendChild(media);

            if(index == 0){
                this.innerHTML = "Last";
            }
        }


        buttons[1].onclick = function(){
          if(index < imgurAlbumImageLinks.length-1){
            var link = imgurAlbumImageLinks[++index];
          }
          else{
              index = 0;
              link = imgurAlbumImageLinks[index];
              this.innerHTML = "Next";
              buttons[0].innerHTML = "Last";
          }
            if(index > 0){buttons[0].innerHTML = "Previous";}

            var media = undefined;
            if(isImage(link)){media = createImageElement(link);}
            else if(isVideoFile(link)){media = createVideoElement(link);}

            imgurAlbumMain.querySelector(".expando-imgur-album-image-number").innerHTML = index + 1;
            imgurAlbumContent.removeChild(imgurAlbumContent.firstElementChild);
            imgurAlbumMain.querySelector(".expando-imgur-album-content").appendChild(media);

            if(index == imgurAlbumImageLinks.length-1){
                this.innerHTML = "First";
            }

        }
    }

    function expandoImgurAlbumInterfaceCss(){
        var imgurAlbumInterfaceCss = document.createElement("style");
        imgurAlbumInterfaceCss.innerHTML = ".expandoNavigationBtn { display: inline-block; text-align: center; text-decoration: none; margin: 1px 0; border: solid 1px transparent; border-radius: 4px; padding: 0.2em 0.2em; color: #ffffff; background-color: black;}.expandoNavigationBtn:active { transform: translateY(1px); filter: saturate(150%);}.expandoNavigationBtn:hover { color: black; border-color: currentColor; background-color: white;}.expandoNavigationBtn:focus { outline: none;}.expandoNavigationBtn { outline: none;}.expandoNavigationBtn::-moz-focus-inner { border: none;}";
        document.body.appendChild(imgurAlbumInterfaceCss);

    }

    function expandoImgurAlbumCreateImage(url){
        var img = document.createElement("img");
        img.src = url;
        img.style.maxWidth = "1000px";
        return img;
    }

    function createImgurAlbumInterface(){

        var baseName = "expando-imgur-album";

        var expandoImgurAlbumMain = document.createElement("div");
        expandoImgurAlbumMain.id = "expando-imgur-album-main";

        var expandoImgurAlbumControls = document.createElement("div");
        var expandoImgurAlbumTitle = document.createElement("div");
        expandoImgurAlbumTitle.className = "expando-imgur-album-title";

        var expandoImgurAlbumSize = document.createElement("div");
        var expandoImgurInlineAlbumSize = document.createElement("span");
        expandoImgurInlineAlbumSize.className = baseName + "-size";

        var expandoImgurInlineAlbumImageNumber = document.createElement("span");
        expandoImgurInlineAlbumImageNumber.className = baseName + "-image-number";

        var expandoImgurAlbumContent = document.createElement("div");
        expandoImgurAlbumContent.className = "expando-imgur-album-content";

        var expandoImgurPreviousButton = document.createElement("button");
        expandoImgurPreviousButton.innerHTML = "Last";
        expandoImgurPreviousButton.className = "expandoNavigationBtn";

        var expandoImgurNextButton = document.createElement("button");
        expandoImgurNextButton.innerHTML = "Next";
        expandoImgurNextButton.className = "expandoNavigationBtn";

        //expandoImgurAlbumSize.appendChild(document.createTextNode("Showing "));
        expandoImgurAlbumSize.appendChild(expandoImgurInlineAlbumImageNumber);
        expandoImgurAlbumSize.appendChild(document.createTextNode(" of "));
        expandoImgurAlbumSize.appendChild(expandoImgurInlineAlbumSize);

        expandoImgurAlbumControls.appendChild(expandoImgurPreviousButton);
        expandoImgurAlbumControls.appendChild(expandoImgurNextButton);

        expandoImgurAlbumMain.appendChild(expandoImgurAlbumTitle);
        expandoImgurAlbumMain.appendChild(expandoImgurAlbumSize);
        expandoImgurAlbumMain.appendChild(expandoImgurAlbumControls);
        expandoImgurAlbumMain.appendChild(expandoImgurAlbumContent);

        return expandoImgurAlbumMain;
    }

    function createImageElement(src){
        var media = document.createElement("img");
        media.src = src;
        return media;
    }

    function createVideoElement(src){
        var media = document.createElement("video");
        media.src = src;
        var extlength = media.src.length - media.src.lastIndexOf(".") - 1;
        var type = media.src.slice(-extlength);
        media.setAttribute("type", "video/" + type);
        media.setAttribute("controls","");
        return media;
    }

    function createTweetElement(src){
        var tweetlink = document.createElement("a");
        tweetlink.href = src;

        var media = document.createElement("blockquote");
        media.className = "twitter-tweet";
        media.appendChild(tweetlink);
        return media;
    }

    function expandMedia(node){
        var div = document.createElement("div");
        div.style = "resize: both";
        div.id = "id" + Math.random().toString(16).slice(2);

        var mediaSource = node.getAttribute("data-media-source");
        var mediaType = node.getAttribute("data-media-type");
        var media = null;

        if(!mediaType.localeCompare("image")){
            media = createImageElement(mediaSource);
        }
        else if(!mediaType.localeCompare("videoFile")){
            media = createVideoElement(mediaSource);
        }
        else if(!mediaType.localeCompare("tweet")){
            media = createTweetElement(mediaSource);
        }
        else if(!mediaType.localeCompare("imgur-album") || !mediaType.localeCompare("imgur-gallery")){
            var albumHash = mediaSource.split("/");
            albumHash = albumHash[albumHash.length-1];

            var apiUrl = "https://api.imgur.com/3/album/";
            var albumData = mediaLinkDictionary[mediaSource];

            if(!mediaType.localeCompare("imgur-gallery")){apiUrl = "https://api.imgur.com/3/gallery/album/";}


            if(albumData === undefined){
                GM_xmlhttpRequest ( {
                    method: "GET",
                    url: apiUrl + albumHash,
                    headers: {
                        "Authorization": "Client-ID 1d8d9b36339e0e2"
                    },
                    onload: function (response) {
                        if(response.status === 404){
                            media = document.createTextNode("404: not found");
                            if(media){div.appendChild(media);}
                            node.setAttribute("data-media-id", div.id);
                            node.parentElement.insertBefore(div, node.nextSibling);
                            return;
                        }
                        console.log (response.responseText);

                        var reqAlbumData = JSON.parse(response.responseText);
                        mediaLinkDictionary[mediaSource] = reqAlbumData;

                        if(reqAlbumData.data.images_count > 2){
                            media = createImgurAlbumInterface();
                        }
                        else{
                            var singleMedia = reqAlbumData.data.images[0].link;
                            if(isVideoFile(singleMedia)){
                                media = createVideoElement(singleMedia);
                            }
                            else if(isImage(singleMedia)){
                                media = createImageElement(singleMedia);
                            }
                        }

                        if(media){div.appendChild(media);}
                        node.setAttribute("data-media-id", div.id);
                        node.parentElement.insertBefore(div, node.nextSibling);

                        if(reqAlbumData.data.images_count > 2){
                            expandoImgurAlbumInterfaceCss();
                            alterImgurAlbumInterface(div, reqAlbumData);
                        }
                    }
                } );
                return;
            }

            if(albumData.data.images_count > 2){
                media = createImgurAlbumInterface();
            }
            else{
                var singleMedia = albumData.data.images[0].link;
                if(isVideoFile(singleMedia)){
                    media = createVideoElement(singleMedia);
                }
                else if(isImage(singleMedia)){
                    media = createImageElement(singleMedia);
                }
            }
        }


        if(media){div.appendChild(media);}

        node.setAttribute("data-media-id", div.id);
        node.parentElement.insertBefore(div, node.nextSibling);

        //run twitter widget script
        if(!mediaType.localeCompare("tweet")){

            var scr = document.createElement("script");
            scr.id = "tweet-script";
            scr.charset = "utf-8";
            scr.src= "https://platform.twitter.com/widgets.js";
            scr.async = true;
            document.body.appendChild(scr);
        }
        else if(!mediaType.localeCompare("youtubeLink")){

            var videoId = getYoutubeId(mediaSource);
            if(mediaSource.includes("t=")){
                var split = mediaSource.split("=");
                var startTime = split[split.length-1].split("s")[0];
                videoId += "?start=" + startTime;

            }

            var obj = {"video": {
                "value": "<iframe title='YouTube video player' type=\"text/html\" width='640'  height='390' src='https://www.youtube.com/embed/" + videoId + "' frameborder='0' allowFullScreen></iframe>"}};

            $("#"+div.id).html(obj.video.value);
        }
        else if(!mediaType.localeCompare("imgur-album") || !mediaType.localeCompare("imgur-gallery")){
            var albData = mediaLinkDictionary[mediaSource];
            if(albData.data.images_count > 2){
                expandoImgurAlbumInterfaceCss();
                alterImgurAlbumInterface(div, albData);
            }


        }
    }

    function contractMedia(node){
        var mediaId = node.getAttribute("data-media-id");
        var media = document.getElementById(mediaId);
        node.parentElement.removeChild(media);
        node.removeAttribute("data-media-id");
    }

    function makeExpandMediaButton(link){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "aria-hidden", true);
        svg.setAttributeNS(null, "focusable", false);
        svg.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");
        svg.style = "-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg); padding-left: 3px; cursor: pointer";
        svg.setAttributeNS(null, "data-media-source", link.href);
        svg.setAttributeNS(null, "class", "inline-expand-content-button");

        var iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        iconPath.setAttributeNS(null, "fill","currentColor");

        if(isImage(link.href)){
            svg.setAttributeNS(null, "width", "1.1em");
            svg.setAttributeNS(null, "height", "1.1em");
            svg.setAttributeNS(null, "viewBox", "0 -3 35 35");
            svg.setAttributeNS(null, "data-media-type", "image");
            iconPath.setAttributeNS(null, "d","M10 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8.92 8a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM6 27v-4.1l6-6.08a1 1 0 0 1 1.41 0L16 19.35L8.32 27zm24 0H11.15l6.23-6.23l5.4-5.4a1 1 0 0 1 1.41 0L30 21.18z");
        }
        else if(isVideoFile(link.href)){
            svg.setAttributeNS(null, "width", "1.2em");
            svg.setAttributeNS(null, "height", "1.2em");
            svg.setAttributeNS(null, "viewBox", "0 -3 20 20");
            svg.setAttributeNS(null, "data-media-type", "videoFile");
            iconPath.setAttributeNS(null, "d","M19 15V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2zM8 14V6l6 4z");
        }
        else if(isTweet(link.href)){
            svg.setAttributeNS(null, "width", "1.2em");
            svg.setAttributeNS(null, "height", "1.2em");
            svg.setAttributeNS(null, "viewBox", "0 -3 60 60");
            svg.setAttributeNS(null, "data-media-type", "tweet");
            iconPath.setAttributeNS(null, "d","M60 16l-6 1l4-5l-7 2c-9-10-23 1-19 10C16 24 8 12 8 12s-6 9 4 16l-6-2c0 6 4 10 11 12h-7c4 8 11 8 11 8s-6 5-17 5c33 16 53-14 50-30z");
        }
        else if(isYoutubeLink(link.href)){
            svg.setAttributeNS(null, "width", "1.2em");
            svg.setAttributeNS(null, "height", "1.2em");
            svg.setAttributeNS(null, "viewBox", "0 -3 20 20");
            svg.setAttributeNS(null, "data-media-type", "youtubeLink");
            iconPath.setAttributeNS(null, "d","M19 15V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2zM8 14V6l6 4z");
        }
        else if(isImgurAlbum(link.href)){
            svg.setAttributeNS(null, "width", "1.1em");
            svg.setAttributeNS(null, "height", "1.1em");
            svg.setAttributeNS(null, "viewBox", "0 -3 35 35");
            svg.setAttributeNS(null, "data-media-type", "imgur-album");
            iconPath.setAttributeNS(null, "d","M10 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8.92 8a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM6 27v-4.1l6-6.08a1 1 0 0 1 1.41 0L16 19.35L8.32 27zm24 0H11.15l6.23-6.23l5.4-5.4a1 1 0 0 1 1.41 0L30 21.18z");
        }
        else if(isImgurGallery(link.href)){
            svg.setAttributeNS(null, "width", "1.1em");
            svg.setAttributeNS(null, "height", "1.1em");
            svg.setAttributeNS(null, "viewBox", "0 -3 35 35");
            svg.setAttributeNS(null, "data-media-type", "imgur-gallery");
            iconPath.setAttributeNS(null, "d","M10 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8.92 8a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM6 27v-4.1l6-6.08a1 1 0 0 1 1.41 0L16 19.35L8.32 27zm24 0H11.15l6.23-6.23l5.4-5.4a1 1 0 0 1 1.41 0L30 21.18z");
        }

        svg.appendChild(iconPath);
        return svg;
    }

    function addExpandMediaButton(link){
        var expandMediaButton = makeExpandMediaButton(link);
        link.parentElement.insertBefore(expandMediaButton, link.nextSibling);
        expandMediaButton.onclick = function(){
            if(this.hasAttribute("data-active")){
                contractMedia(this);
                this.removeAttribute("data-active");
                return;
            }

            this.setAttribute("data-active", true);
            expandMedia(this);
        };
    }

    function singleCommentExpandMedia(content){
        var links = content.querySelectorAll("a");
        for(var link of links){
            if(isExpandable(link)){
                addExpandMediaButton(link);
            }
        }
    }

    function commentsEnhancerExpandMedia(){

        var comments = document.getElementsByClassName("comment");
        for(var comment of comments){
            var content = comment.querySelector(".content");
            if(content){
                var links = content.querySelectorAll("a");
                for(var link of links){
                    if(isExpandable(link)){
                        addExpandMediaButton(link);
                    }
                }
            }
        }
    }


    /************************ MAIN ************************/

    generalEnhancerAddNavigationBar();
    generalEnhancerAddPointRedirection();
    mainPageEnhancerAddToolBar();
    mainPageEnhancerAutoExpandMedia();


    //if im viewing a post:
    if(document.location.href.search("/p/") > 0){
        commentsEnhancerAddAutomaticQuotes();
        commentsEnhancerExpandMedia();
    }

    var userPostsOrCommentsRegex = /\/u\/.*\/\?type=(\bpost\b|\bcomment\b)/;
    var messagesPageRegex = /\/messages/;
    var userPageRegex = /\/u\/.*\//;

    if(document.location.href.search(userPageRegex) > 0) {
        commentsEnhancerExpandMedia();
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

    // Creation of Message Box class, and the sample usage
    let msgboxbox = new MessageBox("#msgbox-area", {
        closeTime: 7000,
        hideCloseButton: false
    });


    var version = GM.getValue("wes_version");
    version.then(function(result) {

        var compareVersions = GM.info.script.version.localeCompare(result);

        if(compareVersions){

            var notificationCss = '.msgbox-area { max-height: 100%; position: fixed; bottom: 15px; left: 20px; right: 20px;}.msgbox-area .msgbox-box { font-size: inherit; color: #ffffff; background-color: rgba(0, 0, 0, 0.8); padding: 18px 20px; margin: 0 0 15px; display: flex; align-items: center; position: relative; justify-content: space-between; border-radius: 12px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.65); transition: opacity 300ms ease-in;}.msgbox-area .msgbox-box.msgbox-box-hide { opacity: 0;}.msgbox-area .msgbox-box:last-child { margin: 0;}.msgbox-area .msgbox-content { flex-shrink: 1;}.msgbox-area .msgbox-close { color: #ffffff; font-weight: bold; text-decoration: none; margin: 0 0 0 20px; flex-grow: 0; flex-shrink: 0; position: relative; transition: text-shadow 225ms ease-out;}.msgbox-area .msgbox-close:hover { text-shadow: 0 0 3px #efefef;}@media (min-width: 481px) and (max-width: 767px) { .msgbox-area { left: 80px; right: 80px; }}@media (min-width: 768px) { .msgbox-area { width: 480px; height: 0; top: 15px; left: auto; right: 15px; }}.msgbox-area { font-size: 16px;}.msgbox-message-container { text-align: center; width: 100vw; height: 100vh; padding: 20px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; flex-direction: column;}.msgbox-message-container h1, .msgbox-message-container h3 { margin: 10px 20px;}.msgbox-message-container p { margin: 5px 20px;}.msgbox-message-button { font-size: 18px; font-weight: bold; font-family: inherit; color: white; background-color: #1476ff; width: 250px; border: solid 2px #005de0; padding: 10px 20px; cursor: pointer; outline: none; box-shadow: 0 5px #005de0; transition: background-color 100ms ease-out, box-shadow 100ms ease-out, transform 100ms ease-out;}.msgbox-message-button:hover, .msgbox-message-button:focus, .msgbox-message-button:active { background-color: #2e85ff;}.msgbox-message-button:active { background-color: #0068fa; box-shadow: 0 0 #005de0; transform: translateY(5px);} .msgbox-link { color: #007BA7; text-decoration: none;}.msgbox-link:hover { text-decoration: underline;}.msgbox-link:active { color: black;}.msgbox-link:visited { color: #007BA7;}';

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
