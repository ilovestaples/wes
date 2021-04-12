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
