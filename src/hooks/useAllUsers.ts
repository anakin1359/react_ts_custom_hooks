import axios from "axios";
import { useState } from "react";
import { User } from "../types/api/user";
import { UserProfile } from "../types/userProfile";

// 全ユーザの情報を取得するカスタムフック
export const useAllUsers = () => {
    const JSONP_API_USERS = "https://jsonplaceholder.typicode.com/users"
    // const JSONP_API_USERS = "https://jsonplaceholder.typicode.com/dummy"     // [test用] 存在しないURL

    // user profile 情報管理
    const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

    // loading 設定
    const [loading, setLoading] = useState(false);

    // error 判定
    const [error, setError] = useState(false);

    // ユーザ情報取得API
    const getUsers = () => {
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

    // 他componentからも参照できるように設定
    return { getUsers, userProfiles, loading, error };
};
