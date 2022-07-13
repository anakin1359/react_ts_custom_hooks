import './App.css';
import { UserCard } from './components/UserCard';
import { useAllUsers } from "./hooks/useAllUsers";

export default function App() {

  // カスタムhooksで定義した内容を読み込む
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  // axios api 実行
  const onClickFetchUser = () => getUsers();

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
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))};
        </>
      )}
    </div>
  );
};
