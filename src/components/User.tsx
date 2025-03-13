import { useParams } from "react-router-dom";
import userdata from "../dummydatas/users.json";
import datas from "../dummydatas/items.json";
import ItemCard from "./ItemCard";
import "./User.scss";
import { useContext, useEffect } from "react";
import { AccountContext } from "../Context";
import gsap from "gsap";
import Transition from "../assets/Transition";

function User() {
  useEffect(() => {
    gsap.fromTo(
      ".userContainer",
      {
        x: -20,
        opacity: 0,
        duration: 0.3,
      },
      {
        x: 0,
        opacity: 1,
      }
    );
  }, []);

  const account = useContext(AccountContext);
  let currentUser;
  const { userid } = useParams();
  if (!userid) return <p>ID not found</p>;

  if (String(userid) === account.userid) {
    currentUser = account;
  } else {
    currentUser = userdata.find((user) => user.userid === String(userid));
    if (!currentUser) return <p>User not found</p>;
  }

  const filteredItems = datas.filter(
    (item) => item.user === currentUser.userid
  );

  return (
    <div className="userContainer">
      <div className="topUserBar">
        <img
          className="profilePic"
          src={currentUser.profilepic}
          alt="Profile"
        />
        <h2 className="userName">{currentUser.username}</h2>
      </div>
      <div className="separator"></div>
      <div className="itemList">
        <p>Items</p>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ItemCard key={item.id} {...item} />)
        ) : (
          <p>No items</p>
        )}
      </div>
    </div>
  );
}

const WrappedUser = Transition(User);

export { User };
export default WrappedUser;
