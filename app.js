
      var mypeerid = null;
      var peer = null;
      var connection = null;
      
      var init = function() {
        //peer = new Peer({key: 'uohu08l7r6swcdi'});
        peer = new Peer({host: '104.131.82.13', port: 9000, path: '/'});
        
        peer.on('open', function(id) {
          console.log('My peer ID is: ' + id);
          mypeerid = id;
        });
        
        peer.on('connection', function(conn) {
          connection = conn;
          connection.on('open', function() {
            document.getElementById('chatlog').innerHTML += "Connection Established";
          });
          connection.on('data', function(data) {
            document.getElementById('chatlog').innerHTML += data;
          });
        });
      };  
      
      var sendmessage = function() {
        connection.send(document.getElementById('chat').value);
        document.getElementById('chat').value = "";
      };

      var placecall = function() {
        connection = peer.connect(document.getElementById('other_peer_id').value);
        connection.on('open', function(data) {
          document.getElementById('chatlog').innerHTML += "Connection Established";
        });

        connection.on('data', function(data) {
          document.getElementById('chatlog').innerHTML += data;
        });
      };  
