
$(document).ready(function(){


  $('#menu-bar').click(function(){
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
});
    


  $(document).on('submit', '#login-form',function(event){
   
    $.ajax({
        type:'POST',
        url:'/login/',
        data:{
            'email-field':($('#email-field').val()).trim(),
            'password-field':$('#password-field').val(),
            'keepmeloggedin':$('#keepmeloggedin').is(":checked"),
            'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
            
        }
          })
    
    .done(function(data) {
      
      
     
      if (data ==  "FAIL") {
        $('#email-field').next("div").remove();
        inputNode = document.getElementById('email-field');
        inputNode.style.border = "1px #fc0330 solid";
        document.getElementById('password-field').style.border = "1px #fc0330 solid";
        var span =document.createElement('div');
        span.setAttribute("style"," margin-top:-1rem; margin-bottom:0.8rem; margin-left:0.25rem; font-size: 1.2rem; color:#fc0330; text-align:left;");
        span.innerHTML= "Incorrect Email and Password!";
        inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
        
       
      }else{
        $('#login-form')[0].reset();
        window.location.replace("/loginsuccess/");
      }
  });
  
    
  
  event.preventDefault();
  
});




document.getElementById('messageBox-1').classList.toggle('active');
    

    $(window).on('load scroll',function(){

        $('#menu-bar').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
     

        $('section').each(function(){

            let top = $(window).scrollTop();
            let height = $(this).height();
            let id = $(this).attr('id');
            let offset = $(this).offset().top - 200;

            if(top > offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });
    

    $('.list .btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        let src = $(this).attr('data-src');
        $('.menu .row .image img').attr('src',src);
    });


 
    $(".toggle-password").click(function() {

      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    
  

});


$('#messageBox-cross-btn').click(function(){
  document.getElementById('messageBox-1').style.display = "none";

  document.getElementById('messageBox-content').style.display = "none";
 
});
  

//google auth
function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 40,
    
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure

  });
}
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
  } else {                                 // Not logged into your webpage or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this webpage.';
  }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '515637803193864',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v11.0'           // Use this Graph API version for this call.
  });


  FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
  });
};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

   //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
  document.getElementById('email-field').style.border = null;
  document.getElementById('password-field').style.border = null;
  $('#email-field').next("div").remove();

  



 }
function locationMaps() {
 var allAreFilled = true;
    var pass =$("#password-field1").val();
    var cpass =$("#confirm-field").val();
    if((pass.length)<6) {
      $('#password-field1').next("div").remove();
      inputNode = document.getElementById('password-field1');
      inputNode.style.border = "1px #fc0330 solid";
      var span =document.createElement('div');
      span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left; margin-top:-1rem; margin-bottom:0.8rem; margin-left:0.5rem;");
      span.innerHTML= "Must Be 6 Or More Characters Long!";
      inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
      allAreFilled = false;
      
      
    }else{
      document.getElementById('password-field1').style.border = null;
      $('#password-field1').next("div").remove();
      
    }
     
    var email = $("#emailfield").val();
    var name = $("#name-field").val();
    var phonenum = $("#phone").val();
    // var address = $("#address").val();
    // address.trim();
    name.trim();
    phonenum.trim();
    email.trim();
    
   
    if (pass !=cpass){
      
        $('#confirm-field').next("div").remove();
        
        inputNode = document.getElementById('confirm-field');
        inputNode.style.border = "1px #fc0330 solid";
        var span =document.createElement('div');
        span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;  margin-top:-1rem; margin-bottom:0.8rem; margin-left:0.5rem;");
        span.innerHTML= "Password Mismatched!";
        inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
        allAreFilled = false;
        
      }else{
        document.getElementById('confirm-field').style.border = null;
        $('#confirm-field').next("div").remove();
        
      }
    
  
      if (!vaalidateEmail(email)){
      
        $('#emailfield').next("div").remove();
        
        inputNode = document.getElementById('emailfield');
        inputNode.style.border = "1px #fc0330 solid";
        var span =document.createElement('div');
        span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;  margin-top:-1rem; margin-bottom:0.8rem; margin-left:0.5rem;");
        span.innerHTML= "Enter Only Valid Email Address!";
        inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
        allAreFilled = false;
        
      }else{
        document.getElementById('emailfield').style.border = null;
        $('#emailfield').next("div").remove();
        
      }
      if (!vaalidateName(name)){
      
        $('#name-field').next("div").remove();
        
        inputNode = document.getElementById('name-field');
        inputNode.style.border = "1px #fc0330 solid";
        var span =document.createElement('div');
        span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;  margin-top:-1rem; margin-bottom:0.8rem; margin-left:0.5rem;");
        span.innerHTML= "Enter Only Alphabets and Space!";
        inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
        allAreFilled = false;
        
      }else{
        document.getElementById('name-field').style.border = null;
        $('#name-field').next("div").remove();
        
      }
      if (!vaalidateNum(phonenum)){
      
        $('#phone').next("div").remove();
        
        inputNode = document.getElementById('phone');
        inputNode.style.border = "1px #fc0330 solid";
        var span =document.createElement('div');
        span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;  margin-top:0.5rem;  margin-left:0.5rem;");
        span.innerHTML= "Enter Only Valid Phone Number!";
        inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
        allAreFilled = false;
        
      }else{
        document.getElementById('phone').style.border = null;
        $('#phone').next("div").remove();
        
      }
      // if (!vaalidateAddr(address)){
      
      //   $('#address').next("div").remove();
        
      //   inputNode = document.getElementById('address');
      //   // inputNode.style.border = "1px #fc0330 solid";
      //   var span =document.createElement('div');
      //   span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;  margin-top:-1rem; margin-bottom:0.8rem; margin-left:0.5rem;");
      //   span.innerHTML= "Enter Only Valid Address Format!";
      //   inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
      // allAreFilled = false;
        
      // }else{
      //   document.getElementById('address').style.border = null;
      //   $('#address').next("div").remove();
        
      // }
     
      
     
     
 
    if (allAreFilled){
      const cb = document.querySelector('#termscondition:checked');
    
      if (cb != null){
        return allAreFilled;
       
    }else{
      
      document.getElementById("termscondition").style.outline="0.1rem solid #fc0330";
      return !(allAreFilled);
    } 
      } ;


   
  
  return allAreFilled;
   
    
    

   
  
    
  
   

}

const vaalidateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function vaalidateName(name) {
  var regex = /^[a-zA-Z ]{2,30}$/;
  return regex.test(name);
}
function vaalidateNum(phNum) {
  var regexnum = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return regexnum.test(phNum);
}
function vaalidateAddr(addr) {
  var regexaddr = /[A-Za-z0-9'\.\-\s\,]/;
  return regexaddr.test(addr);
}

$('#my-form').on('submit', function(event){
  
  if(locationMaps()){
    console.log('success');
  
        }else{
          event.preventDefault();
        }
  
});

 var input = document.querySelector("#phone");
 window.intlTelInput(input, {
   // allowDropdown: false,
    //autoHideDialCode: false,
   // autoPlaceholder: "off",
   // dropdownContainer: document.body,
   // excludeCountries: ["us"],
   // formatOnDisplay: false,
   // geoIpLookup: function(callback) {
     //$.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      // var countryCode = (resp && resp.country) ? resp.country : "";
       //callback(countryCode);
      //});
    //},
   // hiddenInput: "full_number",
   //initialCountry: "auto",
   // localizedCountries: { 'de': 'Deutschland' },
   // nationalMode: false,
   // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
   // placeholderNumberType: "MOBILE",
   preferredCountries: ['np'],
   separateDialCode: true,
   utilsScript: "build/js/utils.js",
 });

 function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var options={
      zoom:8,
      center:{lat:position.coords.latitude, lng:position.coords.longitude}
    }
 
 


  // The map, centered at location taken
  const map = new google.maps.Map(document.getElementById("map"),options);
  // The marker, positioned at location taken
  const marker = new google.maps.Marker({
    position:{lat:position.coords.latitude, lng:position.coords.longitude},
  
    map: map
  });
 
});
}
function cancelOrder(id){
  $.ajax({
    type: "POST",
    url: '/cancelorder/',
    data: {
        'id': id,
        'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
    },
    dataType: "json",
    
});
location.reload();
}
function deleteOrder(id){
  $.ajax({
    type: "POST",
    url: '/orderdelete/',
    data: {
        'id': id,
        'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
    },
    dataType: "json",
    
});
location.reload(); 
}
function orderGF(id){
  
  $.ajax({
    type: "POST",
    url: '/ordergf/',
    data: {
       'id': id,
       'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
       'feedback':$('#feedback-txt').val(),
    },
    dataType: "json",
   
    
});
$('#feedback-txt').val("");
}



function orderMR(id){
  $.ajax({
    type: "POST",
    url: '/ordermr/',
    data: {
      'id': id,
      'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
    },
    dataType: "json",
    
    
});

location.reload();
}


function orderDetail(id){
  
  $.ajax({
    type: "POST",
    url: '/orderdetail/',
    data: {
         'id': id,
       'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
    },
    dataType: "json",
    

success: function(data){

  updates = (data);
          let itemsJson = updates['itemsJson'];
          let email = updates['email'];
          let phone = updates['phone'];
          let payment = updates['payment'];
          let notetodriver = updates['notetodriver'];
          let time = updates['time'];
          let date = updates['date'];
          let orderDate = updates['orderDate'];
          let method = updates['method'];
          let address = updates['address'];
          let totalAmt = updates['totalAmt'];
         
       
var codeblck = 

    '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Items: &nbsp&nbsp</b><i>'+itemsJson+' </i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Total Amount: &nbsp&nbsp</b><i>' +totalAmt+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Email: &nbsp&nbsp</b><i>' +email+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Phone: &nbsp&nbsp</b><i>' +phone+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Payment Mode: &nbsp&nbsp</b><i>' +payment+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Address: &nbsp&nbsp</b><i>'+address+' </i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Order Day: &nbsp&nbsp</b><i>' +orderDate+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Order Date: &nbsp&nbsp</b><i>'+date+'</i> </p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Order Time: &nbsp&nbsp</b><i>' +time+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Method: &nbsp&nbsp</b><i>'+method+'</i></p>'+
  '<p style = "font-size: 1.6rem;"><b style = "font-weight:500; color:#444;">Note To Driver: &nbsp&nbsp</b><i>'+notetodriver+'</i> </p>';
    
  $("#modalcontent").html(codeblck);
 

  


}
  });


}
function idpasser(id){
  var txt = "orderGF('GF-" + id + "')";
  $("#feedbacktitle").html('Feedback For Order <i>SMBOI'+id+'</i>');
  $("#feedbacksubmitbtn").attr("onclick",txt);

}