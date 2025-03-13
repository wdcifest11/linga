import { useNavigate } from "react-router-dom";
import "./TradePage.scss";
import { useContext, useEffect, useRef, useState } from "react";
import ItemCardHorizontal from "./ItemCardHorizontal";
import gsap from "gsap";
import { AccountContext } from "../Context";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import Transition from "../assets/Transition";

gsap.registerPlugin(TextPlugin);

function TradePage() {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const account = useContext(AccountContext);
  const rotationTween = useRef<gsap.core.Tween | null>(null);
  const [ownItems, setOwnItems] = useState<string[]>([]);
  const [toTrade, setToTrade] = useState<string[]>([]);
  const styleImageOwn = ownItems.length > 0 ? "flex-start" : "center";
  const styleImageTrade = toTrade.length > 0 ? "flex-start" : "center";

  // Load items from local storage
  const loadItems = () => {
    setOwnItems(JSON.parse(localStorage.getItem("ownedItems") || "[]"));
    setToTrade(JSON.parse(localStorage.getItem("toBeTraded") || "[]"));
  };

  useEffect(() => {
    loadItems();
    gsap.fromTo(
      ".tradePageContainer",
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

  useGSAP(() => {
    gsap
      .timeline({ repeat: -1, repeatDelay: 5 })
      .to(textRef.current, {
        duration: 1,
        text: "An estimated $500 billion in lost value each year due to underused and under-recycled discarded clothes",
      })
      .to(textRef.current, {
        duration: 1,
        text: "Save your wardrobe. Save our earth. #Tradein Aja",
        delay: 5,
      });
  });

  const ownItemList = ownItems.map((own) => (
    <ItemCardHorizontal key={own} itemid={own} refreshItems={loadItems} />
  ));

  const toTradeList = toTrade.map((totrade) => (
    <ItemCardHorizontal
      key={totrade}
      itemid={totrade}
      refreshItems={loadItems}
    />
  ));

  const handleHover = () => {
    rotationTween.current = gsap.to(logoRef.current, {
      rotate: "+=360",
      duration: 3,
      ease: "power4.inOut",
      repeat: -1,
    });
  };

  const handleHoverOut = () => {
    if (rotationTween.current) {
      rotationTween.current.pause();
      gsap.to(logoRef.current, { rotate: 0, duration: 1, ease: "power4.out" });
    }
  };

  const clearOwnItems = () => {
    localStorage.removeItem("ownedItems");
    setOwnItems([]);
  };

  const clearToTrade = () => {
    localStorage.removeItem("toBeTraded");
    setToTrade([]);
  };

  return (
    <div className="tradePageContainer">
      <div className="eduTradeContainer">
        <img src="/moneygone.png" alt="Economic impact" />
        <p ref={textRef} className="eduTradep"></p>
      </div>
      <div className="traderContainer">
        <div className="itemTradeContainer">
          <p className="itemContainerTitle">My items</p>
          <div
            className="ownItem itemContainer"
            style={{ justifyContent: styleImageOwn }}
          >
            {ownItemList.length > 0 ? (
              ownItemList
            ) : (
              <img
                src="./add.png"
                alt="Add Item"
                className="addImage"
                style={{overflow: "hidden"}}
                onClick={() => navigate(`/user/${account.userid}`)}
              />
            )}
          </div>
          <button
            className="clearOwnItems clear"
            id="clearOwnItems"
            onClick={clearOwnItems}
          >
            <img src="/trash.png" alt="Clear Own Items" />
          </button>
        </div>

        <img
          ref={logoRef}
          src="./logo.png"
          className="tradeLogo"
          alt="Trade logo"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
        />

        <div className="itemTradeContainer">
          <p className="itemContainerTitle">Items to trade</p>
          <div
            className="toTrade itemContainer"
            style={{ justifyContent: styleImageTrade }}
          >
            {toTradeList.length > 0 ? (
              toTradeList
            ) : (
              <img
                src="./add.png"
                alt="Add Item"
                className="addImage"
                style={{overflow: "hidden"}}
                onClick={() => navigate(`/shop`)}
              />
            )}
          </div>
          <button
            className="clearToTrade clear"
            id="clearToTrade"
            onClick={clearToTrade}
          >
            <img src="/trash.png" alt="Clear To Trade Items" />
          </button>
        </div>
      </div>
      <button type="button" className="tradeSubmitButton">
        Trade!
      </button>
    </div>
  );
}

const WrappedTrade = Transition(TradePage);

export { TradePage };
export default WrappedTrade;
