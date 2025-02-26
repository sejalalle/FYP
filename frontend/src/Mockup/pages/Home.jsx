import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import "./Home.css";

const AnimatedBoxes = () => (
  <svg width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#E2E8F0" }} />
        <stop offset="100%" style={{ stopColor: "#CBD5E1" }} />
      </linearGradient>
    </defs>
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 200 150"
        to="360 200 150"
        dur="12s"
        repeatCount="indefinite"
      />
      <rect x="150" y="120" width="100" height="100" fill="url(#boxGradient)" />
    </g>
  </svg>
);
const shapes = [
  { id: "square-box", name: "Square Box", image: "/images/SquareBox.jpg" },
  { id: "tall-bottle-box", name: "Bottle Box", image: "/images/TallBottleBox.jpg" },
  { id: "tuck-end-box", name: "Tuck End Box", image: "/images/tuckend.jpg" },
  { id: "pizza-box", name: "Pizza Box", image: "/images/PizzaBox.jpg" },
  { id: "flip-top-box", name: "Flip Top Box", image: "/images/FlipTop.jpg" },
  { id: "cylinder", name: "Can", image: "/images/Can.jpg" },
  { id: "shipping-box", name: "Shipping Box", image: "/images/shippingbox.jpg" },
  { id: "tube-box", name: "Tube Box", image: "/images/tubebox.jpg" },
];

const Home = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredResults(
      query.length > 0
        ? shapes.filter((shape) =>
            shape.name.toLowerCase().includes(query.toLowerCase())
          )
        : []
    );
  };

  const handleShapeClick = (shapeId) => {
    navigate(`/mockup/customization/${shapeId}`);
  };

  return (
    <div className="home-container">
      <aside className="home-sidebar expanded">
        <h2 className="home-sidebar-title">Categories</h2>
        <div className="category-list">
          <button
            className={`category-item ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          <button
            className="category-item dropdown-toggle"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span>Box Shapes</span>
            {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isDropdownOpen && (
            <div className="dropdown-content">
              {shapes.map(({ name }) => (
                <div
                  key={name}
                  className={`category-item ${selectedCategory === name ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(name);
                    setDropdownOpen(false); // Close dropdown on selection
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      <main className="content">
        <div className="intro-section">
          <div className="intro-text">
            <h1>Customize & Download Box Mockups</h1>
            <p>Choose a box mockup and create your design online in minutes and export them as die-line in svg format.</p>
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search Box Mockups                                                                    🔍"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              {filteredResults.length > 0 && (
                <ul className="search-results">
                  {filteredResults.map((shape) => (
                    <li
                      key={shape.name}
                      className="search-item"
                      onClick={() => {
                        setSearchQuery(shape.name);
                        setSelectedCategory(shape.name);
                      }}
                    >
                      {shape.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="intro-animation">
            <AnimatedBoxes />
          </div>
        </div>

        <div className="mockup-section">
          <h2>{selectedCategory === "All" ? "Box Mockups" : `${selectedCategory} Mockups`}</h2>
          <div className="mockup-grid">
            {(searchQuery.length > 0 ? filteredResults : shapes)
              .filter((shape) => selectedCategory === "All" || shape.name === selectedCategory)
              .map(({ id, name, image }) => (
                <div 
                  key={id} 
                  className="mockup-card" 
                  onClick={() => handleShapeClick(id)}
                >
                  <img src={image} alt={name} className="mockup-image" />
                  <div className="mockup-title">{name}</div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
