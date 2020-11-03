import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    };
    const getMyNweets = async () => {
        const nweets = await dbService
        .collection("nweets")
        .where("createrId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);
    return (
    <>
        <button onClick={onLogOutClick}>Log out</button>
    </>
     );
};