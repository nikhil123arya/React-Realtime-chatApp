import { useState, useEffect } from "react";
import { ID, Query } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');

  //It utilizes the useEffect hook to perform side effects in function components.
  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    let payload= {
      body:messageBody
    }

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    )
    console.log('Created!', response);

    setMessages(prevState=> [response, ...messages])

    setMessageBody('');
  }

  //getMessages is an asynchronous function that fetches messages from a database.and updates the messages state with the documents received.
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    );
    console.log("RESPONSE", response);
    setMessages(response.documents);
  };

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength={1000}
              placeholder="Say Something....."
              onChange={(e)=> {setMessageBody(e.target.value)}}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="send"/>
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {message.$createdAt}
                </small>
              </div>
              <div className="message--body">
                <span >{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
