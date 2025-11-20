"use client"

export interface Dictionary<T> {
    [key: string]: T;
}

function setLocalStorage(name: string, value: string) {
  localStorage.setItem(name, value)
}

function getLocalStorage(name: string): string {
  return localStorage.getItem(name) ?? ""
}

function removeLocalStorage(name: string) {
  localStorage.removeItem(name)
}

function setSessionStorage(name: string, value: string) {
  sessionStorage.setItem(name, value)
}

function getSessionStorage(name: string): string {
  return sessionStorage.getItem(name) ?? ""
}

function removeSessionStorage(name: string) {
  sessionStorage.removeItem(name)
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
}