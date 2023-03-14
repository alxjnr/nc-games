import { useEffect, useState } from "react";
import { getCategories } from "../api";
import { useNavigate } from "react-router-dom";

const ListOfCategories = () => {
  const [categories, setCateogries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((data) => {
      setCateogries(data.categories);
      setIsLoading(false);
    });
  }, []);

  const navigateToCategory = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <section>
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <ul>
          {categories.map((category) => {
            return (
              <li key={category.slug}>
                <section className="category-list-section">
                  <h2
                    onClick={() => {
                      navigateToCategory(category.slug);
                    }}
                  >
                    {category.slug}
                  </h2>
                  <h5>{category.description}</h5>
                </section>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ListOfCategories;
