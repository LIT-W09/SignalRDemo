import React, {useEffect, useRef, useState} from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Home = () => {

    const connectionRef = useRef(null);
    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/chat").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('test-message', obj => {
                console.log(obj);
            });
        }


        connectToHub();


    }, []);

    const onButtonClick = async() => {
        connectionRef.current.invoke('test', {amount: 65});
    }

    return (
        <div className='container mt-5'>
            <button className='btn btn-primary' onClick={onButtonClick}>Click me!</button>
        </div>
    )
}

export default Home;