import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type Course = "Starter" | "Main" | "Dessert";

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
};

type RootStackParamList = {
  Home: undefined;
  Details: { item: MenuItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const COURSES: Course[] = ["Starter", "Main", "Dessert"];

function HomeScreen({ navigation }: any) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<Course>("Starter");
  const [price, setPrice] = useState("");

  const addMenuItem = () => {
    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const numericPrice = Number(price);

    if (!trimmedName || !trimmedDescription || !price.trim()) {
      Alert.alert("Missing information", "Please complete all fields.");
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert("Invalid price", "Enter a price greater than 0.");
      return;
    }

    const newItem: MenuItem = {
      id: `${Date.now()}-${Math.random()}`,
      dishName: trimmedName,
      description: trimmedDescription,
      course,
      price: numericPrice,
    };

    setMenuItems((current) => [...current, newItem]);
    setDishName("");
    setDescription("");
    setCourse("Starter");
    setPrice("");
    Alert.alert("Menu updated", `${trimmedName} was added to the menu.`);
  };

  const removeMenuItem = (id: string) => {
    Alert.alert("Remove menu item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setMenuItems((current) => current.filter((item) => item.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.brand}>CHRISTOFFEL'S</Text>
          <Text style={styles.title}>Digital Menu</Text>
          <Text style={styles.subtitle}>
            Add and manage the menu for your next dining experience.
          </Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>TOTAL MENU ITEMS</Text>
            <Text style={styles.summaryValue}>{menuItems.length}</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Add Menu Item</Text>

            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the dish"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.courseRow}>
              {COURSES.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setCourse(option)}
                  style={[
                    styles.courseButton,
                    course === option && styles.courseButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.courseText,
                      course === option && styles.courseTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 150"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />

            <Pressable
              onPress={addMenuItem}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>ADD TO MENU</Text>
            </Pressable>
          </View>

          <View style={styles.menuHeader}>
            <Text style={styles.sectionTitle}>Prepared Menu</Text>
            <Text style={styles.itemCount}>{menuItems.length} items</Text>
          </View>

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No menu items yet</Text>
              <Text style={styles.emptyText}>
                Add the first dish using the form above.
              </Text>
            </View>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.menuCard}>
                  <View style={styles.menuInfo}>
                    <Text style={styles.dishName}>{item.dishName}</Text>
                    <Text style={styles.course}>{item.course}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
                  </View>

                  <View style={styles.actionRow}>
                    <Pressable
                      onPress={() => navigation.navigate("Details", { item })}
                      style={styles.secondaryButton}
                    >
                      <Text style={styles.secondaryButtonText}>VIEW</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => removeMenuItem(item.id)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>REMOVE</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }: any) {
  const item = route.params.item as MenuItem;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>CHRISTOFFEL'S</Text>
        <Text style={styles.title}>{item.dishName}</Text>

        <View style={styles.detailsCard}>
          <Text style={styles.detailLabel}>COURSE</Text>
          <Text style={styles.detailValue}>{item.course}</Text>

          <Text style={styles.detailLabel}>PRICE</Text>
          <Text style={styles.detailValue}>R {item.price.toFixed(2)}</Text>

          <Text style={styles.detailLabel}>DESCRIPTION</Text>
          <Text style={styles.detailDescription}>{item.description}</Text>
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>BACK TO MENU</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Menu Item" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: "#F5F2EE" },
  container: { padding: 20, paddingBottom: 40 },
  brand: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#6A5A4E",
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2F2925",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#756C65",
    marginTop: 8,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: "#342D28",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  summaryLabel: { color: "#D8D0C8", fontSize: 12, fontWeight: "700" },
  summaryValue: { color: "#FFFFFF", fontSize: 40, fontWeight: "800", marginTop: 4 },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },
  sectionTitle: { fontSize: 21, fontWeight: "800", color: "#342D28" },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#625951",
    marginTop: 15,
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D7D0C9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#342D28",
    backgroundColor: "#FBFAF8",
  },
  textArea: { minHeight: 90, textAlignVertical: "top" },
  courseRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  courseButton: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ECE7E2",
  },
  courseButtonSelected: { backgroundColor: "#342D28" },
  courseText: { color: "#554B44", fontWeight: "700" },
  courseTextSelected: { color: "#FFFFFF" },
  primaryButton: {
    backgroundColor: "#342D28",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 18,
  },
  buttonPressed: { opacity: 0.75 },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", letterSpacing: 0.5 },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemCount: { color: "#756C65", fontWeight: "700" },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },
  emptyTitle: { fontWeight: "800", fontSize: 17, color: "#342D28" },
  emptyText: { color: "#756C65", marginTop: 5 },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 12,
  },
  menuInfo: { gap: 4 },
  dishName: { fontSize: 20, fontWeight: "800", color: "#342D28" },
  course: { fontSize: 13, fontWeight: "800", color: "#806E60" },
  description: { color: "#756C65", lineHeight: 20, marginTop: 3 },
  price: { fontSize: 19, fontWeight: "800", color: "#342D28", marginTop: 6 },
  actionRow: { flexDirection: "row", gap: 9, marginTop: 13 },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#342D28",
    paddingVertical: 11,
    borderRadius: 11,
    alignItems: "center",
  },
  secondaryButtonText: { color: "#342D28", fontWeight: "800" },
  removeButton: {
    flex: 1,
    backgroundColor: "#E9E2DD",
    paddingVertical: 11,
    borderRadius: 11,
    alignItems: "center",
  },
  removeButtonText: { color: "#6A5144", fontWeight: "800" },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    marginTop: 18,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#806E60",
    marginTop: 10,
  },
  detailValue: { fontSize: 22, fontWeight: "800", color: "#342D28", marginTop: 4 },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#5E554E",
    marginTop: 7,
  },
});
