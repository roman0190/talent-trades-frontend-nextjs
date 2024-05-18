type Data = {
    username: string;
    id: string;
    access_token: string;
};
export const loginUser = (data: Data) => {
    localStorage.setItem("userToken", data.access_token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.id);
};
export const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
};
export const getUserToken = () => localStorage.getItem("userToken");
export const getUserId = () => localStorage.getItem("userId");
