import { of, throwError } from "rxjs";
import { delay } from "rxjs/operators";
let id = 4;
export function getTodos() {
  return of([
    { id: 1, description: "Hi", completed: false },
    { id: 2, description: "Hello", completed: false },
    { id: 3, description: "Learn Reactive Programming", completed: false }
  ]).pipe(delay(1000));
}
export function addTodo(todo: any) {
  todo.id = ++id;
  return of(todo).pipe(delay(1000));
}
export function updateTodo(todo: any) {
  if (todo.completed && todo.description.startsWith("Learn Reactive")) {
    return throwError(
      new Error(
        "Please take your time. Learning reactive programming is not so easy 💔"
      )
    );
  }
  return of({ ...todo }).pipe(delay(1000));
}
export function removeTodo(id: number) {
  return of(id).pipe(delay(1000));
}