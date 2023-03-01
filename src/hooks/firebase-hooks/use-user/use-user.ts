import { firestore } from '@/config';
import { userConverter } from '@/utils';
import { doc } from '@firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export const useUser = (uid: string) =>
    useDocumentData(doc(firestore, 'users', uid).withConverter(userConverter));
