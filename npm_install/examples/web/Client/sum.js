var calculate = function () {
  var x = parseInt(document.getElementById('x').value);
  var y = parseInt(document.getElementById('y').value);
  
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      document.getElementById('sum').value = JSON.parse(request.responseText).sum;
    }
  };
  
  request.open("GET", "/calculate?x=" + x + "&y=" + y);
  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  request.send();		
};