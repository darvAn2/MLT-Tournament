// Firebase Configuration (modular SDK v10, ES module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgLiVHhLxxLplrgqqBvK1iW2MLPpaSf2o",
  authDomain: "mlt-site-94a65.firebaseapp.com",
  projectId: "mlt-site-94a65",
  storageBucket: "mlt-site-94a65.firebasestorage.app",
  messagingSenderId: "131916366588",
  appId: "1:131916366588:web:c9172c622b943722020d79"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// experimentalForceLongPolling: у части пользователей (особенно из
// РФ/СНГ) провайдер режет/блокирует обычное WebSocket-соединение к
// Firestore, из-за чего getDoc/onSnapshot падают с "client is offline"
// даже при рабочем интернете.
// Раньше здесь стоял experimentalAutoDetectLongPolling — SDK сам решает,
// нужен ли long-polling. Но у автоопределения есть известный баг: в части
// браузеров/сетей оно ошибочно решает, что WebSocket работает, и всё равно
// пытается открыть его напрямую, из-за чего соединение снова падает.
// Принудительный long-polling работает чуть медленнее (обычный HTTP вместо
// WebSocket), зато не зависит от того, правильно ли SDK угадал тип сети —
// подключение будет работать одинаково стабильно и в РФ/СНГ, и где угодно.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
