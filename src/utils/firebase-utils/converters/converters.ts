import { FirestoreDataConverter } from 'firebase/firestore';

type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    favoriteGroceries: string[];
};

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (company: User) => company,
    fromFirestore: (snapshot) => snapshot.data() as User,
};
