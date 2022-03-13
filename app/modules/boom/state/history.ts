import { DrawingAppData, INITIAL_DATA, PERSIST_DATA } from './constants'
import { current } from 'immer'

export function makeHistory(drawingId: string = 'anon') {

  // this is because first remix compiler stuff
  if (typeof localStorage === "undefined" || localStorage === null) {
    return;
  }
  let initialData = INITIAL_DATA

  const saved = localStorage.getItem(drawingId)

  if (PERSIST_DATA && saved !== null) {
    let restoredData = JSON.parse(saved)

    if (restoredData.version < INITIAL_DATA.version) {
      // Migrations would go here
      restoredData = INITIAL_DATA
    }

    initialData = restoredData
  }

  let stack: DrawingAppData[] = [initialData]
  let pointer = 0

  function persist(data: DrawingAppData) {
    delete data.pageState.hoveredId
    data.overlays.snapLines = []
    localStorage.setItem(drawingId, JSON.stringify(data))
  }

  function push(data: DrawingAppData) {
    if (pointer < stack.length - 1) {
      stack = stack.slice(0, pointer + 1)
    }
    const serialized = current(data)
    stack.push(serialized)
    pointer = stack.length - 1
    persist(serialized)
    return true
  }

  function undo() {
    if (pointer <= 0) return false
    pointer--
    const data = stack[pointer]
    persist(data)
    return data
  }

  function redo() {
    if (pointer >= stack.length - 1) return false
    pointer++
    const data = stack[pointer]
    persist(data)
    return data
  }

  function reset(data = INITIAL_DATA) {
    stack = [data]
    pointer = 0
    localStorage.setItem(drawingId, JSON.stringify(data))
    persist(data)
    return data
  }

  function restore() {
    return initialData
  }

  return { push, undo, redo, reset, restore }
}
