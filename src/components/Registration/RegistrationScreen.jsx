import { useState } from "react"
import Registration from './Registration';
import RegistrationSecond from './RegistrationSecond';

export default function RegistrationScreen() {
    const [page, setPage] = useState(1)
    return (  
    page === 1 ? <Registration handler={setPage} /> : <RegistrationSecond handler={setPage} />
    )
}