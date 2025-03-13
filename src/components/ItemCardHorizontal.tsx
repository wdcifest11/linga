import { useContext, useEffect, useRef, useState } from "react";
import "./ItemCardHorizontal.scss";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import itemdata from "../dummydatas/items.json";
import { AccountContext } from "../Context";

export default function ItemCardHorizontal({
  itemid,
  refreshItems,
  isAddCard = false,
}: {
  itemid: string;
  refreshItems: () => void;
  isAddCard?: boolean;
}) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const account = useContext(AccountContext);
  const props = itemdata.find((item) => item.id === itemid);
  const storageKey =
    props?.user === account.userid ? "ownedItems" : "toBeTraded";
  const [items, setItems] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  });
  const formattedPrice = props?.price.toLocaleString("id-ID");
  const price = props!.price > 0 ? `Rp ${formattedPrice},00` : "Trade only";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".deleteButton")) {
        return;
      }
      e.stopPropagation();
      navigate(`/itemdetail/${props?.id}`);
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("click", handleClick);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("click", handleClick);
      }
    };
  }, [navigate, props]);

  useEffect(() => {
    gsap.to(cardRef.current, {
      x: 10,
      opacity: 100,
      duration: 0.1,
    });
  }, []);

  if (!props) {
    return <p>Error: Item not found.</p>;
  }

  if (isAddCard) {
    return (
      <div
        className="verticalCard addCard"
        ref={cardRef}
        onClick={() => alert("Open Add Item Dialog")}
      >
        <img src="./plus.png" className="imageVertical" alt="Add Item" />
        <div className="textContainer">
          <p className="nameContainer">Add Items</p>
        </div>
      </div>
    );
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setTimeout(() => {
          const updatedItems = items.filter((item) => item !== itemid);
          setItems(updatedItems);

          localStorage.setItem(storageKey, JSON.stringify(updatedItems));

          const cartItems = JSON.parse(
            localStorage.getItem("toBuyStorage") || "[]"
          );
          const updatedCart = cartItems.filter(
            (item: string) => item !== itemid
          );
          localStorage.setItem("toBuyStorage", JSON.stringify(updatedCart));

          refreshItems();
        }, 200);
      },
    });
  };

  return (
    <div className="verticalCard" ref={cardRef}>
      <img src={props.image} className="imageVertical" alt="Item" />
      <div className="textContainer">
        <p className="nameContainer">{props.name}</p>
        <p className="sizeContainer">{props.size}</p>
        <p className="priceContainer">{price}</p>
      </div>
      <img
        src="./close.png"
        className="deleteButton"
        alt="Delete"
        onClick={handleDelete}
      />
    </div>
  );
}
