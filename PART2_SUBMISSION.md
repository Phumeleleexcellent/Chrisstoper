# MAST5112W Portfolio of Evidence – Part 2
## Christoffel's Digital Menu

### 1. Introduction
Part 2 builds on the interface planned in Part 1 by adding the first working logic to the React Native application. The main goal is to allow the chef to enter menu information and see the resulting menu on the Home screen.

### 2. Part 2 Requirements and Implementation

| Requirement | Implementation |
|---|---|
| Dish name | TextInput called Dish Name |
| Description | Multiline TextInput |
| Select course | Predefined Starter, Main and Dessert buttons |
| Price | Numeric TextInput |
| Predefined courses | Course values are restricted to the three required choices |
| Home displays menu | Menu cards are rendered on the Home screen |
| Total number of items | Summary card displays menuItems.length |
| Add items on homepage | Add to Menu button adds the entered item |
| Data not hardcoded | Menu starts as an empty array and is populated by user input |
| Button presses | Pressable components handle actions |
| TypeScript variables | State variables store form values and menu data |
| Navigation | React Navigation connects Home and Details |
| Input validation | Empty fields and invalid/zero prices are rejected |

### 3. User Flow
1. The chef opens the Home screen.
2. The chef enters the dish name.
3. The chef enters a description.
4. The chef selects Starter, Main or Dessert.
5. The chef enters the price.
6. The chef taps Add to Menu.
7. The app validates the fields.
8. A valid item is added to the menu array.
9. The total item count updates.
10. The new menu item appears on the Home screen.
11. The chef can open Details or remove an item.

### 4. TypeScript and React Native Concepts Used
The application uses `useState` to store changing values. A `MenuItem` type defines the structure of each menu item. The `addMenuItem` function creates a new object and updates the array. The `removeMenuItem` function uses `filter()` to create a new array without the selected item. Conditional checks are used to validate input before the item is added.

### 5. Components Used
- `View` – layout containers.
- `Text` – headings, labels and menu information.
- `TextInput` – chef input.
- `Pressable` – buttons and course selection.
- `FlatList` – menu list.
- `ScrollView` – scrolling page content.
- `Alert` – validation and removal feedback.
- `StyleSheet` – consistent styling.
- `NavigationContainer` and native stack navigation – movement between screens.

### 6. Evidence to Submit
The working app should be demonstrated with screenshots and a short screen recording. The recording should show entering multiple dishes, selecting different courses, adding items, viewing the details screen, removing an item and showing the updated total count.

### 7. Conclusion
The Part 2 implementation turns the Part 1 interface plan into a working React Native prototype. The chef can enter real menu data during the session rather than relying on a hardcoded menu. The application also demonstrates input handling, state, button actions, lists, validation and navigation. The remaining final-PoE features can be added in the next stage without changing the basic menu-item data structure.
