import './App.css';
import axios from 'axios';
import { UserCard } from './components/UserCard';
import { User } from './types/api/user';
import { useState } from 'react';
import { UserProfile } from './types/userProfile';

export default function App() {
  const JSONP_API_USERS = "https://jsonplaceholder.typicode.com/users"
  // const JSONP_API_USERS = "https://jsonplaceholder.typicode.com/dummy"     // [test用] 存在しないURL

  const [UserProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  // loading 設定
  const [loading, setLoading] = useState(false);

  // error 判定
  const [error, setError] = useState(false);

  // axios api 実行
  const onClickFetchUser = () => {
    setLoading(true); // このプログラムが正常に実行されている間はtrue
    setError(false);  // エラーが発生したらtrueに変換

    axios
      .get<Array<User>>(JSONP_API_USERS)
      .then((res) => {
        const date = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(date);
      })

      // 例外処理: プログラム実行中にエラーが発生した場合に行う処理
      .catch(() => {
        setError(true);
      })

      // 処理の最期に必ず実行
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {/* errorがtrueの場合, errorはfalseでloadingがtrueの場合、そのどちらでもない場合の3つの状態に応じて処理を定義 */}
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました。</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {UserProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))};
        </>
      )}
    </div>
  );
};
