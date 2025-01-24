import { useRef, useState } from 'react';
import supabase from '../utils/backend/setupSupabase';

const RecipeCreatePage = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const servingsRef = useRef<HTMLInputElement>(null);
  const categoryIdRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

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
    console.log(imageUrl);

    const name = nameRef.current?.value || '';
    const description = descriptionRef.current?.value || '';
    const servings = servingsRef.current?.value ? parseInt(servingsRef.current.value) : null;
    const category_id = categoryIdRef.current?.value || null;
    const rating = ratingRef.current?.value ? parseInt(ratingRef.current.value) : null;
    const instructions = instructionsRef.current?.value || '';

    const { data, error } = await supabase
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
      }]);

    console.log(data, error);
    if (error) {
      alert(`Error saving recipe: ${error.message}`);
    } else {
      alert('Recipe saved successfully!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Create Recipe</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                ref={nameRef}
                type="text"
                name="name"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
                required
            />
            <textarea
                ref={descriptionRef}
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
            />
            <input
                ref={servingsRef}
                type="number"
                name="servings"
                placeholder="Servings"
                className="input input-bordered w-full"
            />
            <input
                ref={categoryIdRef}
                type="text"
                name="category_id"
                placeholder="Category ID"
                className="input input-bordered w-full"
            />
            <input
                ref={ratingRef}
                type="number"
                name="rating"
                placeholder="Rating"
                className="input input-bordered w-full"
            />
            <textarea
                ref={instructionsRef}
                name="instructions"
                placeholder="Instructions"
                className="textarea textarea-bordered w-full"
            />
            <div className='card-actions'>
                <input
                    ref={imageFileRef}
                    className="file-input w-full max-w-xs"
                    type="file"
                    accept="image/*"
                />
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