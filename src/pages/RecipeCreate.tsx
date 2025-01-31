import { useRef, useState } from 'react';
import supabase from '../utils/backend/setupSupabase';

const RecipeCreatePage = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<{ name: string; quantity: number }[]>([]);
  

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const servingsRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  
  let ratingRef = '';

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    ratingRef = e.target.value;
  };

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', quantity: 0 }]);
  };

  const handleIngredientChange = (index: number, field: 'name' | 'quantity', value: string | number) => {
    const newIngredients = [...ingredients];
    // newIngredients[index][field] = value;
    console.log(index, field, value);
    setIngredients(newIngredients);
  };

  const handleImageUpload = async (): Promise<string | null> => {
    const file = imageFileRef.current?.files?.[0];
    if (!file) {
      setUploadStatus('No file selected');
      return null;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('recipes-images')
      .upload(fileName, file);

    if (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      return null;
    } else {
      setUploadStatus('Upload successful!');
      return supabase.storage
        .from('recipes-images')
        .getPublicUrl(data.path).data.publicUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      alert('Image upload failed. Please try again.');
      return;
    }

    const name = nameRef.current?.value || '';
    const description = descriptionRef.current?.value || '';
    const servings = servingsRef.current?.value ? parseInt(servingsRef.current.value) : null;
    const category_id = categoryRef.current?.value || null;
    const rating = parseInt(ratingRef) || null;
    const instructions = instructionsRef.current?.value || '';

    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .insert([{
        name,
        description,
        servings,
        category_id,
        created_at: new Date(),
        image_url: imageUrl,
        rating,
        instructions,
      }])
      .select('id');

    if (recipeError || !recipeData?.length) {
      alert(`Error saving recipe: ${recipeError?.message}`);
      return;
    }

    const recipeId = recipeData[0].id;

    for (const ingredient of ingredients) {
      let ingredientId;

      const { data: existingIngredient } = await supabase
        .from('ingredients')
        .select('id')
        .eq('name', ingredient.name)
        .single();

      if (existingIngredient) {
        ingredientId = existingIngredient.id;
      } else {
        const { data: newIngredient, error: newIngredientError } = await supabase
          .from('ingredients')
          .insert([{ name: ingredient.name }])
          .select('id')
          .single();

        if (newIngredientError) {
          console.error('Error creating ingredient:', newIngredientError);
          continue;
        }

        ingredientId = newIngredient.id;
      }

      await supabase.from('ingredients_recipes').insert([
        {
          recipe_id: recipeId,
          ingredient_id: ingredientId,
          quantity: ingredient.quantity,
        },
      ]);
    }

    alert('Recipe saved successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Create Recipe</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input ref={nameRef} type="text" name="name" placeholder="Recipe Name" className="input input-bordered w-full" required />
            <textarea ref={descriptionRef} name="description" placeholder="Description" className="textarea textarea-bordered w-full" />
            <input ref={servingsRef} type="number" name="servings" placeholder="Servings" className="input input-bordered w-full" />
            <select ref={categoryRef} name="category_id" className="select select-bordered w-full" required>
              <option value="" disabled defaultValue={'Select Category'}>
                Select Category
              </option>
              <option value="6a5e005f-72f7-4a44-bf47-d32931e1aa66">Appetizers</option>
              <option value="a1abed5e-9f5e-41ce-a19c-befc9c33aed0">Desserts</option>
              <option value="a886f4eb-8f81-4419-a570-30f9c64920a1">Main Courses</option>
              <option value="ac59c5ee-6ef5-4ec1-8f10-add5fba9ff44">Snacks</option>
              <option value="cd45a330-0b0d-4e0a-9383-76925967e78d">Beverages</option>
            </select>
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((value) => (
                <input key={value} type="radio" name="rating-4" value={value} onChange={handleRating} className="mask mask-star-2 bg-green-500" />
              ))}
            </div>
            <textarea ref={instructionsRef} name="instructions" placeholder="Instructions" className="textarea textarea-bordered w-full" />
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Ingredients</h2>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ingredient Name"
                    className="input input-bordered w-full"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="input input-bordered w-24"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>
              ))}
              <button type="button" className="btn btn-outline w-full" onClick={handleAddIngredient}>+ Add Ingredient</button>
            </div>

            <div className='card-actions'>
              <input ref={imageFileRef} className="file-input w-full max-w-xs" type="file" accept="image/*" />
              <button type="submit" className="btn">Save Recipe</button>
            </div>
            <p>{uploadStatus}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeCreatePage;