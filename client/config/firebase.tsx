import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6hN4t_1R41XYpNXdJADNmIxbOgdMVMYc",
  authDomain: "ptit-729c7.firebaseapp.com",
  projectId: "ptit-729c7",
  storageBucket: "ptit-729c7.appspot.com",
  messagingSenderId: "270704528484",
  appId: "1:270704528484:web:ae9e3f0cb32aa9e715a371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to upload image to Firebase Storage
export const uploadImage = async (file: File) => {
  if (!file) throw new Error('No file provided');

  const storageRef = ref(storage, 'courses/' + file.name); // Change the path as needed
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
};
