import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BaseURL = 'http://localhost:4000/api/';
  user: User = {
    email: '',
    password: '',
    _id: '',
    username: '',
    createdAt: '',
    updatedAt: '',
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  async login(user: User) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.http.post(this.BaseURL + 'login', user).subscribe(
          (response: any) => {
            if (response.message) {
              this.toastr.success(response.message);
              this.saveToken(response.token);
            }

            resolve(response);
          },
          (error) => {
            this.toastr.error(error.error.message);
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async register(user: User) {
    return await new Promise(async (resolve, reject) => {
      try {
        this.http.post(this.BaseURL + 'register', user).subscribe(
          (response: any) => {
            if (response.message) {
              this.toastr.success(response.message);
            }
            resolve(response);
          },
          (error) => {
            this.toastr.error(error.error.message);
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUserDetails() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.http.get(this.BaseURL + 'user').subscribe(
          (response: any) => {
            this.user = response;
            resolve(response);
          },
          (error) => {
            this.toastr.error(error.error.message);
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.success('Logged out successfully');
  }

  saveToken(token: string) {
    if (token) {
      let ciphertext = CryptoJS.AES.encrypt(token, 'secret key 123').toString();
      localStorage.setItem('token', ciphertext);
    }
  }

  getToken() {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        // Decrypt token
        let bytes = CryptoJS.AES.decrypt(token, 'secret key 123');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string) {
    try {
      let decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
