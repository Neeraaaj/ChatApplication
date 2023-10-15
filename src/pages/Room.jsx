import React, {useState, useEffect} from 'react'
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'
import {Trash, Trash2} from 'react-feather'
import { ID, Query} from 'appwrite';
import { Header } from '../components/Header';
import { useAuth } from '../utils/AuthContext';

const Room = () => {
    const [message, setMessage] = useState([]);
    const {user} = useAuth()
    const [messageBody, setMessageBody] = useState("")

    useEffect(() => {
        getMessages()

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES  }.documents`, response => {
            console.log('REAL TIME: ', response)

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log("Message was created")
                setMessage(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('Message was deleted')
                setMessage(prevState => prevState.filter(messages => messages.$id !== response.payload.$id));

            }
        })

        return () => {
            unsubscribe()
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }
        let response = await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), payload)

        // setMessage(prevState => [response, ...message])
        setMessageBody('')
    }
    const getMessages =  async () => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt')
            ])
        console.log('Response:', response);
        setMessage(response.documents);
    }

    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
        // setMessage(prevState => message.filter(messages => messages.$id !== message_id));
    }
  return (
    <main className='container'>
        {/* <h1>
            Room
        </h1> */}
        <Header />
        <div className='room--container'>
            <form id="message--form" onSubmit={handleSubmit}>
                <div>
                    <textarea
                        required
                        maxLength="1000"
                        placeholder='Type Here....'
                        onChange={(e) => {
                            setMessageBody(e.target.value)
                        }}
                        value={messageBody}
                    >
                        
                    </textarea>

                    <div className='send-btn--wrapper'>
                        <input className='btn btn-secondary' type="submit" value="Send" />
                    </div>
                </div>
            </form>
            <div className='room--container'>
                <div>
                    {message.map(messages => (
                        <div key={messages.$id} className='messgaes--wrapper'>
                            <div className='message--header'>
                                <small className='message-timestamp'>{new Date(messages.$createdAt).toLocaleString().replace(/:\d{2}\s/, ' ')}</small>

                                <Trash2 onClick={() => deleteMessage(messages.$id)} color='red'/>
                            </div>
                            <div className='message--body'>
                                <h2>{messages.username}</h2>
                                <span>{messages.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>    
        </div>
    </main>
  )
}

export default Room