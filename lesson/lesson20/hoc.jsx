//high order component
import { useEffect, useState } from "react";

function UserProfile1() {
  return <div>current profile 1 page: {user} red </div>;
  const { data } = () => useState();
}

function UserProfile2() {
  return <div>current profile 2 page: {user} blue </div>;
  const { data } = () => useState();
}

function withUser(Component) {
  return function NewComponent(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
      setTimeout(() => {
        setUser("zhangsan");
      }, 1000);
    }, []);
    return <Component {...props} user={user} />;
  };
}

const NewProfile1 = withUser(UserProfile1);
