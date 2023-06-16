import { useState } from 'react'

export default function myHookAdding() {
    const [myAdd, setMyAdd] = useState(100);
        return {
        setMyAdd, myAdd
        }
    }