class cartItem{
  constructor(name,price,path,idname,initQuantity){
    this.name=name;
    this.price=price;
    this.initQuantity = initQuantity;
    this.path=path;
    this.idname=idname;
    
  }

  createCartElement(){
    
    var codeBlock=' <div class="cart-item" id="cart-'+this.idname+'">'  +
    '<img src="/'+this.path+'" class="resize" alt="'+this.name+'" />' +
     '<div class = "cartname">' +
        '<h3>'+ this.name+'</h3>' +
          '<div class="subscript-price" id="subscript-price-'+this.idname+'">'+this.price+'</div>'+
         '</div>' +
 
          '<div class="rounded-box" id="quantityChoose">'  +
              '<button class="semi-rounded-left" id="decrement-'+this.idname+'">-</button>' +
               '<div class="svlinel"></div>'  +
                '<div class="small-rounded-box" id="quantity-'+this.idname+'">         '+ this.initQuantity +'     </div>'  +
                   '<div class="svliner"></div>'  +  
                   ' <button class="semi-rounded-right" id="increment-'+this.idname+'">+</button>'  +
                   ' </div>'+  
                   '<button  id="note-'+this.idname+'"  class="noteBtn"   title="Special Note"><i class="fas fa-comment-alt"></i></button>'+
                    ' <button  id="del-'+this.idname+'"  class="trashBtn" name = "trashBtn"  title="Delete Item"><i class="fa fa-trash" aria-hidden="true"></i></button>'+
                   '<div class="srb-clone"></div>'+
                    '</div>';
                 
                    var wrapper=document.createElement('div');
                    wrapper.innerHTML=codeBlock;
                
                    wrapper.style.width="40rem";
                    document.getElementById("empty-cart").style.display="none";
                   
                    document.getElementById(this.idname).innerHTML='Added to cart&nbsp <i class="fa fa-shopping-cart"></i>';
document.getElementById(this.idname).setAttribute("disabled", "disabled");

     return document.getElementById("cartItems").appendChild(wrapper);
    
    
     

  }

  increDecre(){
    let thisid = this.idname;  
    let incre="increment-"+thisid;
      
      let decre="decrement-"+thisid;
      let quant="quantity-"+thisid;
      let subpp="subscript-price-"+thisid;
     
    let total;
  
      let pp;
     //incDec button
    
 
  
  //taking value to increment decrement input value
  
 let valueCount = parseInt(document.getElementById(quant).innerText);
 if(valueCount <= 1){
  document.getElementById(decre).setAttribute("disabled", "disabled");
 }
  //taking price value in variable

   pp = parseInt((this.price).slice(3));
   document.getElementById(subpp).innerText = "Rs."+ pp*valueCount;
  
  

  //price calculation function

  updateTotalAmount();
  

  //plus button
  document.getElementById(incre).addEventListener("click", function() {
      //getting value of input
      
      //input value increment by 1
      valueCount++;
      

      //setting increment input value
      document.getElementById(quant).innerText = valueCount;

      if (valueCount > 1) {
          document.getElementById(decre).removeAttribute("disabled");
          document.getElementById(decre).classList.remove("disabled")
      }
      total = valueCount * pp;

     
      var text =JSON.parse(localStorage.getItem('cartItems'));
      text[thisid] = valueCount;
     
      localStorage.setItem('cartItems',JSON.stringify(text));
    
      document.getElementById(subpp).innerText = "Rs."+total;
updateTotalAmount();
      
     
  });

  //plus button
  document.getElementById(decre).addEventListener("click", function() {
      //getting value of input
      valueCount = parseInt(document.getElementById(quant).innerText);

      //input value increment by 1
      valueCount--;

      //setting increment input value
      document.getElementById(quant).innerText = valueCount

      if (valueCount == 1) {
          document.getElementById(decre).setAttribute("disabled", "disabled")
      }

      total = valueCount * pp;
      
      document.getElementById(subpp).innerText = "Rs."+total;
      var text =JSON.parse(localStorage.getItem('cartItems'));
      text[thisid] = valueCount;
      
      localStorage.setItem('cartItems',JSON.stringify(text));
    updateTotalAmount();


});



 }
}






var n = 0;
var cartOn = true;
var checkoutTotal=0;
var idnames = [];
var cartItems;
var today = new Date();
var minDate = new Date();
var maxDate = new Date();
var tomDate = new Date();
tomDate.setDate(tomDate.getDate()+1);
minDate.setDate(minDate.getDate() + 2);
maxDate.setDate(maxDate.getDate() + 9);
var tomdd = tomDate.getDate();
var tommm = tomDate.getMonth()+1;
var minmm = minDate.getMonth()+1;
var mindd = minDate.getDate();
var maxmm = maxDate.getMonth()+1;
var maxdd = maxDate.getDate();
var hr = today.getHours();
var min = today.getMinutes();
if(min < 59){
  min = min + 1;
}
if(min == 59){
  if(hr <12){
  hr = hr + 1;
  }
  min = 0;
}
if(min < 10){
  min = '0' + min;
}
if (hr < 10){
  hr = '0' + hr;
}
if (mindd < 10) {
  mindd = '0' + mindd;
}
if (minmm < 10) {
  minmm = '0' + minmm;
}
if (maxdd < 10) {
  maxdd = '0' + maxdd;
}
if (maxmm < 10) {
  maxmm = '0' + maxmm;
}
if (tomdd < 10) {
  tomdd = '0' + tomdd;
}
if (tommm < 10) {
  tommm = '0' + tommm;
}

var mindate = minDate.getFullYear()+'-'+(minmm)+'-'+(mindd);
var maxdate = maxDate.getFullYear()+'-'+(maxmm)+'-'+(maxdd);
var tomdate = tomDate.getFullYear()+'-'+(tommm)+'-'+(tomdd);

if(today.getMonth()+1 < 10){
  var toddate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();

}else{
  var toddate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
}

if(today.getDate() < 10){
  var toddate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();

}else{
  var toddate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
}

var deftime = hr +':'+ min;







$(document).ready(function(){
  cartItemNumUpdater();
  document.getElementById("preorder-date").setAttribute("value",mindate);

  if(parseInt(deftime.slice(0,2))>=20){
    document.getElementById("today").disabled = true;
  }

  if(localStorage.getItem('cartItems')== null){
    cartItems = {};
    
  
  }else{
  cartLoader();
  }
  for(var item in menuItem){
   
    var fields = menuItem[item]['fields'];
    idnames.push(fields.idname);
  }

  $("button[name='addtocartbtn']").click(function() {
    if(!cartOn){
      document.getElementById('cart').style.display = "block";
      document.getElementById('cartBtn').innerHTML = '<i class="fas fa-cart-arrow-down"></i>';
      cartOn = true;
    }
   
      for(var item in menuItem){
        var fields = menuItem[item]['fields'];
        if(this.id == fields.idname){
         var text = JSON.parse(localStorage.getItem('cartItems'));
         if(text == null){
          text = {};
         }
         
        Object.assign(text,{[this.id]:1});
    
            localStorage.setItem('cartItems',JSON.stringify(text));
          
      
 
            
            var clickedItem = new cartItem(fields.name,(fields.price),("media/"+fields.image),fields.idname,1); 
          
      
      }


      }
 
     
    
      
  
     clickedItem.createCartElement();
    
    clickedItem.increDecre();
  
  
  
   
    $("button[name='trashBtn']").click(function() {
     
      destroyCartElement(this.id);
      
        });
  
      
    
  });




  // $("#cartBtn").click(function(){
   
  //   $("#cart").toggle();
  //   //reload menu
  //     var container = document.getElementById("order");
  //     var content = container.innerHTML;
  //     container.innerHTML= content; 
  



   
      
  
  // });

});

function destroyCartElement(objId){
    
  var idname = objId.slice(4);
  var obj = "#cart-"+idname;

  var text =JSON.parse(localStorage.getItem('cartItems'));
 
  
  delete text[idname];
  
 
 
  
  localStorage.setItem('cartItems',JSON.stringify(text));
 
  
   
  
    
      
      
      
       document.getElementById(idname).innerText="Add to cart";
       
       document.getElementById(idname).removeAttribute("disabled");
       document.getElementById(idname).classList.remove("disabled");
    
      $(obj).fadeTo(250, 0.1,function(){
     
       $(obj).remove();
       updateTotalAmount();
       var bannerShow=true;
     for(var id in idnames){
       var itemName="cart-"+idnames[id];
     
       
       if(document.getElementById(itemName)!=null) { bannerShow=false; break;}
     }
    
     
     if(bannerShow==true){
       document.getElementById("empty-cart").style.display="block";
       document.getElementById("total-amount").style.display="none";
  
     }
      });
   
  
   
      
     
     }


function updateTotalAmount(){
  cartItemNumUpdater();
  var cartItemContainer = document.getElementsByClassName('cart')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-item');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = parseInt((cartRow.getElementsByClassName('subscript-price')[0].innerText).slice(3));
      
     
     
      total = total + (priceElement);
  }
  document.getElementById("total-amount").style.display="block";
  document.getElementById('checkout').innerHTML='<i class="far fa-credit-card"></i> &nbsp &nbspCheckout';
  document.getElementById('amount').innerText = 'Rs. ' + total;
  document.getElementById('amt-total').value = 'Rs. ' + total;
  document.getElementById('item-json').value = localStorage.getItem('cartItems') ;
  

}
document.getElementById("checkout").onclick =function(){

  document.getElementById("order").style.display="none";
  document.getElementById("checkout-box").style.display="flex";
  document.getElementById("editBtn").style.display="block";
  document.getElementById('checkout').style.display = "none";
  document.getElementById('cart').style.width = "32%";
  counterDisable();
  
}
// document.getElementById("confirm-btn").onclick =function(){
//   if(checkoutFormValidation()){
//     console.log('success');
//         }
// }
$('#post-form').on('submit', function(event){
  if(checkoutFormValidation()){
    console.log('success');
    localStorage.clear();
        }else{
          event.preventDefault();
        }
  
});




document.getElementById("editBtn").onclick= function(){
  counterEnable();
  document.getElementById("order").style.display="flex";
  document.getElementById("checkout-box").style.display="none";
  document.getElementById("editBtn").style.display="none";
  document.getElementById('checkout').style.display='block';
  document.getElementById('cart').style.width = "70%";
}


function preorderChecked(checkboxId){
 

  if (checkboxId == "preorder"){
    if(document.getElementById("preorder-div").style.display != "block"){
document.getElementById("preorder-div").style.display = "block";

document.getElementById("preorder-date").setAttribute("value",mindate);
document.getElementById("preorder-date").setAttribute("min",mindate);
document.getElementById("preorder-date").setAttribute("max",maxdate);
document.getElementById("order-time").setAttribute("value","09:00");
document.getElementById("order-time").setAttribute("min","09:00");


$("#preorder-div").animate({
    
    
  height: '8.2rem'
 
});
    }
  }else if(checkboxId == "tommorow"){
    document.getElementById("preorder-date").setAttribute("min",tomdate);
    document.getElementById("preorder-date").setAttribute("value",tomdate);
    document.getElementById("preorder-date").setAttribute("max",tomdate);
    document.getElementById("order-time").setAttribute("value","09:00");
    document.getElementById("order-time").setAttribute("min","09:00");
    if(document.getElementById("preorder-div").style.display == "block"){
    
    $("#preorder-div").animate({height: '0rem'}, function(){
     
      document.getElementById("preorder-div").style.display = "none";

      
    
  });
}

  }else if(checkboxId == "today"){
    document.getElementById("preorder-date").setAttribute("min",toddate);
    document.getElementById("preorder-date").setAttribute("value",toddate);
    document.getElementById("preorder-date").setAttribute("max",toddate);
    document.getElementById("order-time").setAttribute("value",deftime);
    document.getElementById("order-time").setAttribute("min",deftime);
    if(document.getElementById("preorder-div").style.display == "block"){
    $("#preorder-div").animate({height: '0rem'}, function(){
     
      document.getElementById("preorder-div").style.display = "none";

      
    
  });
}

  }
}



function checkoutFormValidation(){
  let check = true;
  let fname=document.getElementById("fname").value.trim(); 
  let lname=document.getElementById("lname").value.trim();
  let email=document.getElementById("email-field1").value.trim();
  let phone=document.getElementById("phone").value.trim();
  let address=document.getElementById("address").value.trim();
  if(!validateName(fname)){
    $('#fname').next("span").remove();
    inputNode = document.getElementById('fname');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;");
    span.innerHTML= "Enter Only Alphabets!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  }else{
    document.getElementById('fname').style.border = null;
    $('#fname').next("span").remove();
    
  }
  if(!validateName(lname)){
    $('#lname').next("span").remove();

    inputNode = document.getElementById('lname');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;");
    span.innerHTML= "Enter Only Alphabets!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  }
  else{
    document.getElementById('lname').style.border = null;
    $('#lname').next("span").remove();
  }
  if(!validateEmail(email)){
    $('#email-field1').next("span").remove();
    inputNode = document.getElementById('email-field1');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;margin-top:-1rem;margin-bottom:1rem;");
    span.innerHTML= "Enter Only Valid Email Format!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  }
  else{
    document.getElementById('email-field1').style.border = null;
    $('#email-field1').next("span").remove();
  }
  if(!validateNum(phone)){
    $('#phone').next("span").remove();
    inputNode = document.getElementById('phone');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;margin-top:-1rem;margin-bottom:1rem;");
    span.innerHTML= "Enter Only Numeric Value!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  }
  else{
    document.getElementById('phone').style.border = null;
    $('#phone').next("span").remove();
  }
  if(!validateAddr(address)){
    $('#address').next("span").remove();
    inputNode = document.getElementById('address');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left;margin-top:-1rem; margin-bottom:1rem;");
    span.innerHTML= "Enter Valid Address Format!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  }
  else{
    document.getElementById('address').style.border = null;
    $('#address').next("span").remove();
  }
  if(!atLeastOneRadio("method")){
    $('#method-id').next("span").remove();
    inputNode = document.getElementById('method-id');
   
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left; padding-top:0.8rem;");
    span.innerHTML= "Enter At Least One Option!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  } else{
   
    $('#method-id').next("span").remove();
  }
  if(!atLeastOneRadio("payment")){
    $('#paymentdiv-id').next("span").remove();
    inputNode = document.getElementById('paymentdiv-id');
   
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left; padding-top:0.8rem;");
    span.innerHTML= "Enter At Least One Option!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  } else{
   
    $('#paymentdiv-id').next("span").remove();
  }
  if(!atLeastOneRadio("time")){
    $('#timediv-id').next("span").remove();
    inputNode = document.getElementById('timediv-id');
   
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left; padding-top:0.8rem;");
    span.innerHTML= "Enter At Least One Option!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  } else{
   
    $('#timediv-id').next("span").remove();
  }
  
  if(document.getElementById("order-time").value == null || document.getElementById("order-time").value == "" || document.getElementById("order-time").value == undefined ){
    $('#order-time').next("span").remove();
    inputNode = document.getElementById('order-time');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left; padding-top:0.5rem;");
    span.innerHTML= "Enter A Valid Time!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check=false;
   
  } else{
    document.getElementById('order-time').style.border = null;
    $('#order-time').next("span").remove();
  }
  if(document.getElementById("preorder-date").value == null || document.getElementById("preorder-date").value == "" || document.getElementById("preorder-date").value == undefined ){
    $('#preorder-date').next("span").remove();
    inputNode = document.getElementById('preorder-date');
    inputNode.style.border = "1px #fc0330 solid";
    var span =document.createElement('span');
    span.setAttribute("style","font-size: 1.2rem; color:#fc0330; text-align:left; padding-top:0.5rem;");
    span.innerHTML= "Enter A Valid Date!";
    inputNode.parentNode.insertBefore(span, inputNode.nextSibling);
    check = false;
  } else{
    document.getElementById('preorder-date').style.border = null;
    $('#preorder-date').next("span").remove();
  }
  return check;
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function validateName(name) {
  var regex = /^[a-zA-Z]{2,30}$/;
  return regex.test(name);
}
function validateNum(phNum) {
  var regexnum = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return regexnum.test(phNum);
}
function validateAddr(addr) {
  var regexaddr = /[A-Za-z0-9'\.\-\s\,]/;
  return regexaddr.test(addr);
}
function atLeastOneRadio(radioName) {
  var getSelectedValue = document.querySelector( 'input[name="'+radioName+'"]:checked');   
if(getSelectedValue != null) {   
         return true; 
}else {  
         return false; 
}
}


function counterDisable(){
  var cartItemContainer = document.getElementsByClassName('cart')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-item');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = parseInt((cartRow.getElementsByClassName('subscript-price')[0].innerText).slice(3));
      var quantity = parseInt((cartRow.getElementsByClassName('small-rounded-box')[0].innerText));
      
     
     
      total =priceElement/quantity;
      cartRow.getElementsByClassName('subscript-price')[0].innerText="Rs. "+total;
      cartRow.getElementsByClassName('semi-rounded-left')[0].style.display="none";
      cartRow.getElementsByClassName('semi-rounded-right')[0].style.display="none";
      cartRow.getElementsByClassName('svlinel')[0].style.display="none";
      cartRow.getElementsByClassName('svliner')[0].style.display="none";
      cartRow.getElementsByClassName('trashBtn')[0].style.display="none";
      cartRow.getElementsByClassName('srb-clone')[0].style.display="flex";
      cartRow.getElementsByClassName('srb-clone')[0].innerText="Rs. "+priceElement;
  
    

      cartRow.getElementsByClassName('small-rounded-box')[0].innerText=(cartRow.getElementsByClassName('small-rounded-box')[0].innerText)+"x";
      
     
     
    
  }
}
function counterEnable(){
  var cartItemContainer = document.getElementsByClassName('cart')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-item');

  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      
      cartRow.getElementsByClassName('subscript-price')[0].innerText= cartRow.getElementsByClassName('srb-clone')[0].innerText;
     
    
      cartRow.getElementsByClassName('semi-rounded-left')[0].style.display="block";
      cartRow.getElementsByClassName('semi-rounded-right')[0].style.display="block";
      cartRow.getElementsByClassName('svlinel')[0].style.display="block";
      cartRow.getElementsByClassName('svliner')[0].style.display="block";
      cartRow.getElementsByClassName('trashBtn')[0].style.display="block";
      cartRow.getElementsByClassName('srb-clone')[0].style.display="none";

      cartRow.getElementsByClassName('small-rounded-box')[0].innerText=parseInt(cartRow.getElementsByClassName('small-rounded-box')[0].innerText);
      
     
     
    
  }
}

function cartLoader(){
 
  cartItems = JSON.parse(localStorage.getItem('cartItems'));
  for(var element in cartItems){
    
   for(var item in menuItem){
    var temp = menuItem[item]['fields'];
    if(temp.idname == element){
      var fields = temp;
      break;
    }
   }
 
 
        
    var clickedItem = new cartItem(fields.name,(fields.price),("media/"+fields.image),fields.idname,cartItems[element]); 
      
  
  
  
  
  
  
  clickedItem.createCartElement();
  
  clickedItem.increDecre();
  updateTotalAmount();
  
  
  
  $("button[name='trashBtn']").click(function() {
  
  destroyCartElement(this.id);
  
    });
  }

  }
  
function toggleCartBtn(){

  if(cartOn){
  document.getElementById('cart').style.display = "none";
  document.getElementById('cartBtn').innerHTML = '<i class="fa fa-shopping-cart"></i><sup><span id = "numberCircle">'+ n + '</span></sup>';
  cartOn = false;
  return;
  }else if(!cartOn){
    document.getElementById('cart').style.display = "block";
    document.getElementById('cartBtn').innerHTML = '<i class="fas fa-cart-arrow-down"></i>';
    cartOn = true;
    return;
  }
}
function cartItemNumUpdater(){
  var temp = JSON.parse(localStorage.getItem('cartItems'));
  n = 0;
  for(var item in temp){
    n = n + parseInt(temp[item]);
  }
  
}