import { Routes } from '@angular/router';

import { Component } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { App } from './app';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Main } from './pages/main/main';
import { authGuard } from './guards/auth/authguard-guard';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'main', canActivate: [authGuard], component: Main },
];
