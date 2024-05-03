import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../atoms/token.atom';

const Holidays = () => {

    const token = useRecoilValue(tokenAtom);

    return (
        <>
            <h1>Welcome!</h1>
            <h2>{token}</h2>
        </>
    )
}

export default Holidays;