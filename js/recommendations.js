// enter user profile
function onClick(element){
    // HIDE
        // text
    var text = document.getElementsByClassName("recs-text");
    for (var i = 0; i < text.length; i++){
        text[i].style.display = "none";
    }

        // icons
    var icons = document.getElementsByClassName("icon-group");
    icons[0].style.display = "none";


    //SHOW
        // switch button
    document.getElementById('switch').style.display = 'block';

        // recommendations
    var elements = document.getElementsByClassName(element.id);
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }

        // breaks
    var breaks = document.getElementsByClassName('break');
    for (var i = 0; i < breaks.length; i++){
        breaks[i].style.display = "block";
    }

}

// switch user profile
function switchUser() {

    // SHOW
        // text
    var text = document.getElementsByClassName("recs-text");
    for (var i = 0; i < text.length; i++){
        text[i].style.display = "block";
    }

        // icons
    var icons = document.getElementsByClassName("icon-group");
    icons[0].style.display = "flex";


    // HIDE
        // switch button
    document.getElementById('switch').style.display = 'none';

        // recommendations
    var recs = document.getElementsByClassName('recs');
    for (var i = 0; i < recs.length; i++){
        recs[i].style.display = "none";
    }

        // top-picks headers
    var header = document.getElementsByClassName('top-picks');
    for (var i = 0; i < header.length; i++){
        header[i].style.display = "none";
    }

        // breaks
    var breaks = document.getElementsByClassName('break');
    for (var i = 0; i < breaks.length; i++) {
        breaks[i].style.display = "none";
    }


}

// link to netflix
function goToNetflix(element){

    var link = "http://localhost:63342/netflixBinged_CS171_Final_Project/img/";

    if (element.src == link + "gossip-girl.png"){
        window.open("https://www.netflix.com/title/70143811");
    }

    else if (element.src == link + "schitts-creek.png"){
        window.open("https://www.netflix.com/title/80036165");
    }

    else if (element.src == link + "new-girl.png"){
        window.open("https://www.netflix.com/title/70196145");
    }

    else if (element.src == link + "dynasty.png") {
        window.open("https://www.netflix.com/title/80179394");
    }

    else if (element.src == link + "you.png") {
        window.open("https://www.netflix.com/title/80211991");
    }

    else if (element.src == link + "jane.png") {
        window.open("https://www.netflix.com/title/80027158");
    }

    else if (element.src == link + "social-network.png"){
        window.open("https://www.netflix.com/title/70132721");
    }

    else if (element.src == link + "bling-ring.png"){
        window.open("https://www.netflix.com/title/70271454");
    }

    else if (element.src == link + "lady-bird.png"){
        window.open("https://www.netflix.com/title/80205227");
    }

    else if (element.src == link + "valentines.png"){
        window.open("https://www.netflix.com/title/70124804");
    }

    else if (element.src == link + "to-all-the-boys.png"){
        window.open("https://www.netflix.com/title/80203147");
    }

    else if (element.src == link + "murder-mystery.png"){
        window.open("https://www.netflix.com/title/80242619");
    }

    else if (element.src == link + "social-dilemma.png"){
        window.open("https://www.netflix.com/title/81254224");
    }

    else if (element.src == link + "tvd.png"){
        window.open("https://www.netflix.com/title/70143860");
    }

    else if (element.src == link + "rebecca.png"){
        window.open("https://www.netflix.com/title/81002196");
    }

    else if (element.src == link + "waiting-for-superman.png"){
        window.open("https://www.netflix.com/title/70129364");
    }

    else if (element.src == link + "miss-americana.png"){
        window.open("https://www.netflix.com/title/81028336");
    }

    else if (element.src == link + "the-boy.png"){
        window.open("https://www.netflix.com/title/80200047");
    }



}

