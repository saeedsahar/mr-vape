import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

// Sample category and brand data from JSON
const categoryList = [
  { id: 8, name: "ACCESORIES" },
  { id: 9, name: "Base Liquid" },
  { id: 7, name: "BATTERIES" },
  { id: 6, name: "COILD&PODS" },
  { id: 1, name: "Disposable" },
  { id: 2, name: "Disposables Vapes" },
  { id: 3, name: "NiC Salts" },
  { id: 5, name: "TANKS" },
  { id: 4, name: "Vape Kits" },
];

const brandList = [
  { id: 1, name: "JNR" },
  { id: 2, name: "HAYATI Pro Max" },
  { id: 3, name: "FANTASI" },
  { id: 4, name: "JNR" },
  { id: 5, name: "HAYATI" },
  { id: 6, name: "IVG" },
  { id: 7, name: "VGOD" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    image: null,
    imagePreview: null,
    categoryId: "",
    brandId: "",
    flavours: [],
  });

  const [flavour, setFlavour] = useState({
    flavour: "",
    image: null,
    imagePreview: null,
    quantity: 0,
  });

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setProduct({
      ...product,
      [name]: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const removeImage = () => {
    setProduct({
      ...product,
      image: null,
      imagePreview: null,
    });
  };

  const handleFlavourChange = (e) => {
    const { name, value } = e.target;
    setFlavour({ ...flavour, [name]: value });
  };

  const handleFlavourImageUpload = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFlavour({
      ...flavour,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const removeImageFlavour = () => {
    setFlavour({
      ...flavour,
      image: null,
      imagePreview: null,
    });
  };

  const addFlavour = () => {
    setProduct({ ...product, flavours: [...product.flavours, flavour] });
    setFlavour({ flavour: "", image: null, quantity: 0 }); // Reset after adding
  };

  const removeFlavour = (index) => {
    setProduct({
      ...product,
      flavours: product.flavours.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    console.log("Product saved:", product);
    // Call API to save product
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>

      {/* Category & Brand Dropdowns */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Category"
            name="categoryId"
            value={product.categoryId}
            onChange={handleProductChange}
            variant="outlined"
          >
            {categoryList.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Brand"
            name="brandId"
            value={product.brandId}
            onChange={handleProductChange}
            variant="outlined"
          >
            {brandList.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleProductChange}
            variant="outlined"
          />
        </Grid>

       {/* In your component */}
<Grid item xs={12}>
  <Typography variant="h6" gutterBottom>
    Description
  </Typography>
  <ReactQuill
    theme="snow"
    value={product.description}
    onChange={(value) => setProduct({ ...product, description: value })}
    modules={{
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ]
    }}
    formats={[
      'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent', 'link', 'image', 'video', 'code-block'
    ]}
    style={{ height: '200px', marginBottom: '50px' }} // Adjust height
  />
</Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short Description"
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleProductChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={product.price}
            onChange={handleProductChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* Image Upload Section */}
          {product.imagePreview ? (
            <Box>
              <img
                src={product.imagePreview}
                alt="Uploaded product"
                style={{ width: "100%", height: "auto", marginBottom: "16px" }}
              />
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={removeImage}
              >
                Remove Image
              </Button>
            </Box>
          ) : (
            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Flavour Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Flavours
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Flavour Name"
              name="flavour"
              value={flavour.flavour}
              onChange={handleFlavourChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"
              value={flavour.quantity}
              onChange={handleFlavourChange}
              variant="outlined"
            />
          </Grid>

          {/* Image Upload Section */}
          <Grid item xs={12} sm={4}>
            {flavour.imagePreview ? (
              <Box textAlign="center">
                <img
                  src={flavour.imagePreview}
                  alt="Uploaded flavour"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "150px", // Limit the size of the image
                    marginBottom: "16px",
                    borderRadius: "8px", // Make image look better
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow for aesthetics
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={removeImageFlavour}
                  fullWidth
                >
                  Remove Image
                </Button>
              </Box>
            ) : (
              <Button variant="contained" component="label" fullWidth>
                Upload Flavour Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFlavourImageUpload}
                />
              </Button>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={addFlavour}
              startIcon={<Add />}
              fullWidth
            >
              Add Flavour
            </Button>
          </Grid>
        </Grid>

        {/* Displaying added flavours */}
        <Box mt={2}>
          {product.flavours.map((flv, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              mb={1}
              justifyContent="space-between"
              sx={{
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // A subtle shadow for added flavours
              }}
            >
              <Typography variant="body1">
                {flv.flavour} - Quantity: {flv.quantity}
              </Typography>
              <IconButton onClick={() => removeFlavour(index)} color="error">
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Save Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Save Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
