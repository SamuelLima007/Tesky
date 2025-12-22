import { Routes } from '@angular/router';

import { Component } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { App } from './app';
import { Home } from './pages/home/home';

export const routes: Routes = [{ path: '', component: Home }];
