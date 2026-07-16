from pydantic import BaseModel

from app.schemas.profile import PreferencesUpsertRequest


class NutritionFacts(BaseModel):
    calories: int | None = None
    protein_grams: float | None = None
    carbohydrates_grams: float | None = None
    sugar_grams: float | None = None
    fat_grams: float | None = None
    saturated_fat_grams: float | None = None
    fiber_grams: float | None = None
    sodium_milligrams: float | None = None
    serving_size: str | None = None


class ProductIngredient(BaseModel):
    name: str
    raw_text: str | None = None


class ProductAnalysisContext(BaseModel):
    product_name: str | None = None
    brand_name: str | None = None
    ingredients: list[ProductIngredient]
    nutrition_facts: NutritionFacts | None = None


class LifestyleSignal(BaseModel):
    category: str
    signal_id: str
    label: str
    source_value: str


class AIAnalysisContext(BaseModel):
    user_profile: PreferencesUpsertRequest
    product: ProductAnalysisContext

