import { useEffect, useId, useRef, useState } from "react";
import "./SellItem.scss";
import ReactSwitch from "react-switch";
import gsap from "gsap";
import Transition from "../assets/Transition";
import { TradePage } from "./TradePage";

function SellItem() {
  const submitImageId = useId();
  const nameId = useId();
  const sizeId = useId();
  const yearId = useId();
  const conditionId = useId();
  const descriptionId = useId();
  const sellableId = useId();
  const tradeableId = useId();
  const submitId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() - index
  );

  const [year, setYear] = useState<number | "">("");
  const [sellable, setSellable] = useState(false);
  const [tradeable, setTradeable] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  const handleSellChange = () => {
    setSellable((prevState) => !prevState);
  };

  const handleTradeChange = () => {
    setTradeable((prevState) => !prevState);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const isSubmitDisabled = !sellable && !tradeable;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    gsap.fromTo(
      ".sellItemContainer",
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

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="sellItemContainer">
      <div className="imageContainer" onClick={handleAddImage}>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="uploadedImage"
          />
        ) : (
          <img
            src="./plus.png"
            alt="Uploaded Preview"
            className="uploadedImagePrev"
          />
        )}
      </div>

      <form className="sellItemForm" onSubmit={handleSubmit}>
        <label htmlFor={submitImageId} className="imageSubmission">
          <input
            ref={fileInputRef}
            id={submitImageId}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>

        <label htmlFor={nameId} className="nameSubmission">
          <p>Item name:</p>
          <input id={nameId} type="text" required />
        </label>

        <label htmlFor={sizeId} className="sizeSubmission">
          <p>Size:</p>
          <select id={sizeId} className="sizeSelect" required>
            {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
              <option key={sz} className="sizeOption" value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor={yearId} className="yearSubmission">
          <p>Year:</p>
          <select
            id={yearId}
            value={year || ""}
            onChange={handleChange}
            required
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor={conditionId} className="conditionSubmission">
          <p>Condition:</p>
          <select id={conditionId} className="conditionSelect" required>
            {["worn", "used", "like new", "new"].map((cond) => (
              <option key={cond} value={cond} className="condOption">
                {cond.charAt(0).toUpperCase() + cond.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor={descriptionId} className="descriptionSubmission">
          <p className="descLabel">Description:</p>
          <textarea
            id={descriptionId}
            className="descTextArea"
            rows={4}
            cols={40}
          />
        </label>

        <label htmlFor={sellableId} className="sellableSubmission">
          <p>Sellable</p>
          <ReactSwitch
            onChange={handleSellChange}
            checked={sellable}
            className="switch"
            onColor="#000000"
            onHandleColor="#ffffff"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={30}
            width={58}
          />
        </label>

        <label htmlFor={tradeableId} className="tradeableSubmission">
          <p>Tradeable</p>
          <ReactSwitch
            onChange={handleTradeChange}
            checked={tradeable}
            className="switch"
            onColor="#000000"
            onHandleColor="#ffffff"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={30}
            width={58}
          />
        </label>

        <label htmlFor={submitId} className="submit">
          <input type="submit" disabled={isSubmitDisabled} />
        </label>
      </form>
    </div>
  );
}

const WrappedSell = Transition(SellItem);

export { TradePage };
export default WrappedSell;