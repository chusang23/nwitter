import React from "react";

const Nweet = ({NweetObj, isOwner}) =>  (
    <div>
      <h4>{NweetObj.text}</h4>
      {isOwner &&  (
          <>
      <button>Delete Nweet</button>
      <button>Edit Nweet</button>
      </>
      )}
    </div>

);

export default Nweet;