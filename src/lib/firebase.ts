import {
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import { browser, dev } from "$app/environment";

let app: FirebaseApp;
let db: Firestore;

export const initFirebase = async (options: FirebaseOptions) => {
  if (!app && browser) {
    app = initializeApp(options);
    db = getFirestore(app);

    if (dev) connectFirestoreEmulator(db, "localhost", 8080);
  }

  return;
};

export const getFirebaseApp = () => app;

export const saveRafflePurchase = async (payload: Record<string, any>) => {
  console.table(payload);
  await addDoc(collection(db, "raffle_purchases"), {
    address: payload.address,
    ccDonate: payload.ccDonate,
    city: payload.city,
    email: payload.email,
    event: "christmas",
    name: payload.name,
    phone: payload.phone,
    referringFamily: "",
    squarePurchase: payload.squarePurchase,
    state: payload.state,
    ticketsPurchased: +payload.ticketsPurchased,
    zipCode: payload.zipCode,
  });
};
