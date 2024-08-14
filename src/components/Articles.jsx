import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Articles = () => {
  const [articles, setArticles] = useState({ products: [] });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const MAX_DESCRIPTION_LENGTH = 100;

  return (
    <div className="container mt-5">
      <div className="row">
        {articles.products && articles.products.length > 0 ? (
          articles.products.map(article => (
            <div className="col-md-4 d-flex mb-4" key={article.id}>
              <div className="card mb-4 shadow-sm h-100">
                <img src={article.images[0]} className="card-img-top" alt={article.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text flex-grow-1">
                    {article.description.length > MAX_DESCRIPTION_LENGTH
                      ? `${article.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
                      : article.description}
                  </p>
                  <p className="card-text"><strong>Valor: ${article.price}</strong></p>
                  <div className="btn-group mt-auto">
                    <Link to={`/article/${article.id}`} className="btn btn-primary">Leer más</Link>
                    <a href="/" className="btn btn-secondary">Comprar ahora</a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando artículos...</p> // Mostrar un mensaje de carga o algo similar
        )}
      </div>
    </div>
  );
};
