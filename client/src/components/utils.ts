"use client"

function setLocalStorage(name: string, value: string) {
  localStorage.setItem(name, value)
}

function getLocalStorage(name: string) {
  return localStorage.getItem(name)
}

function removeLocalStorage(name: string) {
  return localStorage.removeItem(name)
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
}