function switchMode(){
  let val = document.getElementById('switch').checked;
  if(val){
    loadListings("myOrders");
  } else {
    loadListings("orderedByMe");
  }
}
