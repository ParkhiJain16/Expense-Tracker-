const categories = [
    { name: "Food", img: "/images/food.jpg" },
    { name: "Travel", img: "/images/travel.jpg" },
    { name: "Shopping", img: "/images/shopping.jpg" },
    { name: "Bills", img: "/images/bills.jpg" },
    { name: "Others", img: "/images/others.jpg" }
  ];
  
  export default function CategoryCards({ onSelect, totals }) {
    return (
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            style={{ backgroundImage: `url(${cat.img})` }}
            onClick={() => onSelect(cat.name)}
          >
            <div className="overlay">
              <h3>{cat.name}</h3>
              <p>₹{totals?.[cat.name] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  