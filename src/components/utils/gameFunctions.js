export const fetchData = async () => {
    const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1000"
    );
    const data = await response.json();
    return data;
};
