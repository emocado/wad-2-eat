/* eslint-disable no-unused-vars */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
    ref as FBref,
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";

import { ref, onUnmounted, computed } from "vue";
import { extractIdentifiers } from "vue/compiler-sfc";

const app = firebase.initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "wad2-a7a65.firebaseapp.com",
    projectId: "wad2-a7a65",
    storageBucket: "wad2-a7a65.appspot.com",
    messagingSenderId: "885224122439",
    appId: "1:885224122439:web:babf433965e1fd3519e962",
    measurementId: "G-DXXYEZ9PY0",
});

export default app;

export function getPosts() {
    const posts = ref([]);
    const unsubscribe = postsQuery.orderBy('date_added').onSnapshot((snapshot) => {
        posts.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        //add the post in reverse order 
        posts.value.reverse();
    });
    onUnmounted(unsubscribe);
    return posts;
}
const db = getFirestore();
// export async function addPost(obj) {
//     const colRef = collection(db, "forum_post");
//     addDoc(colRef, obj).then((response) => {
//         console.log(response);
//     });
//     // console.log(docRef + "created with this ref num ");
// }

const auth = firebase.auth();

export function useAuth() {
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChanged(
        (_user) => (user.value = _user)
    );
    onUnmounted(unsubscribe);
    const isLogin = computed(() => user.value !== null);

    const signIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(googleProvider);
    };
    const signOut = () => auth.signOut();

    return { user, isLogin, signIn, signOut };
}

const firestore = firebase.firestore();
const messagesCollection = firestore.collection("messages");
const messagesQuery = messagesCollection
    .orderBy("createdAt", "desc")
    .limit(100);
const restaurantsCollection = firestore.collection("restaurants");
const restaurantsQuery = restaurantsCollection
    .orderBy("likes", "desc")
    .limit(100);
const postsQuery = firestore.collection("forum_post");
export function useChat(chatRoomId) {
    const messages = ref([]);
    const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
        messages.value = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((doc) => doc.chatRoomId === chatRoomId)
            .reverse();
    });
    onUnmounted(unsubscribe);

    const { user, isLogin } = useAuth();
    const sendMessage = (text, chatRoomId) => {
        if (!isLogin.value) return;
        const { photoURL, uid, displayName } = user.value;
        messagesCollection.add({
            chatRoomId: chatRoomId,
            userName: displayName,
            userId: uid,
            userPhotoURL: photoURL,
            text: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    };

    return { messages, sendMessage };
}

export function useRestaurant(chatRoomId) {
    const restaurants = ref([]);
    const unsubscribe = restaurantsQuery.onSnapshot((snapshot) => {
        restaurants.value = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((doc) => doc.chatRoomId === chatRoomId)
            .reverse();
    });
    onUnmounted(unsubscribe);

    const { user, isLogin } = useAuth();
    const addRestaurants = (restaurant, chatRoomId) => {
        if (!isLogin.value) return;
        const { uid, displayName } = user.value;
        restaurantsCollection
            .where("name", "==", restaurant.name)
            .where("chatRoomId", "==", chatRoomId)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    restaurantsCollection.add({
                        name: restaurant.name,
                        address: restaurant.location.address1,
                        photoURL: restaurant.image_url ?? "",
                        userId: uid,
                        userName: displayName,
                        chatRoomId: chatRoomId,
                        likes: 1,
                        locationId: restaurant.id,
                        webURL: restaurant.url,
                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                } else {
                    // update doc likes by 1
                    querySnapshot.forEach((doc) => {
                        restaurantsCollection.doc(doc.id).update({
                            likes: firebase.firestore.FieldValue.increment(1),
                        });
                    });
                }
            });
    };

    return { restaurants, addRestaurants };
}
