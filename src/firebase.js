import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCUF3vT8GpM7xyulMK6NPsynXVOLGgSbI8",
    authDomain: "nwitter-1f333.firebaseapp.com",
    databaseURL: "https://nwitter-1f333.firebaseio.com",
    projectId: "nwitter-1f333",
    storageBucket: "nwitter-1f333.appspot.com",
    messagingSenderId: "230956907551",
    appId: "1:230956907551:web:3421e1ada6a06d8051692a"
  };

  export default firebase.initiallizeApp(firebaseConfig);