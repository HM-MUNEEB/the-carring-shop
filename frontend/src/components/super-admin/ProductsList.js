import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  superDeleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const SuperProductsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product deleted successfully");
      history.push("/super-admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      console.log(product);
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        status: product.status === false ? "Not Approved" : "Approved",
        actions: (
          <Fragment>
            <Link
              to={`/super-admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link to={`/product/${product._id}`} target="_blank">
              <button className="btn btn-warning py-1 px-2 ml-2">
                <i className="fa fa-eye"></i>
              </button>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(superDeleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default SuperProductsList;
