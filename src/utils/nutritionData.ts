/** Nutrition plan data keyed by fitness goal */

export interface Meal {
  id: string;
  time: string;
  emoji: string;
  name: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface NutritionPlan {
  name: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  days: DayPlan[];
}

const muscleMeals: Meal[][] = [
  [
    { id:'m1', time:'Breakfast', emoji:'🥣', name:'Power Oatmeal Bowl', items:['1 cup rolled oats','1 banana','2 tbsp peanut butter','1 scoop whey protein'], calories:620, protein:42, carbs:78, fat:18 },
    { id:'m2', time:'Lunch', emoji:'🍗', name:'Chicken & Rice Power Bowl', items:['200g grilled chicken breast','1.5 cups brown rice','1 cup roasted broccoli','olive oil drizzle'], calories:720, protein:60, carbs:82, fat:14 },
    { id:'m3', time:'Dinner', emoji:'🥩', name:'Beef Stir Fry & Noodles', items:['200g lean beef strips','200g udon noodles','mixed bell peppers','soy-ginger sauce'], calories:740, protein:55, carbs:88, fat:20 },
    { id:'m4', time:'Snack', emoji:'🥤', name:'Protein Shake & Nuts', items:['1 scoop protein powder','250ml oat milk','30g mixed nuts'], calories:380, protein:32, carbs:28, fat:14 },
  ],
  [
    { id:'m5', time:'Breakfast', emoji:'🍳', name:'Egg & Avocado Toast', items:['4 eggs scrambled','2 slices whole wheat toast','½ avocado','cherry tomatoes'], calories:640, protein:38, carbs:52, fat:26 },
    { id:'m6', time:'Lunch', emoji:'🐟', name:'Salmon & Sweet Potato', items:['200g baked salmon','1 large sweet potato','asparagus spears','lemon-dill sauce'], calories:680, protein:54, carbs:60, fat:22 },
    { id:'m7', time:'Dinner', emoji:'🍝', name:'Turkey Bolognese Pasta', items:['150g lean turkey mince','200g whole wheat pasta','marinara sauce','parmesan cheese'], calories:780, protein:58, carbs:96, fat:16 },
    { id:'m8', time:'Snack', emoji:'🧀', name:'Cottage Cheese & Berries', items:['200g cottage cheese','100g mixed berries','1 tbsp honey','chia seeds'], calories:280, protein:26, carbs:30, fat:4 },
  ],
  [
    { id:'m9', time:'Breakfast', emoji:'🥞', name:'Protein Pancakes', items:['1 cup oat flour','2 eggs','1 banana','ricotta cheese','maple syrup'], calories:590, protein:36, carbs:74, fat:14 },
    { id:'m10', time:'Lunch', emoji:'🫙', name:'Greek Chicken Wrap', items:['180g chicken breast','whole wheat tortilla','tzatziki sauce','cucumber, tomato, feta'], calories:650, protein:52, carbs:58, fat:18 },
    { id:'m11', time:'Dinner', emoji:'🍲', name:'Beef & Lentil Stew', items:['150g beef chunks','1 cup green lentils','carrots, celery, onion','low-sodium beef broth'], calories:700, protein:56, carbs:72, fat:16 },
    { id:'m12', time:'Snack', emoji:'🍌', name:'Banana & Almond Butter', items:['2 bananas','2 tbsp almond butter','1 glass whole milk'], calories:420, protein:16, carbs:58, fat:14 },
  ],
  [
    { id:'m13', time:'Breakfast', emoji:'🫐', name:'Smoothie Bowl', items:['2 scoops protein powder','frozen mixed berries','1 cup Greek yogurt','granola, coconut flakes'], calories:580, protein:45, carbs:66, fat:12 },
    { id:'m14', time:'Lunch', emoji:'🌮', name:'Steak Tacos', items:['200g skirt steak','3 corn tortillas','guacamole, salsa','shredded cabbage'], calories:740, protein:56, carbs:60, fat:24 },
    { id:'m15', time:'Dinner', emoji:'🍛', name:'Chicken Tikka Masala', items:['200g chicken thighs','tomato-cream sauce','1.5 cups basmati rice','naan bread'], calories:800, protein:60, carbs:92, fat:22 },
    { id:'m16', time:'Snack', emoji:'🥜', name:'Trail Mix & Greek Yogurt', items:['150g Greek yogurt','40g trail mix (nuts, seeds)'], calories:360, protein:22, carbs:32, fat:16 },
  ],
  [
    { id:'m17', time:'Breakfast', emoji:'🧇', name:'Belgian Waffle Stack', items:['protein waffle mix','2 eggs','Greek yogurt','fresh fruit compote'], calories:600, protein:38, carbs:70, fat:16 },
    { id:'m18', time:'Lunch', emoji:'🥗', name:'Quinoa Power Salad', items:['1.5 cups quinoa','grilled shrimp','spinach, kale, avocado','lemon vinaigrette'], calories:640, protein:44, carbs:68, fat:18 },
    { id:'m19', time:'Dinner', emoji:'🦃', name:'Turkey Burgers', items:['200g turkey patty','whole grain bun','sweet potato fries','coleslaw'], calories:760, protein:58, carbs:80, fat:20 },
    { id:'m20', time:'Snack', emoji:'🍫', name:'Dark Choc & Protein Bar', items:['1 protein bar (30g protein)','2 squares dark chocolate'], calories:380, protein:30, carbs:36, fat:12 },
  ],
  [
    { id:'m21', time:'Breakfast', emoji:'🥚', name:'Denver Omelette', items:['4 eggs','ham, bell peppers, onion','30g cheddar cheese','2 slices rye toast'], calories:620, protein:48, carbs:42, fat:24 },
    { id:'m22', time:'Lunch', emoji:'🍜', name:'Beef Pho Bowl', items:['150g beef slices','rice noodles','bean sprouts, basil','bone broth'], calories:650, protein:50, carbs:72, fat:12 },
    { id:'m23', time:'Dinner', emoji:'🍖', name:'BBQ Pork Tenderloin', items:['200g pork tenderloin','BBQ glaze','roasted corn & beans','mashed sweet potato'], calories:760, protein:56, carbs:82, fat:18 },
    { id:'m24', time:'Snack', emoji:'🍶', name:'Rice Cakes & Tuna', items:['4 rice cakes','1 can tuna in water','2 tbsp hummus'], calories:320, protein:30, carbs:30, fat:6 },
  ],
  [
    { id:'m25', time:'Breakfast', emoji:'🫓', name:'High-Protein Bagel', items:['protein bagel','4 egg whites','smoked salmon','cream cheese, capers'], calories:560, protein:50, carbs:54, fat:14 },
    { id:'m26', time:'Lunch', emoji:'🥙', name:'Lamb Shawarma Wrap', items:['180g lamb strips','whole wheat flatbread','tahini sauce','tabbouleh salad'], calories:700, protein:52, carbs:66, fat:22 },
    { id:'m27', time:'Dinner', emoji:'🦞', name:'Garlic Butter Shrimp & Rice', items:['300g jumbo shrimp','1.5 cups jasmine rice','garlic butter sauce','roasted zucchini'], calories:720, protein:58, carbs:80, fat:18 },
    { id:'m28', time:'Snack', emoji:'🥛', name:'Recovery Shake', items:['2 scoops protein powder','1 cup whole milk','1 tbsp honey','ice'], calories:400, protein:40, carbs:36, fat:8 },
  ],
];

const weightLossMeals: Meal[][] = [
  [
    { id:'w1', time:'Breakfast', emoji:'🍓', name:'Berry Greek Yogurt Bowl', items:['200g 0% Greek yogurt','100g mixed berries','2 tbsp granola','1 tsp honey'], calories:320, protein:24, carbs:38, fat:4 },
    { id:'w2', time:'Lunch', emoji:'🥗', name:'Grilled Chicken Salad', items:['150g grilled chicken','mixed greens, cucumber','cherry tomatoes','2 tbsp olive oil & lemon'], calories:380, protein:36, carbs:14, fat:18 },
    { id:'w3', time:'Dinner', emoji:'🐟', name:'Baked Salmon & Veggies', items:['180g salmon fillet','roasted broccoli & asparagus','½ cup quinoa','lemon-herb seasoning'], calories:480, protein:42, carbs:30, fat:18 },
    { id:'w4', time:'Snack', emoji:'🍎', name:'Apple & Almonds', items:['1 medium apple','20g almonds'], calories:180, protein:4, carbs:22, fat:8 },
  ],
  [
    { id:'w5', time:'Breakfast', emoji:'🥚', name:'Veggie Egg White Omelette', items:['4 egg whites, 1 whole egg','spinach, mushrooms, tomato','1 slice whole grain toast'], calories:290, protein:28, carbs:22, fat:6 },
    { id:'w6', time:'Lunch', emoji:'🍲', name:'Lentil & Vegetable Soup', items:['1 cup green lentils','carrots, celery, onion','low-sodium broth','whole grain roll'], calories:360, protein:22, carbs:52, fat:4 },
    { id:'w7', time:'Dinner', emoji:'🍗', name:'Herb Chicken & Cauliflower Rice', items:['180g chicken breast','2 cups cauliflower rice','roasted Brussels sprouts','garlic herb sauce'], calories:380, protein:44, carbs:18, fat:12 },
    { id:'w8', time:'Snack', emoji:'🥦', name:'Veggie Sticks & Hummus', items:['carrot, celery, cucumber sticks','3 tbsp hummus'], calories:140, protein:5, carbs:16, fat:6 },
  ],
  [
    { id:'w9', time:'Breakfast', emoji:'🫐', name:'Overnight Oats', items:['½ cup rolled oats','almond milk, chia seeds','frozen blueberries','1 tsp maple syrup'], calories:310, protein:12, carbs:50, fat:7 },
    { id:'w10', time:'Lunch', emoji:'🥙', name:'Turkey Lettuce Wraps', items:['150g lean turkey mince','iceberg lettuce cups','salsa, avocado slice','lime juice'], calories:340, protein:32, carbs:12, fat:14 },
    { id:'w11', time:'Dinner', emoji:'🍤', name:'Shrimp & Zucchini Noodles', items:['200g shrimp','2 zucchinis (spiralized)','cherry tomatoes','garlic, olive oil, basil'], calories:300, protein:36, carbs:16, fat:10 },
    { id:'w12', time:'Snack', emoji:'🍊', name:'Citrus & Cottage Cheese', items:['150g low-fat cottage cheese','1 orange, segmented'], calories:180, protein:18, carbs:20, fat:2 },
  ],
  [
    { id:'w13', time:'Breakfast', emoji:'🍌', name:'Protein Smoothie', items:['1 scoop vanilla protein','½ banana','1 cup spinach','almond milk, ice'], calories:280, protein:30, carbs:26, fat:5 },
    { id:'w14', time:'Lunch', emoji:'🥗', name:'Tuna Niçoise Salad', items:['1 can tuna in water','hard-boiled egg','green beans, olives','Dijon vinaigrette'], calories:360, protein:38, carbs:14, fat:14 },
    { id:'w15', time:'Dinner', emoji:'🫕', name:'Stuffed Bell Peppers', items:['2 bell peppers','lean ground turkey','½ cup brown rice','marinara sauce'], calories:420, protein:38, carbs:36, fat:10 },
    { id:'w16', time:'Snack', emoji:'🍇', name:'Grapes & String Cheese', items:['1 cup grapes','1 mozzarella string cheese'], calories:160, protein:7, carbs:24, fat:4 },
  ],
  [
    { id:'w17', time:'Breakfast', emoji:'🥞', name:'Protein Pancakes (Light)', items:['½ cup oat flour, 2 eggs','0% Greek yogurt topping','fresh strawberries'], calories:300, protein:26, carbs:34, fat:6 },
    { id:'w18', time:'Lunch', emoji:'🥣', name:'Roasted Veggie Grain Bowl', items:['½ cup farro','roasted sweet potato & chickpeas','kale, tahini drizzle'], calories:380, protein:14, carbs:58, fat:10 },
    { id:'w19', time:'Dinner', emoji:'🐟', name:'Cod En Papillote', items:['180g cod fillet','cherry tomatoes, olives, capers','lemon slices, thyme','served with steamed green beans'], calories:340, protein:40, carbs:10, fat:12 },
    { id:'w20', time:'Snack', emoji:'🫐', name:'Blueberry Protein Smoothie', items:['½ scoop protein powder','100g blueberries','almond milk'], calories:160, protein:14, carbs:18, fat:3 },
  ],
  [
    { id:'w21', time:'Breakfast', emoji:'🥑', name:'Avocado Egg Cups', items:['1 avocado (halved, pitted)','2 eggs baked inside','paprika, chives','1 slice rye toast'], calories:340, protein:16, carbs:22, fat:22 },
    { id:'w22', time:'Lunch', emoji:'🌮', name:'Fish Tacos (Light)', items:['150g grilled tilapia','2 corn tortillas','mango salsa, shredded cabbage','lime crema (low-fat)'], calories:380, protein:32, carbs:38, fat:10 },
    { id:'w23', time:'Dinner', emoji:'🍗', name:'Lemon Herb Chicken Soup', items:['chicken breast, white beans','carrots, celery, spinach','low-sodium chicken broth','fresh herbs'], calories:320, protein:40, carbs:22, fat:6 },
    { id:'w24', time:'Snack', emoji:'🫚', name:'Edamame & Sea Salt', items:['1 cup shelled edamame','sea salt'], calories:190, protein:17, carbs:14, fat:8 },
  ],
  [
    { id:'w25', time:'Breakfast', emoji:'🧇', name:'Whole Grain Waffle & Eggs', items:['1 whole grain waffle','2 poached eggs','sliced strawberries','sugar-free syrup'], calories:310, protein:20, carbs:34, fat:10 },
    { id:'w26', time:'Lunch', emoji:'🥗', name:'Spinach & Salmon Salad', items:['150g smoked salmon','baby spinach, red onion','capers, cucumber','lemon-olive oil dressing'], calories:360, protein:34, carbs:8, fat:20 },
    { id:'w27', time:'Dinner', emoji:'🍝', name:'Zucchini Pasta Chicken Pesto', items:['3 zucchinis spiralized','150g chicken breast','2 tbsp light pesto','cherry tomatoes, pine nuts'], calories:380, protein:40, carbs:20, fat:16 },
    { id:'w28', time:'Snack', emoji:'🍵', name:'Matcha Protein Latte', items:['1 tsp matcha powder','½ scoop vanilla protein','oat milk, stevia'], calories:130, protein:12, carbs:14, fat:2 },
  ],
];

function buildPlan(mealsPerDay: Meal[][], name: string, calories: number, protein: number, carbs: number, fat: number): NutritionPlan {
  const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  return {
    name,
    targetCalories: calories,
    targetProtein: protein,
    targetCarbs: carbs,
    targetFat: fat,
    days: dayNames.map((day, i) => ({ day, meals: mealsPerDay[i % mealsPerDay.length] })),
  };
}

const PLANS: Record<string, NutritionPlan> = {
  muscle_gain: buildPlan(muscleMeals, 'Muscle Gain', 2800, 200, 300, 80),
  weight_loss: buildPlan(weightLossMeals, 'Fat Loss', 1600, 140, 140, 50),
  endurance:   buildPlan(weightLossMeals, 'Endurance', 2200, 155, 260, 60),
  flexibility: buildPlan(weightLossMeals, 'Flexibility & Wellness', 2000, 130, 220, 65),
  general:     buildPlan(muscleMeals, 'General Wellness', 2000, 140, 220, 65),
};

export function getPlanForGoal(goal: string): NutritionPlan {
  return PLANS[goal] ?? PLANS['general'];
}
