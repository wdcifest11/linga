import {
  useEffect,
  useState,
  ChangeEvent,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import datas from "../dummydatas/items.json";
import DetailInterface from "../assets/DetailInterface";
import ItemCard from "./ItemCard";
import FilterSection from "../assets/FilterSection";
import "./Shop.scss";
import { AccountContext } from "../Context";
import EduBanner from "./EduBanner";
import Transition from "../assets/Transition";

gsap.registerPlugin(ScrollTrigger);

function Shop() {
  const currentUserId = useContext(AccountContext).userid;
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState(3);

  const itemList: DetailInterface[] = datas;
  const filterButtonRef = useRef<HTMLDivElement | null>(null);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      setColumns(Math.floor(width / 303));
      console.log(columns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const toggleSetState = useCallback((prevSet: Set<string>, value: string) => {
    const newSet = new Set(prevSet);
    newSet.has(value) ? newSet.delete(value) : newSet.add(value);
    return newSet;
  }, []);

  const handleSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedSizes((prev) => toggleSetState(prev, e.target.value));
    },
    [toggleSetState]
  );

  const handleTypeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedTypes((prev) => toggleSetState(prev, e.target.value));
    },
    [toggleSetState]
  );

  const handleConditionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedConditions((prev) => toggleSetState(prev, e.target.value));
    },
    [toggleSetState]
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredItems = useMemo(() => {
    return itemList.filter((item) => {
      if (item.user === currentUserId) return false;
      if (selectedSizes.size > 0 && !selectedSizes.has(item.size)) return false;
      if (selectedTypes.size > 0 && !selectedTypes.has(item.type)) return false;
      if (
        selectedConditions.size > 0 &&
        !selectedConditions.has(item.condition)
      )
        return false;
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        if (
          !item.name.toLowerCase().includes(lowerSearch) &&
          !item.description.toLowerCase().includes(lowerSearch)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [
    itemList,
    selectedSizes,
    selectedTypes,
    selectedConditions,
    searchTerm,
    currentUserId,
  ]);

  useGSAP(() => {
    itemRowRefs.current.forEach((row) => {
      if (row) {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, [filteredItems.length, columns]);

  return (
    <div className="shopContainer">
      <EduBanner />
      <div className="upperBar">
        <form className="form">
          <label className="searchBar">
            <input
              className="searchInput"
              placeholder="Search items"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
          <div className="filterButton" id="filterButton" ref={filterButtonRef}>
            <img src="filter.png" className="filterImage" loading="lazy" />
          </div>

          <div className="filterContainer" ref={filterContainerRef}>
            <FilterSection
              title="Size"
              options={["XS", "S", "M", "L", "XL", "XXL"]}
              selected={selectedSizes}
              onChange={handleSizeChange}
            />
            <FilterSection
              title="Type"
              options={[
                "hat",
                "shirt",
                "t-shirt",
                "outer",
                "dress",
                "shorts",
                "pants",
                "shoes",
              ]}
              selected={selectedTypes}
              onChange={handleTypeChange}
            />
            <FilterSection
              title="Condition"
              options={["worn", "used", "like new", "new"]}
              selected={selectedConditions}
              onChange={handleConditionChange}
            />
          </div>
        </form>
      </div>

      <div
        className="itemsContainer"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          minHeight: "50vh",
        }}
      >
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRowRefs.current[index] = el;
            }}
            className="itemCardWrapper"
          >
            <ItemCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

const WrappedShop = Transition(Shop);

export { Shop };
export default WrappedShop;
