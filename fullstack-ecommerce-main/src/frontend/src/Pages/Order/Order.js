import React, { useEffect, useReducer } from "react";
import { getCategories, getDiscountedItems } from "../../axios/API";
import { useSelector, useDispatch } from "react-redux";
import { OrderActions } from "../../store/reducers/Order";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Order = (props) => {
  // const params = useParams();
  const location = useLocation();
  console.log("[Order.js]", location);

  const orderStates = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories()
      .then((data) => {
        dispatch(OrderActions.setCategories(data.data.categories));
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    getDiscountedItems()
      .then((data) => {
        dispatch(OrderActions.setDiscountedItems(data.data.discountedItems));
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div id="order-page">
        <div className="row">
          <div className="col-5" id="categories">
            <h1>Search by Categories</h1>

            <ul>
              {orderStates.categories?.map((cate) => {
                return (
                  <>
                    <li
                      onClick={() => {
                        dispatch(OrderActions.setItemsToDisplay(cate.items));
                        dispatch(OrderActions.setSelectedCategory(cate.name));
                      }}
                      key={cate._id}
                    >
                      {cate.name}
                    </li>
                  </>
                );
              })}
            </ul>

            {orderStates.selectedCategory &&
              orderStates.selectedCategory != "" && (
                <>
                  <h1>{orderStates.selectedCategory}</h1>
                  <ul id="items-of-selected-category">
                    {orderStates.itemsToDisplay.map((item) => {
                      return <li key={item._id}>{item.name}</li>;
                    })}
                  </ul>
                </>
              )}
          </div>

          <div id="hot-selling" className="col-7">
            <h1>Discounts</h1>
            <ul id="discountedItems">
              {orderStates.discountedItems?.map((item) => {
                return (
                  <>
                    <li key={item._id}>
                      <>
                        <h4>{item.name}</h4>
                        <span>{item.description}</span>
                      </>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export { Order };
