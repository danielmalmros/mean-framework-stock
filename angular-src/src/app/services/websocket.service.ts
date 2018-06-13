import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    // Server-side connection.
    // Assigning the server port to client.
    this.socket = io('http://localhost:3000');

    // Defining observable which will observe any incoming messages from the server.
    let observable = new Observable(observer => {

        // Gets the msg from the server, that client can be updatet.
        this.socket.on('Update', (data) => {

            // Notify browser console that new data is received.
            console.log('refreshed data received', data);
        });

        return () => {
          this.socket.disconnect();
        }
    });
    
    // We define our Observer which will listen to messages from the components
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
            console.log('insinde next', data);
            this.socket.emit('refresh', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}