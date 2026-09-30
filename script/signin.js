console.log("logine funcation successful")

document.getElementById("singin-btn").addEventListener("click", function(){
  const usernameInput = document.getElementById("input-username");
  const username = usernameInput.value;
  console.log(username)
  const passwordInput = document.getElementById("password-input");
  const password = passwordInput.value;
  console.log(password)
  if(username=="admin" && password=="admin123"){
    alert("Sign In Successfull")
    window.location.assign("/home.html")
  }else{
    alert("Sign In Failed");
    return;
  }
})