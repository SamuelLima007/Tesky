import { Routes } from '@angular/router';

import { Component } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { App } from './app';
import { HomeComponent } from './Components/home-component/home-component';

export const routes: Routes = [{ path: '', component: HomeComponent }];
