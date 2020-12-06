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
        console.log("hello")
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

    else if (element.src == link + "good-place.png"){
        window.open("https://www.netflix.com/title/80113701");
    }

    else if (element.src == link + "sherlock.png"){
        window.open("https://www.netflix.com/title/70202589");
    }

    else if (element.src == link + "imposters.png"){
        window.open("https://www.netflix.com/title/80161628");
    }

    else if (element.src == link + "okay.png"){
        window.open("https://www.netflix.com/lu-en/title/81243992");
    }

    else if (element.src == link + "avatar.png"){
        window.open("https://www.netflix.com/title/70142405");
    }

    else if (element.src == link + "sex-ed.png"){
        window.open("https://www.netflix.com/title/80197526");
    }

    else if (element.src == link + "old-guard.png"){
        window.open("https://www.netflix.com/title/81038963");
    }

    else if (element.src == link + "knock-down.png"){
        window.open("https://www.netflix.com/title/81080637");
    }

    else if (element.src == link + "enola-holmes.png"){
        window.open("https://www.netflix.com/title/81277950");
    }

    else if (element.src == link + "marriage-story.png"){
        window.open("https://www.netflix.com/title/80223779");
    }

    else if (element.src == link + "guernsey.png"){
        window.open("https://www.netflix.com/title/80223371");
    }

    else if (element.src == link + "selena.png"){
        window.open("https://www.netflix.com/title/81022733");
    }

    else if (element.src == link + "crown.png"){
        window.open("https://www.netflix.com/title/80025678");
    }

    else if (element.src == link + "baking.png"){
        window.open("https://www.netflix.com/title/80063224");
    }

    else if (element.src == link + "dear-white-people.png"){
        window.open("https://www.netflix.com/title/80095698");
    }

    else if (element.src == link + "legend-of-korra.png"){
        window.open("https://www.netflix.com/title/80027563");
    }

    else if (element.src == link + "umbrella-academy.png"){
        window.open("https://www.netflix.com/title/80186863")
    }

    else if (element.src == link + "when-they-see.png"){
        window.open("https://www.netflix.com/title/80200549")
    }

    else if (element.src == link + "bojack.png"){
        window.open("https://www.netflix.com/title/70300800")
    }

    else if (element.src == link + "money-heist.png"){
        window.open("https://www.netflix.com/title/80192098")
    }

    else if (element.src == link + "spiderman.png"){
        window.open("https://www.netflix.com/title/81002747")
    }

    else if (element.src == link + "13th.png"){
        window.open("https://www.netflix.com/title/80091741")
    }

    else if (element.src == link + "roma.png"){
        window.open("https://www.netflix.com/title/80240715")
    }

    else if (element.src == link + "bee.png"){
        window.open("https://www.netflix.com/title/70060010")
    }

    else if (element.src == link + "bandersnatch.png"){
        window.open("https://www.netflix.com/title/80988062")
    }

    else if (element.src == link + "bird-box.png"){
        window.open("https://www.netflix.com/title/80196789")
    }

    else if (element.src == link + "big-mouth.png"){
        window.open("https://www.netflix.com/title/80117038")
    }

    else if (element.src == link + "hunter-x-hunter.png"){
        window.open("https://www.netflix.com/title/70300472")
    }

    else if (element.src == link + "sabrina.png"){
        window.open("https://www.netflix.com/title/80223989")
    }

}

