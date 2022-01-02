import axios from "axios";

const instance = axios.create({
	baseURL: "",
	timeout: 45000,
	headers: { Pragma: "no-cache" },
});

const requestHandler = (request) => {
	return request;
};

// request intercepter
instance.interceptors.request.use((request) => requestHandler(request));

// response intercepter
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;
