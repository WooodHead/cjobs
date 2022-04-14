import { Input } from "@material-ui/core";
import { useSearchkit, useSearchkitQueryValue } from "@searchkit/client";
import classes from "../../styles/searchkit.module.css";

const SearchBox = () => {
  const api = useSearchkit();
  const [value, setValue] = useSearchkitQueryValue();
  return (
    <Input
      data-cy="searchBox"
      disableUnderline={true}
      className={classes.searchBox}
      type="text"
      value={value}
      onChange={(e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        api.setQuery(inputValue);
        api.search();
      }}
    />
  );
};

export default SearchBox;
