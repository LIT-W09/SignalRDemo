import React, { useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Chat = () => {

    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [count, setCount] = useState(0);


    const connectionRef = useRef(null);
    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/chat").build();
            await connection.start();
            connection.invoke('newUser');
            connectionRef.current = connection;

            // connection.on('newMessage', chatMessage => {
            //     setAllMessages(all => [...all, chatMessage.message]);
            // });

            connection.on('newMessage', messages => {
                setAllMessages(messages);
            });

            connection.on('newUser', obj => setCount(obj.count));

            connection.on('guidRequested', () => {
                console.log('someone somewhere asked for a guid!');
            });


        }


        connectToHub();

        // return () => {
        //     connection.stop();
        // }


    }, []);

    const onSendMessageClick = async () => {
        connectionRef.current.invoke('newMessage', { message });
        setMessage('');
    }


    return (
        <div className='container mt-5'>
            <h2>Current user count: {count}</h2>
            <div className='row'>
                <div className='col-md-8'>
                    <input type='text'
                        className='form-control'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div className='col-md-2'>
                    <button onClick={onSendMessageClick} className='btn btn-primary btn-block'>Send Message</button>
                </div>
            </div>

            <ul className="list-group">
                {allMessages.map((m, idx) => <li className='list-group-item' key={idx}>
                    {m}
                </li>)}
            </ul>
        </div>
    )
}

export default Chat;