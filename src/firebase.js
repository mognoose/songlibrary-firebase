import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { config } from './firebase.config';

import {ref, onUnmounted } from 'vue';

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const songDB = db.collection('song');


export const useLoadSongs = async () => {
    const snapshot = await songDB.get()
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
}

export const useLoadSongBySlug = async slug => {
    let res = []
    await songDB
        .where('slug', '==', slug)
        .orderBy('name')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                res.push({id: doc.id, ...doc.data()});
            });
        })
        .catch(error => {
            console.log("Error getting songs: ", error);
        });
    
    return res;
}

export const getSongById = async id => {
    const song = await songDB.doc(id).get();
    return song.exists ? song.data() : null;
}