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
        // show switch account button
    document.getElementById('switch').style.display = 'block';

        // show all shows
    var elements = document.getElementsByClassName(element.id);
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }

    // show all breaks
    var breaks = document.getElementsByClassName('break');
    for (var i = 0; i < breaks.length; i++){
        breaks[i].style.display = "block";
    }

}

function switchUser() {

    // show
    var text = document.getElementsByClassName("recs-text");
    for (var i = 0; i < text.length; i++){
        text[i].style.display = "block";
    }

    var icons = document.getElementsByClassName("icons");
    for (var i = 0; i < icons.length; i++){
        icons[i].style.display = "block";
    }

    // hide
    document.getElementById('switch').style.display = 'none';

    var recs = document.getElementsByClassName('recs');
    for (var i = 0; i < recs.length; i++){
        recs[i].style.display = "none";
    }

    var header = document.getElementsByClassName('top-picks');
    for (var i = 0; i < header.length; i++){
        header[i].style.display = "none";
    }

    // hide all breaks
    var breaks = document.getElementsByClassName('break');
    for (var i = 0; i < breaks.length; i++) {
        breaks[i].style.display = "none";
    }
}


