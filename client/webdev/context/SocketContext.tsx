'use client'

import { useSession } from 'next-auth/react'
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {io, Socket} from 'socket.io-client'

interface iSocketContext {
    refetchNotification: boolean
    sendNotification: (recipientId: string) => void
    handleRefetchNotification: () => void
}
//we rap our app with socket provider
export const SocketContext = createContext<iSocketContext | null>(null) 

export const SocketContextProvider = ({ children }: {children: React.ReactNode}) =>{
    
    const session = useSession()
    const user = session.data?.user
    const [socket, setSocket] = useState<Socket | null>()
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const [refetchNotification, setRefetchNotification] = useState(true)

    const sendNotification = useCallback((recipientId: string) => {
        if(user && socket && isSocketConnected) {
            socket.emit('onNotification', recipientId)
        }
    }, [user, socket, isSocketConnected])

    const handleRefetchNotification = () => {
        setRefetchNotification(prev => !prev)
    }


    useEffect(() => {
        const newSocket = io()
        setSocket(newSocket)

        return ()=> {
            newSocket.disconnect()
        }
    }, [user])

    //listern for connection if socket changes useEffect trigger
    useEffect(() => {

        if (socket == null) return

        function onConnect(){
            setIsSocketConnected(true)
            console.log(">>>>> New socket connecting")
        }

        function onDisconnect(){
            setIsSocketConnected(false)
        }

        function onNotification(){
            handleRefetchNotification()

        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('getNotification', onNotification)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('getNotification', onNotification)

        }

    }, [socket])

    //set up online users
    useEffect(() => {
        if(!socket || !isSocketConnected || !user) return

        socket.emit('addOnlineUser', user.userId)
    }, [socket, isSocketConnected, user])

    
    return <SocketContext.Provider value={{
        refetchNotification,
        sendNotification,
        handleRefetchNotification
    }}>
            {children}
        </SocketContext.Provider>
    }

export const useSocket = () => {
    const context = useContext(SocketContext)

    if(context === null) {
        throw new Error("useSocket must be within socket provider")
    }
    return context
}
