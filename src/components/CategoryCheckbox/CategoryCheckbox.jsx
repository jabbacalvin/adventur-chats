import React, { useState, useEffect } from "react";
import * as categoriesAPI from "../../utilities/categories-api";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CategoryCheckbox({ activeCat, setActiveCat }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const options = [];

  // const handleCategoryChange = (event) => {
  //   console.log("handleCategoryChange called with categoryId:", event.target);

  //   activeCat.includes(event.target.value)
  //     ? setActiveCat(activeCat)
  //     : setActiveCat(...activeCat, event.target.value);
  // };

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const categories = await categoriesAPI.getAll();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleChange = (event) => {
    let option = [];
    console.log(event.target.value);
    setSelectedCategories(event.target.value);
    console.log(categories);
    event.target.value.forEach(
      (val) =>
        (option = categories.filter((cat) => {
          return cat.name === val;
        }))
    );
    console.log("hello", option[0]._id);
    options.push(option[0]._id);
    console.log("options ", options);
    setActiveCat([...activeCat, option[0]._id]);
  };

  const names = categories.map((category) => category.name);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: 12 }}>
          Category
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
