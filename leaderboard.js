let leaderboard;

var scrollingDown = true;
var intervalId;

var scrollDistance = 1;

var Height = document.documentElement.scrollHeight;
var currentHeight = 0;
var bool = true;
var step = 2;
var speed = 80;
var interval = setInterval(scrollpage, speed)


    function scrollpage() {
        if (currentHeight < 0 || currentHeight > Height) 
            bool = !bool;
            
        if (bool) {
            window.scrollTo(0, currentHeight += step);
        } else {
            window.scrollTo(0, currentHeight -= step);
        }
        console.log(currentHeight);

    }

var loadinterval = setInterval(() => {
    location.reload();
}, (60000));


window.onload = async () => {
	
    leaderboard = document.getElementById("leaderboard");
    Object.keys(localStorage).forEach(function(key){
        addUser(localStorage.getItem(key),key);
     });

};

function addUser(userInfo,name)
{
    const tr = document.createElement("tr");
    tr.id = name;
    leaderboard.appendChild(tr);
    addText(name,tr);
    
   


    const data = userInfo.split(';');
    addImage(data[0] + ";" + data[1],tr);
    addText(data[2],tr);
    addImage(data[3] + ";" + data[4],tr);
    addText(data[5],tr);
    addImage(data[6] + ";" + data[7],tr);
    addText(data[8],tr);
    addText(data[9],tr);




}




function addImage(imageData,tr)
{
    const image = document.createElement("img");
    const td = document.createElement("td");
    image.src = imageData;
    image.className = "leaderboardImage";
    td.appendChild(image);
    tr.appendChild(td);
}

function addText(textData,tr)
{
    const td = document.createElement("td");
    td.innerHTML = textData;
    tr.appendChild(td);
}