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
