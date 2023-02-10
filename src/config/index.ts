import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

const config = {
    firebase: {
        apiKey: 'AIzaSyAUvU7O4s43JfslcHf1vHQCKVSNw2FZmvc',
        authDomain: 'grocery-list-8c853.firebaseapp.com',
        projectId: 'grocery-list-8c853',
        storageBucket: 'grocery-list-8c853.appspot.com',
        messagingSenderId: '847881902672',
        appId: '1:847881902672:web:0232c4e2c0cb39d3f14f55',
    },
};

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
