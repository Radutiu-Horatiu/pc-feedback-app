import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
export const login = (email, pass) => {
	console.log("login");
	return signInWithEmailAndPassword(auth, email, pass)
		.then((userCredentials) => {
			// console.log(userCredentials.user);
			return userCredentials.user.email;
		})
		.catch((e) => {
			console.log(e);
			return null;
		});
};

export const register = (email, pass) => {
	console.log("register");
	console.log("email: " + email);
	return createUserWithEmailAndPassword(auth, email, pass)
		.then((userCredentials) => {
			// console.log(userCredentials.user);
			return userCredentials.user.email;
		})
		.catch((e) => {
			console.log(e);
			return null;
		});
};

export const logout = () => {
	auth.signOut();
};
