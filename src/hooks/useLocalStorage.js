export const useLocalStorage = () => {
    const setData = (keyName, newData) => {
        localStorage.setItem(keyName, newData);
    };

    const getData = (keyName) => {
        return localStorage.getItem(keyName);
    };

    return [getData, setData];
}
export default useLocalStorage;