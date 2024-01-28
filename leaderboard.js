let leaderboard;

window.onload = async () => {
	
    leaderboard = document.getElementById("leaderboard");
    Object.keys(localStorage).forEach(function(key){
        addUser(localStorage.getItem(key),key);
     });

};

function addUser(userInfo,name)
{
    const td = document.createElement("td");
    td.innerHTML = name;
    leaderboard.appendChild(td);


    const data = userInfo.split(';');
    addImage(data[0] + ";" + data[1]);



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

}