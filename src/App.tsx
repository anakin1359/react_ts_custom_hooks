import './App.css';
import { UserCard } from './components/UserCard';

const user = {
  id: 1,
  name: "anakin",
  email: "anakin@gmail.com",
  address: "東京都千代田区XXXX"
};

export default function App() {
  return (
    <div className="App">
      <UserCard user={user}/>
    </div>
  );
};
