import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const dispatch = useDispatch();

  // Mock variant data based on category
  const getVariants = (category) => {
    switch (category) {
      case "men's clothing":
      case "women's clothing":
        return [
          { id: 0, name: "Small", stock: 5 },
          { id: 1, name: "Medium", stock: 8 },
          { id: 2, name: "Large", stock: 3 },
          { id: 3, name: "X-Large", stock: 0 }
        ];
      case "electronics":
        return [
          { id: 0, name: "32GB", stock: 2 },
          { id: 1, name: "64GB", stock: 7 },
          { id: 2, name: "128GB", stock: 4 }
        ];
      case "jewelery":
        return [
          { id: 0, name: "Silver", stock: 6 },
          { id: 1, name: "Gold", stock: 2 },
          { id: 2, name: "Rose Gold", stock: 0 }
        ];
      default:
        return [{ id: 0, name: "Standard", stock: 10 }];
    }
  };

  const variants = getVariants(product.category);
  const currentVariant = variants[selectedVariant];
  const isOutOfStock = currentVariant.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      const productWithVariant = {
        ...product,
        variant: currentVariant,
        variantId: currentVariant.id
      };
      dispatch(addCart(productWithVariant));
      toast.success(`Added ${product.title} (${currentVariant.name}) to cart`);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100 shadow-sm border-0 product-card">
        <div className="card-img-container position-relative">
          <img
            className="card-img-top"
            src={product.image}
            alt={product.title}
            style={{
              height: "280px",
              objectFit: "contain",
              padding: "20px",
              backgroundColor: "#f8f9fa"
            }}
          />
          {isOutOfStock && (
            <div className="out-of-stock-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            <h5 className="card-title fw-bold text-dark mb-2" style={{ fontSize: "1.1rem", lineHeight: "1.3" }}>
              {product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title}
            </h5>
            <p className="card-text text-muted small mb-3" style={{ fontSize: "0.9rem" }}>
              {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
            </p>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">Options:</span>
              <span className="badge bg-light text-dark small">
                Stock: {currentVariant.stock}
              </span>
            </div>
            <select
              className="form-select form-select-sm"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(parseInt(e.target.value))}
              disabled={isOutOfStock}
            >
              {variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} {variant.stock === 0 ? "(Out of Stock)" : `(${variant.stock} left)`}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="h5 mb-0 text-primary fw-bold">${product.price}</span>
              <small className="text-muted">
                <i className="fa fa-star text-warning"></i> {product.rating?.rate || "4.5"}
              </small>
            </div>

            <div className="d-grid gap-2">
              <button
                className={`btn ${isOutOfStock ? 'btn-secondary' : 'btn-primary'} btn-sm fw-bold`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease"
                }}
              >
                {isOutOfStock ? (
                  <>
                    <i className="fa fa-times me-2"></i>
                    Out of Stock
                  </>
                ) : (
                  <>
                    <i className="fa fa-cart-plus me-2"></i>
                    Add to Cart
                  </>
                )}
              </button>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-dark btn-sm"
                style={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease"
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
