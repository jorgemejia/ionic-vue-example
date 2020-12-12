import Vue from 'vue';

const Users = {

    async getUsers(){
        // do something
        return await Vue.http.get('https://www.reddit.com/r/gifs/top/.json?limit=20&sort=hot');
    }

}

export default Users;
