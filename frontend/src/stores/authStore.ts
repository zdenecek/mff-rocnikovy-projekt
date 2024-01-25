import { defineStore } from 'pinia'
import {User} from '@/model/User';
import axios from '@/plugins/axios'


export const useAuthStore = defineStore('auth', {
    state: () => {
        let user = null;
        const userData =  localStorage.getItem('user');
        if (userData) {
            const {id, firstName, lastName, email, role } = JSON.parse(userData);
            user = new User({id, firstName, lastName, email, role} as User)
        }
        return ({
            user: user as User | null,
            isAuthenticated: !!user
        })
    },
    getters: {
        admin: state => state.user?.role === 'admin',
        matrikar: state => state.user?.role === 'matrikar' || state.user?.role === 'admin',
    },
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await axios.post('/login/password', { email, password });
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.user = JSON.stringify(this.user);
                console.debug('Login successful:', this.user);
            } catch (error: any) {
                console.error('Login error:', error.message);
                throw error;
            }
        },
        async logout() {
            try {
                await axios.post('/logout');
                this.user = null;
                this.isAuthenticated = false;
                localStorage.removeItem('user');
            }
            catch (error: any) {
                console.error('Logout error:', error.message);
            }
        },
        async changePassword(oldPassword: string, newPassword: string) {
            if (!this.isAuthenticated) {
                throw new Error('Not authenticated');
            }
            try {
                await axios.post('/change-password', { username: this.user?.email, password: newPassword, oldPassword });
            } catch (error: any) {
                console.error('Change password error:', error.message);
                throw error;
            }
        },
        async register(email: string, password: string, firstName: string, lastName: string) {
             try {
                const response = await axios.post('/auth/register', { email: email, password, firstName, lastName});
                console.debug('Register successful:', response.data.user);
            } catch (error: any) {
                console.error('Register error:', error.message);
                throw error;
            }
        }   
    }
});