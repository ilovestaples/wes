function toggleExpandMedia(){
        var thu = document.getElementsByClassName("thumb");
        var len = thu.length;

        for(var i = 0; i < len /*- 1*/ ; i++){
            wes.expandMedia(thu[i]);
        }

        wes.params.expandMedia = !wes.params.expandMedia;
    }

    function mainPageEnhancerAddToolBar(){

        var container = document.querySelector(".container");
        var wrapperHome = document.querySelector(".wrapper.home");

        if(wrapperHome && container){

            var tools_bar = document.createElement('div');
            tools_bar.className = "tools-bar"
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
            document.getElementById('expand-media').addEventListener("click", toggleExpandMedia);
        }
    }
