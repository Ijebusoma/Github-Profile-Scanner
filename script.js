
/** 
 * @description - Application entry point
*/
function init(){
    document.getElementById('form').style.visibility = 'hidden'; //hide the form when it's clicked
    var input = document.querySelector('input').value;
if(input){
    getUserProfile(input);
}else{
    alert('Fill in the form');
   location.reload();
}
}
/** fetches user profile from Github */
/**
 * @param username - Github username supplied from input form
 */
function getUserProfile(username){
var query_string = 'https://api.github.com/users/'+ username;
fetch(query_string)

/**
 * @callback 
 * @param {response} - contains the response gotten from after the API call is done
 */
.then(response => {
    var contentType = response.headers.get('content-type');
    if(response.status == '200'){
    if(contentType && contentType.includes('application/json')) {
        return response.json();
        }
        throw new TypeError('The response does not contain json');
    }
})
        /**
         * @callback
         * @param {data} - contains JSON data returned from the callback above
         */
    .then(data => {
        userProfile = data;
        displayProfile(userProfile)
       //console.log(userProfile);
       displayFollowers(data.followers_url);
    })

    /**
     * @callback 
     * @param {error} - contains information about any error that occurs in the process
     */
    .catch(error => {
       var p = document.getElementById('error');
        p.textContent = 'Your request could not be processed because ' + error;
    })
}

/**
 * @description displays generated information from Github API to the user
 * @param {userProfile } - user data gotten from callback above
 */
function displayProfile(userProfile){
    //console.log(userProfile);
    var user = document.createElement('i')
    var location = document.createElement('i')
    var user_icon = document.createAttribute('class')
    var location_icon = document.createAttribute('class')
    user_icon.value ='far fa-user'; 
    location_icon.value ='fas fa-location-arrow';
    
    user.setAttributeNode(user_icon);
    location.setAttributeNode(location_icon); 
    document.getElementById('name').textContent = userProfile.name;
   var username = document.getElementById('username');
  
   username.textContent = userProfile.login+ ' ';
   username.appendChild(user);
   var place = document.getElementById('location');
    place.textContent = userProfile.location+ ' ';
    place.appendChild(location);
    document.getElementById('repos').textContent = 'Public Repos:' + userProfile.public_repos;
    document.getElementById('bio').textContent = userProfile.bio;
    document.getElementById('avatar').src = userProfile.avatar_url;
    document.getElementById('avatar').width = '200';
    document.getElementById('avatar').heigth = '200';
}

/**
 * @description retrieve Github followers of user
 * @param followers_url - Github API path to retrieve followers of a user
 */
function displayFollowers(followers_url){
    fetch(followers_url)
    .then(f=>{
        return f.json()
    })
    .then(j=> {
        listFollowers(j);
    })

}
/**
 * @description - displays Github followers of user
 * @param followers - list of followers, max is 30
 */
function listFollowers(followers){
followers.forEach(f=>{
    var li = document.createElement('li');
    li.innerHTML = '<a href="'+f.html_url+'">' + '<img src="'+f.avatar_url+'" alt="'+f.login+'"+>'+'</a>';
    document.getElementById('list').appendChild(li);
});
}