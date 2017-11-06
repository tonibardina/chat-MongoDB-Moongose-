window.onload = function () {
  let messages = []
  let socket = io.connect('http://localhost:3000')
  let field = document.getElementById('field')
  let sendButton = document.getElementById('send')
  let content = document.getElementById('content')
  let name = document.getElementById('name')

  socket.on('message', function (data) {
    if (data.message) {
      messages.push(data)
      var html = ''
      for (var i = 0; i < messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>'
        html += messages[i].message + '<br />'
      }
      content.innerHTML = html
      content.scrollTop = content.scrollHeight
    } else {
      console.log('There is a problem:', data)
    }
  })

  $(document).ready(function () {
    $("#field").keyup(function (e) {
      if (e.keyCode === 13) {
        sendMessage()
      }
    })
  })

  sendButton.onclick = sendMessage = function () {
    if (name.value === '') {
      alert('Please type your name!')
    } else {
      var text = field.value
      socket.emit('send', { message: text, username: name.value })
    }
  }
}
