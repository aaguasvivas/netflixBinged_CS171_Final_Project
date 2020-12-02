function onClick(){

    console.log("icon clicked")

    // hide
    var text = document.getElementsByClassName("recs-text");
    for (var i = 0; i < text.length; i++){
        text[i].style.display = "none";
    }

    var icons = document.getElementsByClassName("icons");
    for (var i = 0; i < icons.length; i++){
        icons[i].style.display = "none";
    }

    //show
    var topPicks = document.getElementsByClassName("top-picks");
    for (var i = 0; i < topPicks.length; i++){
        topPicks[i].style.display = "block";
    }

    var recs = document.getElementsByClassName("recs");
    for (var i = 0; i < recs.length; i++){
        recs[i].style.display = "block";
    }

}


