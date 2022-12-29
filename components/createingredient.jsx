import { useState } from "react";


function CreateIngredientForm() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
  
    function handleSubmit(event) {
      event.preventDefault();
      // Send a POST request to create the new ingredient
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={name} onChange={event => setName(event.target.value)} />
        <br />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" name="quantity" value={quantity} onChange={event => setQuantity(event.target.value)} />
        <br />
        <button type="submit">Create Ingredient</button>
      </form>
    );
  }

  export default CreateIngredientForm;