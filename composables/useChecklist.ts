// import {
//     collection,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     doc,
//     onSnapshot,
//     serverTimestamp,
//     query,
//     orderBy,
//   } from "firebase/firestore";
//   import { db } from "~/plugins/firebase.client";
  
//   export interface ChecklistItem {
//     id: string;
//     text: string;
//     completed: boolean;
//     createdAt: any;
//   }
  
//   export function useChecklist() {
//     const items = ref<ChecklistItem[]>([]);
//     const newItemText = ref("");
//     const loading = ref(true);
  
//     // 🔥 THE KEY: onSnapshot sets up a real-time listener
//     // Every time Firestore data changes, this callback fires automatically
//     const colRef = query(
//       collection(db, "checklist"),
//       orderBy("createdAt", "asc")
//     );
  
//     const unsubscribe = onSnapshot(colRef, (snapshot) => {
//       items.value = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as ChecklistItem[];
//       loading.value = false;
//     });
  
//     // Add new item
//     async function addItem() {
//       const text = newItemText.value.trim();
//       if (!text) return;
//       newItemText.value = "";
//       await addDoc(collection(db, "checklist"), {
//         text,
//         completed: false,
//         createdAt: serverTimestamp(),
//       });
//     }
  
//     // Toggle checkbox — this triggers onSnapshot for ALL connected users
//     async function toggleItem(item: ChecklistItem) {
//       const docRef = doc(db, "checklist", item.id);
//       await updateDoc(docRef, { completed: !item.completed });
//     }
  
//     // Delete item
//     async function deleteItem(id: string) {
//       await deleteDoc(doc(db, "checklist", id));
//     }
  
//     // Clean up listener when component unmounts
//     onUnmounted(unsubscribe);
  
//     return { items, newItemText, loading, addItem, toggleItem, deleteItem };
//   }
// 
import { collection, onSnapshot, addDoc, query, orderBy, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

export const useChecklist = () => {
  const { $db,$auth } = useNuxtApp()
  
  const loadData = () => {
    // Only run if we are in the browser and $db exists
    if (process.client && $db) {
      const colRef = collection($db, 'checklist')
      // ... rest of your logic
    }
  }
  // Define the state
  const items = ref<{ id: string; text: string; completed: boolean; userEmail?: string }[]>([])
  const newItemText = ref('')
  const loading = ref(true) // Start as true to show loading state

  // Setup the real-time listener
  const bindTasks = () => {
    const q = query(collection($db, 'items'), orderBy('createdAt', 'desc'))

    onSnapshot(q, (snapshot) => {
      items.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any
      loading.value = false // Stop loading once data arrives
    })
  }

  // Call the binder immediately
  bindTasks()

  // Logic: Add Item
  const addItem = async () => {
    if (!newItemText.value.trim()) return
    const currentUser = $auth.currentUser
    
    const text = newItemText.value
    newItemText.value = '' // Clear input immediately for UX
    
    await addDoc(collection($db, 'items'), {
      text,
      completed: false,
      createdAt: serverTimestamp(), // Better than 'new Date()' for Firebase
      userEmail: currentUser ? currentUser.email : 'Anonymous',
      userId: currentUser ? currentUser.uid : null
    })
  }

  // Logic: Toggle Item
  const toggleItem = async (item: any) => {
    const itemRef = doc($db, 'items', item.id)
    await updateDoc(itemRef, {
      completed: !item.completed
    })
  }

  // Logic: Delete Item
  const deleteItem = async (id: string) => {
    await deleteDoc(doc($db, 'items', id))
  }

  return {
    items,
    newItemText,
    loading,
    addItem,
    toggleItem,
    deleteItem
  }
}