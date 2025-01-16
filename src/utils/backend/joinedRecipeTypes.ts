import { Tables } from "./types";

export type JoinedRecipe = Tables<"recipes"> & {
    categories: Pick<Tables<"categories">, "name">;
    ingredients_recipes: (Pick<Tables<"ingredients_recipes">, "quantity"> & {
    ingredients: Pick<
        Tables<"ingredients">,
        "name" | "unit" | "additional_info"
    >;
})[];
};