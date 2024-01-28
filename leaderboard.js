let leaderboard;

window.onload = async () => {
	
    leaderboard = document.getElementById("leaderboard");
    Object.keys(localStorage).forEach(function(key){
        addUser(localStorage.getItem(key),key);
     });

};

function addUser(userInfo,name)
{
    addText(name);
   


    const data = userInfo.split(';');
    addImage(data[0] + ";" + data[1]);
    addText(data[2]);




}

function addImage(imageData)
{
    const image = document.createElement("img");
    const td = document.createElement("td");
    image.src = imageData;
    td.appendChild(image);
    leaderboard.appendChild(td);
}

function addText(textData)
{
    const td = document.createElement("td");
    td.innerHTML = textData;
    leaderboard.appendChild(td);
}