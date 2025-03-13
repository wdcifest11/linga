import { useParams, useNavigate } from "react-router-dom";
import detailinterface from "../assets/DetailInterface";
import items from "../dummydatas/items.json";
import userdata from "../dummydatas/users.json";
import "./ItemDetails.scss";
import { useContext, useEffect } from "react";
import { AccountContext } from "../Context";
import gsap from "gsap";
import Transition from "../assets/Transition";

function ItemDetails() {
  const account = useContext(AccountContext);
  const navigate = useNavigate();
  const { id } = useParams();
  let type: "ownItems" | "toTrade";
  
  const item: detailinterface | undefined = items.find(
    (item) => item.id === id
  );
  const currentUser = userdata.find((user) => user.userid === item?.user);

  if (item?.user === account.userid) {
    type = "ownItems";
  } else {
    type = "toTrade";
  }

  const price =
    item && item.price > 0
      ? `Rp ${item.price.toLocaleString("id-ID")},00`
      : "Trade only";

  const handleTradeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item) return;

    if (item.user === account.userid) {
      const storedOwn = JSON.parse(localStorage.getItem("ownedItems") || "[]");
      if (!storedOwn.includes(item.id)) {
        storedOwn.push(item.id);
        localStorage.setItem("ownedItems", JSON.stringify(storedOwn));
      }
      type = "ownItems";
    } else {
      const storedTrades = JSON.parse(
        localStorage.getItem("toBeTraded") || "[]"
      );
      if (!storedTrades.includes(item.id)) {
        storedTrades.push(item.id);
        localStorage.setItem("toBeTraded", JSON.stringify(storedTrades));
      }
      type = "toTrade";
    }
    navigate(`/trade`, { state: { newItem: item.id, type: type } });
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item) return;

    const storedBuys = JSON.parse(localStorage.getItem("toBuyStorage") || "[]");
    if (!storedBuys.includes(item.id)) {
      storedBuys.push(item.id);
      localStorage.setItem("toBuyStorage", JSON.stringify(storedBuys));
    }
    navigate(`/cart`, { state: item.id, replace: true });
    navigate(0);
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/user/${currentUser?.userid}`);
  };

  useEffect(() => {
    gsap.fromTo(
      ".itemDetailsContainer",
      { x: -20, opacity: 0, duration: 0.3 },
      { x: 0, opacity: 1 }
    );
  }, []);

  return (
    <div className="itemDetailsContainer">
      <img src={item?.image} className="image" alt={item?.name} />
      <div className="detailContainer">
        <p className="name">{item?.name}</p>
        <p className="size inside">{item?.size}</p>
        <p className="yearCondition inside">
          {item?.year}, {item?.condition}
        </p>
        <div className="detailUserContainer" onClick={handleUserClick}>
          <img className="userDetailImage" src={currentUser?.profilepic} alt={currentUser?.username} />
          <p className="userDetailName">{currentUser?.username}</p>
        </div>
        <p className="price">{price}</p>
        <p className="description">{item?.description}</p>
      </div>
      <div className="buttonContainer">
        {item?.sellable && account.userid !== item?.user && (
          <button className="buyButton" onClick={handleBuyClick}>
            Buy
          </button>
        )}
        {item?.tradeable && (
          <button className="tradeButton" onClick={handleTradeClick}>
            Trade
          </button>
        )}
      </div>
    </div>
  );
}

const WrappedDetails = Transition(ItemDetails);

export { ItemDetails };
export default WrappedDetails;
