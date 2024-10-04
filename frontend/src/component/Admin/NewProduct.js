import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import WorkIcon from "@material-ui/icons/Work";
import StraightenIcon from "@material-ui/icons/Straighten";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [mrp, setMrp] = useState(0); // New MRP state
  const [price, setPrice] = useState(0); // New Sale Price state
  const [discount, setDiscount] = useState(0); // Discount state
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState(""); // New state for sub-category
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // New fields for fabric-related details
  const [fabricType, setFabricType] = useState("");
  const [work, setWork] = useState("");
  const [width, setWidth] = useState("");
  // const [color, setColor] = useState("");
  const [careInstructions, setCareInstructions] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  // Sizes state
  const [sizes, setSizes] = useState({
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });

  
  const categories = ["Fabric", "Readymade"];
  const fabricSubCategories = ["Position Prints", "Embroidered", "Prints", "Plain"];
  const readymadeSubCategories = ["Kurti Set", "Co-Ord Set"];


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
      // Calculate discount whenever MRP or Sale Price changes
      if (mrp && price) {
        const calculatedDiscount = ((mrp - price) / mrp) * 100;
        setDiscount(calculatedDiscount.toFixed(2)); // Set discount percentage
      }
  }, [dispatch, alert, error, history, success,  mrp, price]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
  
    const myForm = new FormData();
  
    myForm.set("name", name);
    myForm.set("mrp", parseFloat(mrp).toFixed(2)); // Format MRP
    myForm.set("price", parseFloat(price).toFixed(2)); // Format Sale Price
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("subCategory", subCategory); // Add sub-category to form data
    myForm.set("Stock", Stock);

    if (category === "Fabric") {
      myForm.set("fabricType", fabricType);
      myForm.set("work", work);
      myForm.set("width", width);
      // myForm.set("color", color);
      myForm.set("careInstructions", careInstructions);
      myForm.set("disclaimer", disclaimer);
    }

    // Add selected sizes
    myForm.set("sizes", JSON.stringify(sizes));

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // Handle size change
  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setSizes({ ...sizes, [name]: checked });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="MRP"
              required
              onChange={(e) => setMrp(e.target.value)}
            />
              <span>{category === "Fabric" ? `/meter` : ""}</span>
            </div>

          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Sale Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
             <span>{category === "Fabric" ? `/meter` : ""}</span>
          </div>
          {/* Discount section */}
          <div>
              <label>Discount: </label>
              <span style={{ color: "red" }}>
                {discount > 0 ? `-${discount}%` : "No discount"}
              </span>
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {category && (
              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                  <option value="">Choose Sub-Category</option>
                  {(category === "Fabric" ? fabricSubCategories : readymadeSubCategories).map((subCate) => (
                    <option key={subCate} value={subCate}>
                      {subCate}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {category === "Readymade" && (
              <div>
                <label>Available Sizes:</label>
                <div className="sizesCheckbox">
                  {["M", "L", "XL", "XXL"].map((size) => (
                    <label key={size}>
                      <input
                        type="checkbox"
                        name={size}
                        checked={sizes[size]}
                        onChange={handleSizeChange}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
            )}

              {category === "Fabric" && (
              <>
                <div>
                  <FiberManualRecordIcon />
                  <input
                    type="text"
                    placeholder="Fabric Type"
                    value={fabricType}
                    onChange={(e) => setFabricType(e.target.value)}
                  />
                </div>
                <div>
                  <WorkIcon />
                  <input
                    type="text"
                    placeholder="Work"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                  />
                </div>
                <div>
                  <StraightenIcon />
                  <input
                    type="text"
                    placeholder="Width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
                <div>
                  <InfoIcon />
                  <textarea
                    placeholder="Care Instructions"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                  />
                </div>
                 {/* <div>
                  <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div> */}
                <div>
                  <WarningIcon />
                  <textarea
                    placeholder="Disclaimer"
                    value={disclaimer}
                    onChange={(e) => setDisclaimer(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
