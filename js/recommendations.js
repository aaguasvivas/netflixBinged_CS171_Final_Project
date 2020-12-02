function onClick(element){

    console.log("icon clicked")
    console.log(element.id)

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
    document.getElementById('switch').style.display = 'block';

    var elements = document.getElementsByClassName(element.id);
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }

    // if (element.id == "adelson"){
    //
    // }
    //
    // else if (element.id == "belinda") {
    //
    // }
    //
    // else if (element.id == "michelle"){
    //
    // }
    // var topPicks = document.getElementsByClassName("top-picks");
    // for (var i = 0; i < topPicks.length; i++){
    //     topPicks[i].style.display = "block";
    // }
    //
    // var recs = document.getElementsByClassName("recs");
    // for (var i = 0; i < recs.length; i++){
    //     recs[i].style.display = "block";
    // }

}


