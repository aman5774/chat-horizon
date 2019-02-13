// make connection
const socket = io.connect('http://localhost:4000/');

// fetching DOM elements
const handle = document.getElementById('handle'),
      message = document.getElementById('message'),
      send = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// emit events
send.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});

// listen for events
socket.on('chat', function(data){
  output.innerHTML += `<p><strong>${data.handle}: </strong> ${data.message}</p>`
  feedback.innerHTML = '';
});

socket.on('typing', function(data){
  feedback.innerHTML = `<p><em>${data}</em> is typing ..</p>`
});
