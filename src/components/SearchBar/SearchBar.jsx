import css from "./SearchBar.module.css";
import { TfiSearch } from "react-icons/tfi";
import { useId } from "react";

const SearchBar = ({ onSubmit, onEmpty }) => {
  const id = useId();

  const handleForm = (event) => {
    event.preventDefault();

    if (event.target.elements.query.value.trim() === "") return onEmpty();
    // changeParams(event.target.elements.query.value);
    onSubmit(event.target.elements.query.value);

    event.target.reset();
  };

  return (
    <div className={css.div}>
      <form className={css.form} onSubmit={handleForm}>
        <input
          className={css.input}
          id={id}
          type="text"
          name="query"
          placeholder="Search movie"
        />
        <button className={css.button} type="submit">
          <TfiSearch color="lightsalmon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
