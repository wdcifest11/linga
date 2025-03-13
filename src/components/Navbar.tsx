import { useEffect, useState, useRef, useContext } from "react";
import { gsap } from "gsap";
import "./Navbar.scss";
import { AccountContext, IsMobileContext } from "../Context";

export default function Navbar() {
  const account = useContext(AccountContext);
  const [isOpen, setOpen] = useState(false);
  const threeLinesRef = useRef<HTMLDivElement>(null);
  const acc = `/user/${account.userid}`;
  const isMobile = useContext(IsMobileContext);

  useEffect(() => {
    if (isOpen) {
      gsap.to(".navbar", { width: 200, duration: 0.3 });
      gsap.to(".bar1", {
        backgroundColor: "#ffffff",
        x: 0,
        y: 11,
        rotation: -45,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(".bar2", { opacity: 0, duration: 0.5 });
      gsap.to(".bar3", {
        backgroundColor: "#ffffff",
        x: 0,
        y: -11,
        rotation: 45,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(".navbar", { width: 0, duration: 0.3 });
      gsap.to(".bar1", {
        backgroundColor: "#000000",
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(".bar2", { opacity: 1, duration: 0.5 });
      gsap.to(".bar3", {
        backgroundColor: "#000000",
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <>
      <div
        className="closeButton"
        ref={threeLinesRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="openButton bar1"></div>
        <div className="openButton bar2"></div>
        <div className="openButton bar3"></div>
      </div>
      <div
        className="topBar"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <a className="websiteName" href="/">
          Tradein
          <img className="logoName" src="/logo.png" />
        </a>
      </div>

      {!isMobile && (
        <div
          className="miniNav"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <a href="/shop" className="miniNavLink">
            <img src="/shopicon.png" className="miniIcon" />
            <p>Shop</p>
          </a>
          <a href="/sell" className="miniNavLink">
            <img src="/sell.png" className="miniIcon" />
            <p>Sell</p>
          </a>
          <a href="/cart" className="miniNavLink">
            <img src="/carticon.png" className="miniIcon" />
            <p>Cart</p>
          </a>
          <a href="/trade" className="miniNavLink">
            <img src="/logo.png" className="miniIcon" />
            <p>Trade</p>
          </a>
          <a href="/about" className="miniNavLink">
            <img src="/about.png" className="miniIcon" />
            <p>About</p>
          </a>
          <a href={acc} className="miniNavLink">
            <img src="/accounticon.png" className="miniIcon" />
            <p>Account</p>
          </a>
        </div>
      )}

      <nav
        className="navbar"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="topNavbar">
          <a href="/shop" className="navButton">
            Shop
          </a>
          <a href="/sell" className="navButton">
            Sell
          </a>
          <a href="/cart" className="navButton">
            Cart
          </a>
          <a href="/trade" className="navButton">
            Trade
          </a>
          <a href="/about" className="navButton">
            About
          </a>
          <a href={acc} className="navButton">
            Account
          </a>
        </div>
      </nav>
    </>
  );
}
