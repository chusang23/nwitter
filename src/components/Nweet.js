import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
      <form onSubmit={onSubmit} className="container nweetEdit">
        <input
        type="text"
        placeholder="Edit your nweet"
        value={newNweet}
        required
        autoFocus
        onChange={onChange}
        className="formInput"
        />
        <input type="submit" value="Update Nweet" className="formBtn" />
        </form>
        <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
      <h4>{NweetObj.text}</h4>
      {NweetObj.attachmentUrl && <img src={NweetObj.attachmentUrl} />}
      {isOwner &&  (
            <div class="nweet__actions">
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
       )}
      </>
      )}
    </div>
  );
};

export default Nweet;