import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import {
    CallingState,
    StreamCall,
    SpeakerLayout,
    CallControls,
    StreamVideo,
    StreamTheme,
    StreamVideoClient,
    useCall,
    useCallStateHooks,
    ParticipantView,
  } from '@stream-io/video-react-sdk';
  import '@stream-io/video-react-sdk/dist/css/styles.css';

const VideoCall = () => {
    const navigate = useNavigate();
    const { tutorId, studentId, studentName } = useParams();

    const [socket, setSocket] = useState(null);
    const [callId, setCallId] = useState("");

    const apiKey = 'mmhfdzb5evj2'; 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGFkbV9fQW1pZGFsYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvUGFkbV9fQW1pZGFsYSIsImlhdCI6MTcxODM1MzczOSwiZXhwIjoxNzE4OTU4NTQ0fQ.rxXt4khjVNHlhASsVCiqcWDpCphlJXAJq-bVFQGBBZI'; // the token can be found in the "Credentials" section
    const userId = 'Padm__Amidala'; 
    useEffect(() => {
        const newSocket = io('https://lingio-connect.onrender.com');
        setSocket(newSocket);
        console.log("Socket connection initialized");

        newSocket.on('connect', () => {
            console.log(`Socket connected with id: ${newSocket.id}`);
            newSocket.emit('joinRoom', { senderId: studentId, receiverId: tutorId });
        });

        newSocket.on('receiveCallId', (receivedCallId) => {
            console.log(`Received callId: ${receivedCallId}`);
            setCallId(receivedCallId);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        newSocket.on('error', (error) => {
            console.error(`Socket error: ${error}`);
        });

        return () => {
            newSocket.close();
            console.log("Socket disconnected on cleanup");
        };
    }, [studentId, tutorId]);

    useEffect(() => {
        console.log(`Current callId state: ${callId}`);
    }, [callId]);

    const user = {
        id: userId,
        name: studentName,
        image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
      };
    
      const client = new StreamVideoClient({ apiKey, user, token });
      const call = client.call('default', callId);

    useEffect(() => {
        const joinCall = async () => {
          await call.join({ create: true });
        };
        joinCall();
    
        return () => {
          call.leave();
        };
      }, [call]);

    return (
        <div>
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyUILayout navigate={navigate} tutorId={tutorId} studentId={studentId} />
          </StreamCall>
        </StreamVideo>
      </div>
    );
};

export default VideoCall;


export const MyUILayout = ({ navigate, tutorId, studentId }) => {
    const call = useCall();
    const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();
  
  
  
    if (callingState !== CallingState.JOINED) {
      return <div>Loading...</div>;
    }
  
    return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls onLeave={()=> navigate(`/learning/${tutorId}`)} />
      </StreamTheme>
    );
  };
  
  export const MyParticipantList = (props) => {
    const { participants } = props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        {participants.map((participant) => (
          <ParticipantView participant={participant} key={participant.sessionId} />
        ))}
      </div>
    );
  };
  
  export const MyFloatingLocalParticipant = (props) => {
    const { participant } = props;
    return (
      <div
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          width: '240px',
          height: '135px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
          borderRadius: '12px',
        }}
      >
        <ParticipantView participant={participant} />
      </div>
    );
  };
