import { useState } from 'react'

export default function myHookAdding() {
    const [myAdd, setMyAdd] = useState(0);
        return {
        setMyAdd, myAdd
        }
    }
