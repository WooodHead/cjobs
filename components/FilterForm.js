import {
  Button,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import classes from "../styles/JobsList.module.css";

const FilterForm = ({ setSearchedJob }) => {
  const [form, setForm] = useState({
    location: "",
  });

  const handleChange = (name) => (event) => {
    let value = event.target.value;
    setForm({ ...form, [name]: value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSearchedJob(form.location);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <FormControl className={classes.inputSearch}>
        <InputLabel htmlFor="location">Location</InputLabel>
        <OutlinedInput
          label="Location"
          type="text"
          name="location"
          id="location"
          value={form.location}
          onChange={handleChange(`location`)}
        />
        <Button type="submit" className={classes.searchButton}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default FilterForm;
