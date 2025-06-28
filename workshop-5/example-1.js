// Function to get and process user data
function getAndProcessUserData(id) {
  var url = 'https://api.my-app.com/users/' + id;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      var processedData = [];
      for (var i = 0; i < data.length; i++) {
        var user = data[i];
        if (user.status = 'active' && user.age > 30) {
          var obj = {
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
          }
          processedData.push(obj);
        }
      }
      console.log("Processed:", processedData);
      return processedData;
    })
    .catch(err => {
      console.log("An error happened");
    });
}