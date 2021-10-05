import './App.css';
import { useState, useEffect } from "react";
import Input from './Components/Input';
import MessageList from './Components/MessageList';
import Header from './Components/Header';

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
};

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
};

const currentMember = {name: randomName().toUpperCase(), color: randomColor()};
const drone = new window.Scaledrone('pevk9kVIWRiYoAHF', {
  data: {
    name: currentMember.name,
    color: currentMember.color,
  }
});
const room = drone.subscribe('observable-room');

function App() {
  const [messages, setMessages] = useState([]);
  const newMessage = drone.publish;

  function sendMessage(message) {
    drone.publish({
      room: 'observable-room',
      message: message
    });
  };

  useEffect(() => {
    room.on('message', message => {
      const messageList = messages;
      messageList.push(message);
      setMessages([...messageList]);
    });
  }, [newMessage]);
  
  return (
    <div className="App">
      <Header />
      <MessageList messages={messages} currentMember={currentMember} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default App;
