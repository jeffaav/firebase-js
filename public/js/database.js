'use strict';

(function (W, D) {

    const firebaseConfig = {
        apiKey: 'AIzaSyBJv16D7VhsSXcBB-8sQUVmoRk_XgeXDl8',
        authDomain: 'testproduct-3c1f6.firebaseapp.com',
        databaseURL: 'https://testproduct-3c1f6.firebaseio.com',
        storageBucket: 'testproduct-3c1f6.appspot.com',
        messagingSenderId: '630396549544'
    }

    const testProduct = firebase.initializeApp(firebaseConfig);

    const ref = path => testProduct.database().ref(path);


    class User {
        create(username, password) {
            return ref('users').push({
                username: username,
                password: password
            }).key
        }

        list() {
            let users = ref('users');

            return users.once('value').then(snapshot => {
                let data = snapshot.val();
                const list = [];
                
                Object.getOwnPropertyNames(data).forEach(key => {
                    data[key]._id = key;
                    list.push(data[key]);
                })
                return list;
            })
        }

        suscribe(cb) {
            let users = ref('users');

            users.on('child_added', snapshot => {
                console.log('child_added')
                cb({ key: snapshot.key, val: snapshot.val(), action: 'added' })
            })

            users.on('child_removed', snapshot => {
                console.log('child_removed')
                cb({ key: snapshot.key, val: snapshot.val(), action: 'removed' })
            })

            users.on('child_changed', snapshot => {
                console.log('child_changed')
                cb({ key: snapshot.key, val: snapshot.val(), action: 'changed' })
            })

            users.on('child_moved', snapshot => {
                console.log('child_moved')
                cb({ key: snapshot.key, val: snapshot.val(), action: 'moved' })
            })
        }
    }
    



    W.User = new User()

}(window, document))