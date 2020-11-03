import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({NweetObj, isOwner}) =>  {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(NweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if(ok) {
      await dbService.doc(`nweets/${NweetObj.id}`).delete();
      await storageService.refFromURL(NweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${NweetObj.id}`).update({
      text:newNweet
    });
    setEditing(false);
  }
  const onChange = (event) => {
    const {
      target:{value},
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
      <form onSubmit={onSubmit}>
        <input
        type="text"
        placeholder="Edit your nweet"
        value={newNweet}
        required
        onChange={onChange}
        />
        <input type="submit" value="Update Nweet" />
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
      <h4>{NweetObj.text}</h4>
      {NweetObj.attachmentUrl && (
        <img src={NweetObj.attachmentUrl} width="50px" height="50px" />
      )}
      {isOwner &&  (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </>
       )}
      </>
      )}
    </div>
  );
};

export default Nweet;