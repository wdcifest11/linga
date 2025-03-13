import { useEffect, useRef, useState } from "react";
import itemdata from "../dummydatas/items.json";
import ItemCardHorizontal from "./ItemCardHorizontal";
import "./Cart.scss";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import Transition from "../assets/Transition";

gsap.registerPlugin(TextPlugin);

function Cart() {
  const [toBuy, setToBuy] = useState<string[]>([]);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const confirmRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const cfmrnRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const clipStart = "polygon(0 0, 0 0, 0 100%, 0 100%);";
  const clipEnd = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

  const handleBuy = () => {
    if (cfmrnRef.current) {
      gsap.fromTo(
        cfmrnRef.current,
        { clipPath: clipStart, opacity: 0, pointerEvents: "none" },
        {
          clipPath: clipEnd,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onStart: () => {
            cfmrnRef.current!.style.pointerEvents = "auto";
          },
        }
      );
    }
  };

  const handleCancel = () => {
    if (cfmrnRef.current) {
      gsap.to(cfmrnRef.current, {
        clipPath: clipStart,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onStart: () => {
          cfmrnRef.current!.style.pointerEvents = "none";
        },
      });
    }
  };

  const loadCart = () => {
    const storedItems = JSON.parse(
      localStorage.getItem("toBuyStorage") || "[]"
    );
    setToBuy(storedItems);
  };

  useEffect(() => {
    loadCart();
    if (cfmrnRef.current) {
      gsap.set(cfmrnRef.current, {
        clipPath: clipStart,
        opacity: 0,
        pointerEvents: "none",
      });
    }
    gsap.fromTo(
      ".cartContainer",
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
    const text = textRef.current;
    gsap
      .timeline({ repeat: -1, repeatDelay: 5 })
      .to(text, {
        duration: 1,
        text: "Fact! Each year as much as 92 million tons of clothing ends up in landfills.",
      })
      .to(text, {
        duration: 1,
        text: "By buying used clothes, you take part in reducing that amount!",
        delay: 3,
      })
      .to(text, {
        duration: 1,
        text: "Save your wardrobe. Save your earth. #Tradein Aja",
        delay: 3,
      });
  });

  const itemsInCart = toBuy
    .map((itemId) => itemdata.find((item) => item.id === itemId))
    .filter((item) => item);

  const totalPrice = itemsInCart.reduce(
    (sum, item) => sum + (item?.price || 0),
    0
  );

  const itemToBuy = itemsInCart.map((item) => (
    <ItemCardHorizontal
      key={item?.id}
      itemid={item!.id}
      refreshItems={loadCart}
    />
  ));

  const handleClear = () => {
    localStorage.removeItem("toBuyStorage");
    setToBuy([]);
  };

  const handleImageClick = () => {
    gsap.to(".eduCartImg", {
      y: -20,
      duration: 0.1,
      onComplete: () => {
        gsap.to(".eduCartImg", {
          y: 0,
          duration: 0.1,
        });
      },
    });
  };

  const itemList = toBuy.map((itemId) => {
    const current = itemdata.find((item) => item.id === itemId);
    return current ? (
      <p key={current.id} className="cfmItem">
        {current.name}
      </p>
    ) : null;
  });

  const confirm = toBuy.length ? itemList : "There's no item in cart";

  const handleConfirm = () => {
    if (confirmRef.current) {
      gsap.killTweensOf(confirmRef.current);
      gsap.killTweensOf(listRef.current);
      gsap.killTweensOf(titleRef.current);
    }

    const timeline = gsap.timeline();

    timeline
      .to(confirmRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(
        listRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<"
      )
      .to(titleRef.current, {
        text: "Thank you for your purchase",
        duration: 1,
      })
      .call(() => {
        handleClear();
        setIsComplete(true);
      });
  };

  return (
    <>
      <div className="cfmContainer" ref={cfmrnRef}>
        <div className="cfmrn"></div>
        <div className="cfmrnSmall">
          <p className="cfmTitle" ref={titleRef}>
            Please confirm your order
          </p>
          <div className="cfmListContainer" ref={listRef}>
            {confirm}
          </div>
          <div className="cfmBtnContainer" ref={confirmRef}>
            {toBuy.length > 0 && (
              <button
                className="confirmButton cfmButton"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            )}
            <button className="cancelButton cfmButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {isComplete && (
            <button className="cfmButton" onClick={handleCancel}>
              Finish
            </button>
          )}
        </div>
      </div>
      <div className="cartContainer">
        <div className="toBuyContainer">
          {itemToBuy.length > 0 ? itemToBuy : <p>No items in cart.</p>}
        </div>
        <div className="otherContainer">
          <p className="totalPrice">
            Total Price: Rp {totalPrice.toLocaleString("id-ID")},00
          </p>
          <button className="checkOutButton cartButton" onClick={handleBuy}>
            Buy
          </button>
          <button className="clearCartButton cartButton" onClick={handleClear}>
            Clear
          </button>
          <div className="eduContainer">
            <img
              src="/champ.png"
              className="eduCartImg"
              onClick={handleImageClick}
            />
            <p className="eduCart" ref={textRef}></p>
          </div>
        </div>
      </div>
    </>
  );
}

const WrappedCart = Transition(Cart);

export { Cart };
export default WrappedCart;
