import { useContext, useEffect, useRef } from "react";
import "./ItemCard.scss";
import gsap from "gsap";
import detailinterface from "../assets/DetailInterface";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../Context";

export default function ItemCard(props: detailinterface) {
  const account = useContext(AccountContext);
  const navigate = useNavigate();
  const formattedPrice = props.price.toLocaleString("id-ID");
  const price = props.price > 0 ? `Rp ${formattedPrice},00` : "Trade only";
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttoncount =
    props.tradeable && props.sellable && account.userid !== props.user ? 2 : 1;
  let type;

  useEffect(() => {
    if (!cardRef.current || !buttonRef.current) return;

    const cardElement = cardRef.current;
    const buttonElement = buttonRef.current;

    cardElement.addEventListener("mouseenter", () => {
      gsap.to(buttonElement, {
        y: 0,
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    cardElement.addEventListener("mouseleave", () => {
      gsap.to(buttonElement, {
        y: -20,
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => {
      cardElement.removeEventListener("mouseenter", () => {});
      cardElement.removeEventListener("mouseleave", () => {});
    };
  }, []);

  if (props.user === account.userid) {
    type = "ownItems";
  } else {
    type = "toTrade";
  }

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/itemdetail/${props.id}`);
  };

  const handleTradeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.user === account.userid) {
      const storedOwn = JSON.parse(localStorage.getItem("ownedItems") || "[]");
      if (!storedOwn.includes(props.id)) {
        storedOwn.push(props.id);
        localStorage.setItem("ownedItems", JSON.stringify(storedOwn));
      }
      type = "ownItems";
    } else {
      const storedTrades = JSON.parse(
        localStorage.getItem("toBeTraded") || "[]"
      );
      if (!storedTrades.includes(props.id)) {
        storedTrades.push(props.id);
        localStorage.setItem("toBeTraded", JSON.stringify(storedTrades));
      }
      type = "toTrade";
    }
    navigate(`/trade`, { state: { newItem: `${props.id}`, type: type } });
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const storedBuys = JSON.parse(localStorage.getItem("toBuyStorage") || "[]");
    if (!storedBuys.includes(props.id)) {
      storedBuys.push(props.id);
      localStorage.setItem("toBuyStorage", JSON.stringify(storedBuys));
    }
    navigate(`/cart`, { state: props.id, replace: true });
    navigate(0);
  };

  return (
    <div
      ref={cardRef}
      className="itemCardContainer"
      onClick={handleCardClick}
      style={{ "--button-count": buttoncount } as React.CSSProperties}
    >
      <img src={props.image} alt={props.name} />
      <div className="textContainer">
        <div className="nameContainer text">{props.name}</div>
        <div className="typesizeContainer text">{props.size}</div>
        <div className="priceContainer text">{price}</div>
      </div>
      <div ref={buttonRef} className="buttonContainerCard">
        {props.sellable && account.userid !== props.user && (
          <button className="buybutton" id="buyButton" onClick={handleBuyClick}>
            Buy
          </button>
        )}
        {props.tradeable && (
          <button className="tradebutton" onClick={handleTradeClick}>
            Trade
          </button>
        )}
      </div>
    </div>
  );
}
