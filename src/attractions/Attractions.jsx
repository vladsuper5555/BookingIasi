import React from "react";
import CategoryCard from "./components/CategoryCard";
import "./styles/main-page-style.css";
import "./styles/custom-variables.css";
import history from "./assets/svg/history.png";
import parks from "./assets/svg/parks.png";
import restaurant from "./assets/svg/restaurant.png";
import transport from "./assets/svg/transport.png";
import entertainment from "./assets/svg/entertainment.png";
import showmap from "./assets/svg/showmap.png";
import hotelsurroundings from "./assets/svg/hotelsurroudings.png";

const AttractionsPage = () => {
  const categories = [
    {
      categoryName: "Restaurants",
      picture: restaurant,
      attractions: [
        {
          name: "Tiki Bistro",
          distance: 40,
          description: "Acesta este Tiki Bistro",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Citizen",
          distance: 20,
          description: "Acesta este Citizen",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "CitiZen Bistro & Lounge",
          distance: 20,
          description: "Acesta este CitiZen Bistro & Lounge",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Beer Zone",
          distance: 280,
          description: "Acesta este Beer Zone",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
      ],
    },
    {
      categoryName: "Entertainment",
      picture: entertainment,
      attractions: [
        {
          name: "Palas Mall",
          distance: 300,
          description: "Acesta este Palas Mall",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Iulius Mall",
          distance: 1800,
          description: "Acesta este Iulius Mall",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
      ],
    },
    {
      categoryName: "History Attractions",
      picture: history,
      attractions: [
        {
          name: "Muzeul Unirii",
          distance: 1300,
          desciption: "Acesta este Muzeul Unirii",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Muzeul de Artă din Iași",
          distance: 220,
          description: "Acesta este Muzeul de Artă din Iași",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Muzeul Mihai Codreanu",
          distance: 1100,
          description: "Acesta este Muzeul Mihai Codreanu",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Muzeul Pogromului de la Iași",
          distance: 290,
          description: "Acesta este Muzeul Pogromului de la Iași",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
      ],
    },
    {
      categoryName: "Transport",
      picture: transport,
      attractions: [
        {
          name: "Gara Iasi",
          distance: 2800,
          description: "Acesta este Gara Iasi",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Aeroportul International Iasi",
          distance: 6800,
          description: "Acesta este Aeroportul International Iasi",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
      ],
    },
    {
      categoryName: "Parks",
      picture: parks,
      attractions: [
        {
          name: "Parcul Teatrului Național",
          distance: 1100,
          description: "Acesta este Parcul Teatrului Național",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Parcul Palas",
          distance: 1100,
          description: "Acesta este Parcul Palas",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Parcul Elena Doamna",
          distance: 750,
          description: "Acesta este Parcul Elena Doamna",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
        {
          name: "Parcul Podu Roș",
          distance: 1300,
          description: "Acesta esteParcul Podu Roș",
          link: "https://www.youtube.com/watch?v=fomwC_-FQ70&t=29",
        },
      ],
    },
  ];

  return (
    <div className="main-container-attractions">
      <div className="header-attractions">
        <h2>
          Hotel surroundings{" "}
          <img
            src={hotelsurroundings}
            alt="hotel icon"
            className="hotel-surr-image"
          />
        </h2>
        <a href="http://google.com" target="_blank" className="link-to-the-map">
          Show map{" "}
          <img src={showmap} alt="show map icon" className="show-map-image" />
        </a>
      </div>
      <div className="main-page-section">
        <div className="grid-container">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              categoryName={category.categoryName}
              attractions={category.attractions}
              picture={category.picture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttractionsPage;
