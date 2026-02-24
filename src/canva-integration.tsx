// Canva Design Editor Integration Setup
// Your App ID: AAHAAFRb5g8

import { prepareDesignEditor } from "@canva/intents/design";
import designEditor from "./intents/design_editor";

// Initialize the design editor with your app
prepareDesignEditor(designEditor);

console.log("✅ Canva Design Editor initialized");
console.log("📝 App ID: AAHAAFRb5g8");
console.log("🎨 Ready to create and edit designs");

export { designEditor };